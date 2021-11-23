const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const expect = chai.expect;
const { app } = require('../app.js');

describe("Supertest /logout endpoint", function () {

    before(async () => {
        await app.appStarted;
    });

    it("should respond 400 after invalid sessionID", async () => {
        const res = await request(app)
            .get('/logout')
            .set('Content-type', 'application/json')
            .set({ 'sessionID': 1001 })

        expect(res.status).to.be.equal(400);
        expect(res.body.message).to.be.equal('Unexpected error');
    });

    it("should respond 200 after valid sessionID", async () => {
        await request(app)
            .post('/api/v1/session')
            .set('Content-type', 'application/json')
            .send({
                "userId": "617fe53cb85e0697cff08ca9",
                "sessionID": 2000,
            })

        const res = await request(app)
            .get('/logout')
            .set('Content-type', 'application/json')
            .set({ 'sessionID': 2000 })

        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('Logged out');
    })
});
