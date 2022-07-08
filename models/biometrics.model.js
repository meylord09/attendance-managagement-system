const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Biometrics = new Schema({
    dateCaptureed: {
        type: String
    },
    timestamp: {
        type: String
    },
    fingerprintID: {
        type: String
    }
});
module.exports = mongoose.model('Biometrics', Biometrics);