/* eslint linebreak-style: ["error", "windows"]*/
const assert = require('assert');
const CustomReqParser = require('./customReqParser.class').CustomReqParser;

let testRequest;

describe('Given the CustomReqParserClass is instantiated', () => {
  describe('When the request object contains the right fields and it is passed to the CustomerReqParserClass.createFromReq method', () => {
    beforeEach(() => {
      testRequest = {
        headers: {
          'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
          'accept-language': 'en-GB,en-US;q=0.8,en;q=0.6',
        },
        socket: {
          remoteAddress: '173.194.79.94',
        },
      };
    });
    it('Should return a JSON containing those fields and their values', () => {
      assert.strictEqual(
        JSON.stringify(CustomReqParser.createFromReq(testRequest)),
        JSON.stringify({
          ipaddress: '173.194.79.94',
          language: 'en-GB,en-US',
          OS: 'iPhone; CPU iPhone OS 9_1 like Mac OS X',
        }));
    });
  });
  describe('When the request object is empty and it is passed to the CustomerReqParserClass.createFromReq method', () => {
    beforeEach(() => {
      testRequest = {};
    });
    it('it should return a JSON with "none found" for the desired parameters', () => {
      assert.strictEqual(
        JSON.stringify(CustomReqParser.createFromReq(testRequest)),
        JSON.stringify({
          ipaddress: 'none found',
          language: 'none found',
          OS: 'none found',
        }));
    });
  });
  describe('When the request object partially contains the desired parameters and it is passed to the CustomerReqParserClass.createFromReq method', () => {
    beforeEach(() => {
      testRequest = {
        headers: {
          'accept-language': 'en-GB,en-US;q=0.8,en;q=0.6',
        },
        socket: {
          remoteAddress: '173.194.79.94',
        },
      };
    });
    it('it should return a partially populated JSON with "none found" for the applicable parameters', () => {
      assert.strictEqual(
        JSON.stringify(CustomReqParser.createFromReq(testRequest)),
        JSON.stringify({
          ipaddress: '173.194.79.94',
          language: 'en-GB,en-US',
          OS: 'none found',
        }));
    });
  });
});
