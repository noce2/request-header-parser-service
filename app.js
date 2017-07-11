/* eslint linebreak-style: ["error", "windows"]*/
const express = require('express');
const path = require('path');
const http = require('http');
const ConstReqParser = require('./app/customReqParser.class').CustomReqParser;

const myapp = express();
const port = (process.env.PORT || 5000);
// Initial Settings
myapp.use('/public', express.static(path.join(__dirname, 'public')));
myapp.set('port', port);
myapp.set('views', './views');
myapp.set('view engine', 'pug');

// Routing

myapp.get('/', (req, res) => {
  res.render('index');
});

myapp.get('/sabesquiensoy', (req, res) => {
  res.send(JSON.stringify(ConstReqParser.createFromReq(req)));
});

myapp.get('/dondeestoy', (req, res) => {
  const ipaddressdirty = ConstReqParser.createFromReq(req).ipaddress;
  const ipPattern = /(\d+\.\d+\.\d+\.\d+)/g;
  if(ipaddressdirty.match(ipPattern)){
    const ipaddress = ipaddressdirty.match(ipPattern)[0];
    const _options = {
      hostname: 'http://ip-api.com',
      path: `/json/${ipaddress}`,
    };
    const _serverReq = http.request(_options);
    _serverReq.on('response', (response) => {
      res.send(response.body);
    });
    _serverReq.end();

  } else {
    res.send('no ip address found');
  }
  
  /*
  let _serverReq = http.request(_options, ()=> {

  });
  */
});
// Starting the application
myapp.listen(myapp.get('port'), () => {
  // console.log(`now listening at ${myapp.get('port')}`);
});
// the below is needed to expose the app for imports
module.exports.app = myapp;
