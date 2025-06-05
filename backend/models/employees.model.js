//make employees model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: { 
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: Int,
        required: true,
        match: /^\d{10}$/
    },
    department: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
});

const employee = mongoose.model('//YOUR_MODEL_NAME', empSchema);

module.exports = employee;