var mongoose = require('mongoose');
var feedSchema = require('./schemas/feedSchema');

var Feed = mongoose.model('Feed', feedSchema);

module.exports  = Feed;