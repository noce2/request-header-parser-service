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
myapp.set('trust proxy', true);

function errorHandler(error) {
  console.log(`error message: ${error}`);
  return { error: `encountered server ${error}` };
}

// Routing

myapp.get('/', (req, res) => {
  res.render('index');
});

myapp.get('/sabesquiensoy', (req, res) => {
  res.send(JSON.stringify(ConstReqParser.createFromReq(req)));
});

myapp.get('/dondeestoy', (req, res) => {
  const permissibleUrls = [/https:\/\/s\.codepen\.io\/?/g, /https:\/\/noce2\.github\.io\/?/g];
  const reqOrigin = req.get('Origin');
  const detectedUrl = permissibleUrls.filter(each => each.test(reqOrigin));
  if (detectedUrl.length === 1) {
    const allowAbleOrigin = reqOrigin;
    res.set({
      'Access-Control-Allow-Origin': allowAbleOrigin,
    });
  }
  const ipaddressdirty = ConstReqParser.createFromReq(req).ipaddress;
  const ipPattern = /(\d+\.\d+\.\d+\.\d+)/g;
  if(ipaddressdirty.match(ipPattern) || !process.env.NODE_ENV){
    let ipaddress;
    if(process.env.NODE_ENV){
      // i.e its in production
      ipaddress = ipaddressdirty.match(ipPattern)[0];
    } else {
      ipaddress = '178.97.15.242';
    }
    
    const _options = {
      hostname: 'ip-api.com',
      path: `/json/${ipaddress}`,
    };
    const _serverReq = http.get(_options, (response) => {
      try {
        if (response.statusCode !== 200){
          throw new Error('response with wrong status code');
        } else if (!(/application\/json/).test(response.headers['content-type'])) {
          throw new Error('response with wrong data type');
        }
        response.setEncoding('utf8');
        let rawData = '';
        let i = 1;
        response.on('data', (chunk)=> {
          console.log(`data received ${i} times`);
          rawData += chunk;
          i += 1;
        });
        response.on('end', () => {
          try {
            const parsedResponse = JSON.parse(rawData);
            console.log(parsedResponse);
            res.send(rawData);
          } catch (_error) {
            res.send(errorHandler(_error));
          }
        });
      } catch (_err) {
        res.send(errorHandler(_err));
      }
    });
  } else {
    res.send(JSON.stringify({error: 'no ip address found'}));
  }
});

myapp.get('/dameelclima', (req, res) => {
  const apiTarget = 'api.openweathermap.org/data/2.5/weather';
  const queryParams = req.query;
  const querystring = `?lat=${queryParams.lat}&lon=${queryParams.lon}&APPID=${queryParams.APPID}&units=${queryParams.units}`;
  const _options = {
    hostname: apiTarget,
    path: queryParams,
  };
  http.get(_options, (_res) => {
    let receivedData = '';
    let receivedTimes = 1;
    let jsonResult;
    console.log(`Status: ${_res.statusCode}`);
    _res.setEncoding('utf8');
    _res.on('data', (chunk) => {
      console.log(`data received ${receivedTimes} times`);
      receivedData += chunk;
      receivedTimes += 1;
    });
    _res.on('end', () => {
      res.send(receivedData);
    });
  });
});

// Starting the application
myapp.listen(myapp.get('port'), () => {
  // console.log(`now listening at ${myapp.get('port')}`);
});
// the below is needed to expose the app for imports
module.exports.app = myapp;
