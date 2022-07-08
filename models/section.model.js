const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ClassSection = new Schema({
    name: {
        type: String
    },
    classId: {
        type: String
    },
    dateCreated: {
        type: String
    }
});
module.exports = mongoose.model('ClassSection', ClassSection);