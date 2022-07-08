module.exports = function(app,express) {

    const teacherRouter = express.Router();
    let Teacher = require('../models/teacher.model');
   
    teacherRouter.route('/').get(function(req, res) {
        Teacher.find(function(err, teachers) {
            if (err) {
                console.log(err);
            } else {
                res.json(teachers);
            }
        });
    });

    teacherRouter.route('/delete/:id').post(function(req, res) {
        Teacher.findById(req.params.id, function(err, teachers) {
            if (!teachers)
                res.status(404).send("Teacher not found");
            else{
                teachers.deleteOne().then(teacher => {
                    res.json('Teacher deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });

    teacherRouter.route('/:id').get(function(req, res) {
        let id = req.params.id;
        Teacher.findById(id, function(err, teacher) {
            res.json(teacher);
        });
    });

    teacherRouter.route('/update/:id').post(function(req, res) {
        Teacher.findById(req.params.id, function(err, teacher) {
            if (!teacher)
                res.status(404).send("data is not found");
            else{
                teacher.firstname = req.body.firstname;
                teacher.lastname = req.body.lastname;
                teacher.phone = req.body.phone;
                teacher.email = req.body.email;
                teacher.sectionId = req.body.sectionId;
                
                teacher.save().then(teacher => {
                    res.json('Teacher updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
            }
        });
    });

    teacherRouter.route('/delete-all').post(function(req, res) {
        Teacher.deleteMany({}, function(err, cs) {
              res.status(200).send(cs);
            });
    });

    teacherRouter.route('/add').post(function(req, res) {
        let teacher = new Teacher(req.body);
        let dateToday=new Date().toLocaleDateString("en-US");
        teacher.dateCreated = dateToday;
        teacher.save()
            .then(teacher => {
                res.status(200).json({'teacher': 'teacher added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new teacher failed');
            });
    });

    app.use('/teacher', teacherRouter);

};