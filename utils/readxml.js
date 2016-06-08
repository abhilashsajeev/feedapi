var FeedParser = require('feedparser')
  , request = require('request');
var feedparser = new FeedParser();
var Promise = require('bluebird');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    var req = request(url);
    var dataArray = [];
    req.on('error', (error) => {
      // handle any request errors
      reject(error);
    });
    req.on('response', function (res) {
      var stream = this;

      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

      stream.pipe(feedparser);
    });


    feedparser.on('error', (error) => {
      // always handle errors 
      reject(error);
    });
    feedparser.on('readable', function () {
      // This is where the action is! 
      var stream = this
        , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance 
        , item;

      while (item = stream.read()) {
        dataArray.push(item);
      }
    });

    feedparser.on('end', () => {
      resolve(dataArray);
    });
  });

}