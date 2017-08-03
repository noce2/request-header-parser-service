/* eslint linebreak-style: ["error", "windows"]*/
const http = require('http');

const ConstReqParser = require('./customReqParser.class').CustomReqParser;
const errorHandler = require('./errorHandler').errorHandler;
const findAndSendWeather = require('./findAndSendWeather').findAndSendWeather;

const findLocation = (req, res) => {
  let latAndLon = {};
  const permissibleUrls = [/https:\/\/s\.codepen\.io\/?/g, /https:\/\/noce2\.github\.io\/?/g];
  const reqOrigin = req.get('Origin');
  const detectedUrl = permissibleUrls.filter(each => each.test(reqOrigin));
  if (detectedUrl.length === 1){
    res.set({
      'Access-Control-Allow-Origin': reqOrigin,
    });
  }
  const ipaddressdirty = ConstReqParser.createFromReq(req).ipaddress;
  const ipPattern = /(\d+\.\d+\.\d+\.\d+)/g;
  if (ipaddressdirty.match(ipPattern) || !process.env.NODE_ENV) {
    let ipaddress;
    if (process.env.NODE_ENV) {
      // i.e its in production
      ipaddress = ipaddressdirty.match(ipPattern)[0];
    } else {
      ipaddress = '178.97.15.242';
    }

    const _options = {
      hostname: 'ip-api.com',
      path: `/json/${ipaddress}`,
    };
    http.get(_options, (response) => {
      try {
        if (response.statusCode !== 200) {
          throw new Error('response with wrong status code');
        } else if (!(/application\/json/).test(response.headers['content-type'])) {
          throw new Error('response with wrong data type');
        }
        response.setEncoding('utf8');
        let rawData = '';
        let i = 1;
        response.on('data', (chunk) => {
          console.log(`data received ${i} times`);
          rawData += chunk;
          i += 1;
        });
        response.on('end', () => {
          try {
            const parsedResponse = JSON.parse(rawData);
            console.log(parsedResponse);
            latAndLon.lat = parsedResponse.lat;
            latAndLon.lon = parsedResponse.lon;
            findAndSendWeather(latAndLon, res);
          } catch (_error) {
            const message = errorHandler(_error);
            console.log(message);
          }
        });
      } catch (_err) {
        const message = errorHandler(_err);
        console.log(message);
      }
    });
  } else {
    res.send(JSON.stringify({ error: 'no ip address found' }));
  }
};

module.exports.findLocation = findLocation;
