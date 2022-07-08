module.exports = function(app,express) {

    const studentRouter = express.Router();
    let Student = require('../models/student.model');

    studentRouter.route('/').get(function(req, res) {
        Student.find(function(err, students) {
            if (err) {
                console.log(err);
            } else {
                res.json(students);
            }
        });
    });

    studentRouter.route('/delete-all').post(function(req, res) {
        Student.deleteMany({}, function(err, cs) {
              res.status(200).send(cs);
            });
    });

    studentRouter.route('/section/:sectionId').post(function(req, res) {
        let sectionId =  req.params.sectionId;
        Student.find({sectionId:sectionId}, function(err, students) {
            res.status(200).json({students});
        });
    });

    studentRouter.route('/parent').post(function(req, res) {
        let studentNumber =  req.body.studentNumber;
        let parentCode =  req.body.parentCode;
        Student.findOne({studentNumber:studentNumber,parentCode:parentCode}, function(err, students) {
            res.status(200).json(students);
        });
    });

    studentRouter.route('/:id').get(function(req, res) {
        let id = req.params.id;
        Student.findById(id, function(err, students) {
            res.json(students);
        });
    });

    studentRouter.route('/update/:id').post(function(req, res) {
        Student.findById(req.params.id, function(err, students) {
            if (!students)
                res.status(404).send("data is not found");
            else{
                students.firstname = req.body.firstname;
                students.lastname = req.body.lastname;
                students.classId = req.body.classId;
                students.studentNumber = req.body.studentNumber;
                students.sectionId = req.body.sectionId;
                students.parentCode = req.body.parentCode;
                students.bioId = req.body.bioId;
            }
            students.save().then(students => {
                    res.json('Student updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    });

    studentRouter.route('/delete/:id').post(function(req, res) {
        Student.findById(req.params.id, function(err, students) {
            if (!students)
                res.status(404).send("Student not found");
            else{
                students.deleteOne().then(students => {
                    res.json('Student section deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });

    studentRouter.route('/add').post(function(req, res) {
        let student = new Student(req.body);
        let dateToday=new Date().toLocaleDateString("en-US");
        student.dateCreated = dateToday;

        student.save()
            .then(student => {
                res.status(200).json({'student': student});
            })
            .catch(err => {
                res.status(400).send('adding new Student Section failed');
            });
    });

    app.use('/student', studentRouter);
}