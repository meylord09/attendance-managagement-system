module.exports = function(app,express) {

    const reportRouter = express.Router();
    let Attendance = require('../models/attendance.model');
    let Student = require('../models/student.model'); 

    reportRouter.route('/daily').post(function(req, res) {
        Attendance.find({date:req.body.date}, function(err, attendance) {
            res.status(200).json({attendance});
        });
    });

    reportRouter.route('/all/student').post(function(req, res) {
        console.log('Looking for studentId:'+ req.body.studentId);
        Attendance.find({studentId:req.body.studentId}, function(err, attendance) {
            console.log('here you go: ' ,attendance);
            res.status(200).json({attendance});
        });
    });

    reportRouter.route('/daily/student').post(function(req, res) {
        Attendance.find({date:req.body.date,studentId:req.body.studentId}, function(err, attendance) {
            res.status(200).json({attendance});
        });
    });

    app.use('/report', reportRouter);

}