var express = require('express');
var router = express.Router();
var feedController = require('../controllers/feedController')

router.get('/hindu', (req, res) => {
    feedController
    .readXMLandSendResponse('http://www.thehindu.com/news/national/?service=rss', res)
});

router.get('/timesofindia', (req, res) => {
  feedController
  .readXMLandSendResponse('http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms', res);
});
router.get('/indianexpress', (req, res) => {
  feedController
  .readXMLandSendResponse('http://indianexpress.com/section/india/feed/', res);
});



module.exports = router;