/* eslint linebreak-style: ["error", "windows"]*/
const expectjs = require('expect.js');
const myapp = require('../app').app;
const testRequest = require('supertest');

describe('Given my client is on https://s.codepen.io and from ip address 178.106.245.177 \n', ()=> {
  describe('When a get request is made to /dameelclima \n', () => {
    const weatherReq = testRequest(myapp)
      .get('/dameelclima')
      .set('Origin', 'https://s.codepen.io')
      .set('Accept-Language', 'en-GB, en-US; q=0.8,en;q=0.6')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36')
      .set('X-Forwarded-For', '178.106.245.177');
    it('Should respond with a json containing properties main, name, sys, \
    and weather', function(done){
        this.timeout(10000);
        weatherReq
          .expect((_res) => {
            expectjs(JSON.parse(_res.text)).to.have.keys(['main', 'name', 'sys', 'weather']);
          })
          .expect(200, done);
      });
  });
});

describe('Given my client is on https://noce2.github.io and from ip address 178.106.245.177 \n', ()=> {
  describe('When a get request is made to /dameelclima \n', () => {
    const weatherReq = testRequest(myapp)
      .get('/dameelclima')
      .set('Origin', 'https://noce2.github.io')
      .set('Accept-Language', 'en-GB, en-US; q=0.8,en;q=0.6')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36')
      .set('X-Forwarded-For', '178.106.245.177');
    it('Should respond with a json containing properties main, name, sys, \
    and weather', function(done){
        this.timeout(10000);
        weatherReq
          .expect((_res) => {
            expectjs(JSON.parse(_res.text)).to.have.keys(['main', 'name', 'sys', 'weather']);
          })
          .expect(200, done);
      });
  });
});
