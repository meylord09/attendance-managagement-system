const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Message = new Schema({
    code: {
        type: String
    },
    value: {
        type: String
    }
});
module.exports = mongoose.model('Message', Message);