const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Classes = new Schema({
    name: {
        type: String
    },
    dateCreated: {
        type: String
    }
});
module.exports = mongoose.model('Classes', Classes);