/* eslint linebreak-style: ["error", "windows"]*/
const http = require('http');
const errorHandler = require('./errorHandler').errorHandler;


module.exports.findAndSendWeather = (locationData, res) => {
  const apiTarget = 'api.openweathermap.org';
  const queryParams = {
    lat: locationData.lat,
    lon: locationData.lon,
    APPID: '078ecb2576afa59e6e132d1ce4c68684',
    units: 'metric',
  };
  if (queryParams.lat && queryParams.lon && queryParams.APPID && queryParams.units) {
    const querystring = `/data/2.5/weather?lat=${queryParams.lat}&lon=${queryParams.lon}&APPID=${queryParams.APPID}&units=${queryParams.units}`;
    const options = {
      hostname: apiTarget,
      path: querystring,
    };
    http.get(options, (_res) => {
      let receivedData = '';
      let receivedTimes = 1;
      try {
        if (_res.statusCode !== 200) {
          throw new Error('response with wrong status code');
        } else if (!(/application\/json/).test(_res.headers['content-type'])) {
          throw new Error('response with wrong data type');
        }
        _res.setEncoding('utf8');
        _res.on('data', (chunk) => {
          console.log(`data received ${receivedTimes} times`);
          receivedData += chunk;
          receivedTimes += 1;
        });
        _res.on('end', () => {
          res.send(receivedData);
        });
      } catch (_err) {
        const message = errorHandler(_err);
        console.log(message);
        res.send(message);
      }
    });
  } else {
    res.send(JSON.stringify({ error: 'the necessary query parameters were not attached to the request' }));
  }
};
