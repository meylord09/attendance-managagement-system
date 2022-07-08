const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Excuse = new Schema({
    date: {
        type: String
    },
    time: {
        type: String
    },
    forDate: {
        type: String
    },
    studentId: {
        type: String
    },
    message:{
        type: String
    }
});
module.exports = mongoose.model('Excuse', Excuse);