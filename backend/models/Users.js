const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    telephone:{
      type: Number,
      unique: true
    },

    password: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('User', userSchema)
