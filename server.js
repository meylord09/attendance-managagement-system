const express = require('express');
const app = express();
const path = require("path")
var teacherRoute = require('./routes/teacherRoute');
var classRoute = require('./routes/classRoute');
var studentRoute = require('./routes/studentRoute');
var sectionRoute = require('./routes/sectionRoute');
var attendanceRoute = require('./routes/attendanceRoute');
var reportRoute = require('./routes/reportRoute');
var biometricRoute = require('./routes/biometricRoute');
var excuseRoute = require('./routes/excuseRoute');
var messageRoute = require('./routes/messageRoute');

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

let Message = require('./models/message.model');
const PORT = 4000;

// SOCKET SECTION BEGIN================================ >

const http = require("http");

const socketIo = require("socket.io");
const index = require("./routes/index");
const SOCKET_PORT = 4001;
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

const getApiAndEmit = async socket => {
    try {
        Message.find(function(err, msgs) {
            if (err) {
                console.log(err);
            } else {
              // console.log('emit');
              if(msgs.length>0)
                socket.emit("Messages", {messages:msgs});
            }
        });
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };

server.listen(SOCKET_PORT, () => console.log(`Listening on socket port ${SOCKET_PORT}`));
  
io.on("connection", socket => {
    console.log("New client connected"), setInterval(
      () => getApiAndEmit(socket),
      1000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
  });
// SOCKET SECTION END ================================ <

app.use(express.static(path.join(__dirname, "client", "build")))

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://marian2022:marian2022@cluster0.weufxly.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

teacherRoute(app,express);
classRoute(app,express);
studentRoute(app,express);
sectionRoute(app,express);
attendanceRoute(app,express);
reportRoute(app,express);
biometricRoute(app,express);
excuseRoute(app,express);
messageRoute(app,express);
