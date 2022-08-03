const mongoose = require('mongoose');
const validator = require('validator');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;