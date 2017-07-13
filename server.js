// server.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();


// middleware
var bodyParser = require('body-parser')
app.use(bodyParser.json())

var routes = require('./server/routes')
routes(app)
app.use(express.static('server/views'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
