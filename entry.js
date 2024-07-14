// Define the Entry model
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  content: String
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;