var readXML = require('../utils/readxml');
var _ = require('lodash');
var Promise = require('bluebird').Promise;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/feed');

var Feed = require('../models/feedModel');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


function formatFeedResponse(data) {
	// body...
	return new Promise((resolve)=>{
		var feedJSON = []
		if(_.isArray(data)) {
			feedJSON = _.map(data, (x) => {
				return {
					source: {
						link: x.meta.title,
						title: x.meta.link
					},
					title: x.title,
					description: x.description,
					pubdate: x.pubdate,
					link: x.link,
					author: x.author
				}
			})
		}
		_.each(feedJSON, insertToDB);
		resolve(feedJSON);	
	})
}

function insertToDB(feed){
	var newsFeed = new Feed(feed);
	newsFeed.save((err) => {
		if(err){
			console.log("Error", err);
		}
	})
}


var readXMLandSendResponse = (url, res) => {
	readXML(url)
	.then(formatFeedResponse)
	.then((data)=>{
		res.status(200).json(data);
	})
}

module.exports = {
	readXMLandSendResponse: readXMLandSendResponse
};