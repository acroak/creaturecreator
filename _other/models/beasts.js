const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beastSchema = new mongoose.Schema({
  beastImg: String,
  name: String,
  description: String,

})




const Beast = mongoose.model('Beast', beastSchema)

module.exports.Beast = Beast
