const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beastSchema = new mongoose.Schema({
  beastImg: String,
  name: String,
  description: String,

})
const usersSchema = new Schema({
  username: String,
  password: String,
  beasts: [beastSchema]
})


const User = mongoose.model('User', usersSchema)
const Beast = mongoose.model('Beast', beastSchema)

module.exports.Beast = Beast
module.exports.User = User
