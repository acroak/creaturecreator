const mongoose = require('mongoose');


const beastSchema = new mongoose.Schema({
  beastImg: String,
  name: String,
  description: String,
  tags: String
});


const Beast = mongoose.model('Beast', beastSchema)

module.exports = Beast;
