const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const expect = chai.expect;
const { app } = require('../app');

describe("Supertest /videos endpoint", function () {
    before(async () => {
        await app.appStarted;
    });

    it("should respond 404 if the AdminSecurity key is valid", async function () {
        const res = await request(app)
            .get('/videos?videoTitle=sajtocska')
            .set('Content-type', 'application/json')
            .set({ 'AdminSecurity': 12345 })

        expect(res.status).to.be.equal(404);
        expect(res.body.message).to.be.equal('Video not found');
    });

    it("should respond 200 with 'Video added to queue' message", async function () {
        const res = await request(app)
            .post('/videos')
            .set('Content-type', 'application/json')
            .set({ 'AdminSecurity': 12345 })
            .send({
                "id": 0,
                "title": "FintechX",
                "category": "string",
                "type": "Movies"
            })

        expect(res.body.message).to.be.equal('Video added to queue');
        expect(res.status).to.be.equal(200);
    });
});

