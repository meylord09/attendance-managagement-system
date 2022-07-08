const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Attendance = new Schema({
    studentId: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    status: {
        type: String
    }
});
module.exports = mongoose.model('Attendance', Attendance);