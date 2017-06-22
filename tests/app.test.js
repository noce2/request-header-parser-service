/* eslint linebreak-style: ["error", "windows"]*/

const request = require('supertest');
const app = require('../app').app;

describe('Given the server is initialised', () => {
  describe('when . .  ', () => {
    it('should . . . ', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });
  });
});
