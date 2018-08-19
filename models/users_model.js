//Set up
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

//User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, uniqueCaseInsensitive: true },
  password: { type: String, required: true }
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);
