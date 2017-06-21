/* eslint linebreak-style: ["error", "windows"]*/
const express = require('express');
const path = require('path');
const ConstReqParser = require('./app/customReqParser.class').CustomReqParser;

const myapp = express();

// Initial Settings
myapp.use('/public', express.static(path.join(__dirname, 'public')));
myapp.set('port', (process.env.PORT || 5000));
myapp.set('views', './views');
myapp.set('view engine', 'pug');

// Routing

myapp.get('/', function(req, res){
  res.render('index');
});

myapp.get('/sabesquiensoy', (req, res) => {
  res.send(JSON.stringify(ConstReqParser.createFromReq(req)));
});
// Starting the application
myapp.listen(myapp.get('port'), () => {
  console.log(`now listening at ${myapp.get('port')}`);
});
