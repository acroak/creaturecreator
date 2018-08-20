const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema(
  {
  username: {type: String, unique: true},
  password: String,
    //add min length field
  messages: [String],
  class: String
  }

);

const Users = mongoose.model('User', userSchema);
module.exports = Users;
