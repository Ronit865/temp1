//make login credential model here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    }
})

const Login = mongoose.model('//YOUR_MODEL_NAME', loginSchema);

module.exports = Login;