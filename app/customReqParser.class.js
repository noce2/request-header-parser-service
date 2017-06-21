/* eslint linebreak-style: ["error", "windows"]*/
function CustomReqParser(ipaddress = 'none', language = 'none', OS = 'none') {
  // This is the definition of my Custom Request Class
  // it contains the fields I want to strip out of the
  // original request and send to the user

  this.ipaddress = ipaddress;
  this.language = language;
  this.OS = OS;
}

CustomReqParser.createFromReq = (_request) => {
  // this will strip out the key fields I want;
  let ipaddress;
  let language;
  let OS;

  if (_request && _request.socket && _request.headers) {
    if (_request.socket.remoteAddress) {
      // for the above I decided to access it via Node's API.
      // no particular reason
      ipaddress = _request.socket.remoteAddress;
    }

    if (_request.headers['accept-language']) {
      const splitAcceptLang = _request.headers['accept-language'].split(';');
      language = splitAcceptLang[0];
    }

    if (_request.headers['user-agent']) {
      // this part of the code tries to extract the OS info from this value

      // only picking up the first result because I'm expecting that to be OS
      // made the regexp match lazy so that it doesn't include other brackets in b/w
      const OSConBrackets = _request.headers['user-agent'].match(/(\(.+?\))/g)[0];
      OS = OSConBrackets.slice(1, -1);
    }
  }


  return new CustomReqParser(ipaddress || 'none found', language || 'none found', OS || 'none found');
};

module.exports.CustomReqParser = CustomReqParser;
