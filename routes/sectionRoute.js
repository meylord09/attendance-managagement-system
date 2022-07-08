module.exports = function(app,express) {

    let ClassSection = require('../models/section.model');
    const classSectionRoute = express.Router();

    classSectionRoute.route('/').get(function(req, res) {
        ClassSection.find(function(err, classSections) {
            if (err) {
                console.log(err);
            } else {
                res.json(classSections);
            }
        });
    });

    classSectionRoute.route('/:id').get(function(req, res) {
        let id = req.params.id;
        ClassSection.findById(id, function(err, classSections) {
            res.json(classSections);
        });
    });

    classSectionRoute.route('/update/:id').post(function(req, res) {
        ClassSection.findById(req.params.id, function(err, classSections) {
            if (!classSections)
                res.status(404).send("data is not found");
            else{
                classSections.name = req.body.name;
                classSections.classId = req.body.classId;
            }
                classSections.save().then(classSections => {
                    res.json('Class updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    });

    classSectionRoute.route('/delete/:id').post(function(req, res) {
        ClassSection.findById(req.params.id, function(err, classSections) {
            if (!classSections)
                res.status(404).send("Class section not found");
            else{
                classSections.deleteOne().then(classSections => {
                    res.json('Class section deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });


    classSectionRoute.route('/delete-all').post(function(req, res) {
        ClassSection.deleteMany({}, function(err, cs) {
              res.status(200).send(cs);
            });
    });

    classSectionRoute.route('/add').post(function(req, res) {
        let classSection = new ClassSection(req.body);
        let dateToday=new Date().toLocaleDateString("en-US");
        classSection.dateCreated = dateToday;

        classSection.save()
            .then(classSection => {
                res.status(200).json({'classSection': 'Class Section added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new Class Section failed');
            });
    });

    app.use('/section', classSectionRoute);
}