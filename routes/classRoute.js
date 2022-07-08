module.exports = function(app,express) {

    const classRouter = express.Router();
    let Classes = require('../models/classes.model');

    classRouter.route('/').get(function(req, res) {
        Classes.find(function(err, classes) {
            if (err) {
                console.log(err);
            } else {
                res.json(classes);
            }
        });
    });

    classRouter.route('/:id').get(function(req, res) {
        let id = req.params.id;
        Classes.findById(id, function(err, classes) {
            res.json(classes);
        });
    });

    classRouter.route('/update/:id').post(function(req, res) {
        Classes.findById(req.params.id, function(err, classes) {
            if (!classes)
                res.status(404).send("data is not found");
            else
                classes.name = req.body.name;
                classes.dateCreated = req.body.dateCreated;
                classes.save().then(classes => {
                    res.json('Class updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    });

    classRouter.route('/delete-all').post(function(req, res) {
        Classes.deleteMany({}, function(err, cs) {
              res.status(200).send(cs);
            });
    });

    classRouter.route('/delete/:id').post(function(req, res) {
        Classes.findById(req.params.id, function(err, classes) {
            if (!classes)
                res.status(404).send("Class not found");
            else{
                classes.deleteOne().then(classes => {
                    res.json('Class deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });

    classRouter.route('/add').post(function(req, res) {
        let classes = new Classes(req.body);
        let dateToday=new Date().toLocaleDateString("en-US");
        classes.dateCreated = dateToday;
        classes.save()
            .then(classes => {
                res.status(200).json({'classes': 'Class added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new Class failed');
            });
    });

    app.use('/classes', classRouter);

}
