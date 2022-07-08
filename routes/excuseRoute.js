module.exports = function(app,express) {

    const excuseRouter = express.Router();
    let Excuse = require('../models/excuse.model');
    let Message = require('../models/message.model');
    
    excuseRouter.route('/').get(function(req, res) {
        Excuse.find(function(err, excs) {
            if (err) {
                console.log(err);
            } else {
                res.json(excs);
            }
        });
    });
    
    excuseRouter.route('/').get(function(req, res) {
        Excuse.find(function(err, excs) {
            if (err) {
                console.log(err);
            } else {
                res.json(excs);
            }
        });
    });

    excuseRouter.route('/add').post(function(req, res) {
        let excuseLetter = new Excuse(req.body);
        excuseLetter.date = new Date().toLocaleDateString("en-US");
        excuseLetter.time = new Date().toLocaleTimeString("en-US");
        excuseLetter.save()
            .then(exc => {
                // Add to message queue
                let msg = new Message();
                msg.code='ADDED_EXCUSE';
                msg.save()

                res.status(200).json({'message': 'Excuse Letter added successfully'});
            })
            .catch(err => {
                res.status(400).send('Adding new Excuse letter failed');
            });
    });

    excuseRouter.route('/delete/:id').post(function(req, res) {
        Excuse.findById(req.params.id, function(err, excu) {
            if (!excu)
                res.status(404).send("Excuse letter not found");
            else{
                excu.deleteOne().then(teacher => {
                    res.json('Excuse letter deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });

    excuseRouter.route('/delete-all').post(function(req, res) {
        Excuse.deleteMany({}, function(err, exc) {
              res.status(200).send(exc);
            });
    });

    app.use('/excuse', excuseRouter);

};