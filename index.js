var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');

var routes = require('./routes/routes');

var app = express();



app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req , res) => {
  res.send(200)
});

app.use('/today', routes);

app.listen(process.env.PORT || 3000, function () {
	console.log('App started at PORT ', process.env.PORT || 3000);
});