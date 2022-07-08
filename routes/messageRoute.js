module.exports = function(app,express) {

    const messageRouter = express.Router();
    let Message = require('../models/message.model');
   
    messageRouter.route('/').get(function(req, res) {
        Message.find(function(err, msg) {
            if (err) {
                console.log(err);
            } else {
                res.json(msg);
            }
        });
    });

    messageRouter.route('/add/:code').post(function(req, res) {
        console.log('Adding new Message with code: ',req.params.code);
        let msg = new Message();
        msg.code=req.params.code;
        msg.save()
            .then(mes => {
                res.status(200).json({'message': 'Message added successfully'});
            })
            .catch(err => {
                res.status(400).send('Adding new Message failed');
            });
    });

    messageRouter.route('/delete/:id').post(function(req, res) {
        Message.findById(req.params.id, function(err, msg) {
            if (!msg)
                res.status(404).send("Message not found");
            else{
                msg.deleteOne().then(teacher => {
                    res.json('Message deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });

    messageRouter.route('/delete-all').post(function(req, res) {
        Message.deleteMany({}, function(err, message) {
              res.status(200).send(message);
            });
    });

    app.use('/messages', messageRouter);

};