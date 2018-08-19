// Set Up
const mongoose = require('mongoose');

// Beast Schema
const beastSchema = new mongoose.Schema({
  beastName: String,
  origin: String,
  description: String,
  share: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Beast', beastSchema);
