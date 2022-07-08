const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Teacher = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    sectionId:{
        type: String
    },
    password:{
        type: String
    },
    dateCreated:{
        type: String
    }
});
module.exports = mongoose.model('Teacher', Teacher);