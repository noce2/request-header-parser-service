const express = require('express');
const ConstReqParser = require('./app/customReqParser.class').CustomReqParser;

const myapp = express();

// Initial Settings
myapp.set('port', (process.env.PORT || 5000));
myapp.get('/', (req, res) => {
  res.send(ConstReqParser.createFromReq(req));
  
});
// Starting the application
myapp.listen(myapp.get('port'), () => {
  console.log(`now listening at ${myapp.get('port')}`);
});
