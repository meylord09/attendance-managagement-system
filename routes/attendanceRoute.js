module.exports = function(app,express) {

    const attendanceRouter = express.Router();
    let Attendance = require('../models/attendance.model');
    let Student = require('../models/student.model');
    let Message = require('../models/message.model');

    attendanceRouter.route('/add/:bioId').post(function(req, res) {
        console.log('Adding attendance for bioId: ',req.params.bioId);

        //Get student info based on biometric id
        Student.findOne({bioId: req.params.bioId}, function(err, studentInfo) {
            if(studentInfo===null){
                res.status(404).json({'message':'Unregistered biometrics'});
            }else{
                /*Attendance.findOne({ $and: [{bioId: req.params.bioId}, {date: new Date().toLocaleDateString("en-US")}]}, function(err,existing){
                    console.log('existing',existing);
                    if(existing !== null){
                        existing.deleteOne().then(attnd => {
                            console.log('Deleted old entry');
                        })
                        .catch(err => {
                            console.log('Failed to deleted old entry');
                        });
                    }
                });*/
                
                let attnd = new Attendance();
                attnd.studentId=studentInfo._id;
                attnd.date = new Date().toLocaleDateString("en-US");
                attnd.time = new Date().toLocaleTimeString("en-US");
                attnd.status = 'Present';
                attnd.save().then(attnds => {  
                    
                    // Add to message queue
                    let msg = new Message();
                    msg.code='ADDED_ATTENDANCE';
                    msg.value= studentInfo.firstname +' ' +studentInfo.lastname +' logged';
                    msg.save()


                    res.status(201).json({'message': 'Attendance added for ' + studentInfo.firstname +' ' +studentInfo.lastname});
                })
                .catch(err => {
                    res.status(400).send('Adding Attendance failed');
                });       
                
            } 
        });
    });


    attendanceRouter.route('/delete-all').post(function(req, res) {
        Attendance.deleteMany({}, function(err, cs) {
              res.status(200).send(cs);
            });
    });

    attendanceRouter.route('/').get(function(req, res) {
        Attendance.find(function(err, classes) {
            if (err) {
                console.log(err);
            } else {
                res.json(classes);
            }
        });
    });

    attendanceRouter.route('/:id').get(function(req, res) {
        let id = req.params.id;
        Attendance.findById(id, function(err, attnd) {
            res.json(attnd);
        });
    });

    attendanceRouter.route('/delete/:id').post(function(req, res) {
        Attendance.findById(req.params.id, function(err, attnd) {
            if (!attnd)
                res.status(404).send("Attendance not found");
            else{
                attnd.deleteOne().then(attnd => {
                    res.json('Attendance deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });

    app.use('/attendance', attendanceRouter);

}
