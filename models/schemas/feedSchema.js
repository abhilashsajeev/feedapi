var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
  title:  String,
  description: String,
  pubdate:   Date,
  author: String,
  link: String,
  source: {
    link: String,
    title: String
  }
});

module.exports = feedSchema;