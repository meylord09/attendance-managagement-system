module.exports = function(app,express) {

    const biometricRouter = express.Router();
    let Biometrics = require('../models/biometrics.model');
   
    biometricRouter.route('/').get(function(req, res) {
        Biometrics.find(function(err, bios) {
            if (err) {
                console.log(err);
            } else {
                res.json(bios);
            }
        });
    });

    biometricRouter.route('/add/:fingerprintID').post(function(req, res) {
        console.log('Adding new biometric with fingerprintID: ',req.params.fingerprintID);
        let biometric = new Biometrics();
        biometric.fingerprintID=req.params.fingerprintID;
        biometric.dateCaptureed = new Date().toLocaleDateString("en-US");
        biometric.timestamp = new Date().getTime() / 1000; // use epoch
        biometric.save()
            .then(bio => {
                res.status(200).json({'message': 'Biometric added successfully'});
            })
            .catch(err => {
                res.status(400).send('Adding new Biometric failed');
            });
    });

    biometricRouter.route('/delete/:id').post(function(req, res) {
        Biometrics.findById(req.params.id, function(err, biometric) {
            if (!biometric)
                res.status(404).send("Biometric not found");
            else{
                biometric.deleteOne().then(teacher => {
                    res.json('Biometric deleted!');
                })
                .catch(err => {
                    res.status(400).send("Delete not possible");
                });
            }
        });
    });

    biometricRouter.route('/delete-all').post(function(req, res) {
        Biometrics.deleteMany({}, function(err, biometric) {
              res.status(200).send(biometric);
            });
    });

    app.use('/biometrics', biometricRouter);

};