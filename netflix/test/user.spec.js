const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const expect = chai.expect;
const { app } = require('../app');

describe("Supertest /user", function () {
    before(async () => {
        await app.appStarted;
    });

    it("should respond 200 with 'User created' message", async function () {
        const resCreateUser = await request(app)
            .post('/user')
            .set('Content-type', 'application/json')
            .send({
                "id": 1,
                "username": "Jani",
                "password": "Jani"
            })
        expect(resCreateUser.status).to.be.equal(200);
        expect(resCreateUser.body.message).to.be.equal('User created');
    });

    it("should respond 400 with 'User already exist' message", async function () {
        await request(app)
            .post('/user')
            .set('Content-type', 'application/json')
            .send({
                "id": 1,
                "username": "Jani",
                "password": "Jani"
            })

        const resCreateUser = await request(app)
            .post('/user')
            .set('Content-type', 'application/json')
            .send({
                "id": 1,
                "username": "Jani",
                "password": "Jani"
            })

        expect(resCreateUser.status).to.be.equal(400);
        expect(resCreateUser.body.message).to.be.equal('User already exist');
    });
});