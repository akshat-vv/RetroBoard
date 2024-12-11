const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  content: String,
  likes: [String],
  createdBy: mongoose.Schema.Types.ObjectId,
});

const columnSchema = new mongoose.Schema({
  title: String,
  cards: [cardSchema]
});

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  columns: [columnSchema],
  createdBy: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Board', boardSchema);
