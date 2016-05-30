var express = require('express');
var router = express.Router();
var readXML = require('../utils/readxml');

var readXMLandSendResponse = (url, res)=> {
  readXML(url)
  .then((data) => {
    console.log('data found', data)
    res.status(200).json(data);
  })
}

router.get('/hindu', (req, res) => {
    readXMLandSendResponse('http://www.thehindu.com/news/national/?service=rss', res)
});

router.get('/timesofindia', (req, res) => {
  readXMLandSendResponse('http://timesofindia.indiatimes.com/rssfeedstopstories.cms', res);
});
router.get('/indianexpress', (req, res) => {
  readXMLandSendResponse('http://indianexpress.com/section/india/feed/', res);
});



module.exports = router;