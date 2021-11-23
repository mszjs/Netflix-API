const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const expect = chai.expect;
const { app } = require('../app');

describe("Supertest /videos/myvideos endpoint", function () {
    before(async () => {
        await app.appStarted;
    });
    
    it("should succesfully give video by title from 'videos' to 'myvideos' ", async function () {
        await request(app)
            .post('/videos')
            .set('Content-type', 'application/json')
            .set({ 'AdminSecurity': 12345 })
            .send({
                "id": 0,
                "title": "FintechX",
                "category": "string",
                "type": "Movies"
            })

        const videoTitleRes = await request(app)
            .post('/videos/myvideos?videoTitle=FintechX')
            .set('Content-type', 'application/json')
        expect(videoTitleRes.body).to.be.eql({ id: 0, title: 'FintechX', category: 'string', type: 'Movies' });
        expect(videoTitleRes.body).to.not.eql({ id: 10, title: 'FintechX', category: 'string', type: 'Movies' });
        expect(videoTitleRes.status).to.be.equal(200);
    });

    it("should respond 200 with 'Sorted list - asc' message ", async function () {
        await request(app)
            .post('/videos')
            .set('Content-type', 'application/json')
            .set({ 'AdminSecurity': 12345 })
            .send({
                "id": 0,
                "title": "FintechX",
                "category": "string",
                "type": "Movies"
            })

        await request(app)
            .post('/videos/myvideos?videoTitle=FintechX')
            .set('Content-type', 'application/json')

        const sortAscRes = await request(app)
            .get('/videos/myVideos?sort=asc')
            .set('Content-type', 'application/json')

        expect(sortAscRes.status).to.be.equal(200);
        expect(sortAscRes.body.message).to.be.equal('Sorted list - asc');
    });
});