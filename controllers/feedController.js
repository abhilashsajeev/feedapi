var readXML = require('../utils/readxml');


exports.readXMLandSendResponse = (url, res)=> {
  readXML(url)
  .then((data) => {
    console.log('data found', data)
    res.status(200).json(data);
  })
}