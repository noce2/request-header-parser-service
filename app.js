/* eslint linebreak-style: ["error", "windows"]*/
const express = require('express');
const path = require('path');

const ConstReqParser = require('./app/customReqParser.class').CustomReqParser;
const findWeather = require('./app/findLocation').findLocation;

const myapp = express();
const port = (process.env.PORT || 5000);
// Initial Settings
myapp.use('/public', express.static(path.join(__dirname, 'public')));
myapp.set('port', port);
myapp.set('views', './views');
myapp.set('view engine', 'pug');
myapp.set('trust proxy', true);
// Routing

myapp.get('/', (req, res) => {
  res.render('index');
});

myapp.get('/sabesquiensoy', (req, res) => {
  res.send(JSON.stringify(ConstReqParser.createFromReq(req)));
});

myapp.get('/dameelclima', (req, res) => {
  findWeather(req, res);
});

// Starting the application
myapp.listen(myapp.get('port'), () => {
  // console.log(`now listening at ${myapp.get('port')}`);
});
// the below is needed to expose the app for imports
module.exports.app = myapp;
