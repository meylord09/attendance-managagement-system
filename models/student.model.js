const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Student = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    studentNumber: {
        type: String
    },
    classId:{
        type: String
    },
    sectionId:{
        type: String
    },
    bioId: {
        type: String
    },
    parentCode:{
        type: String  
    },
    dateCreated:{
        type: String
    }
});
module.exports = mongoose.model('Student', Student);