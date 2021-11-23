const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const expect = chai.expect;
const { app } = require('../app.js');

describe("Supertest /api/v1/user endpoint", function () {

    it("should respond 201 after user created", async () => {
        const res = await request(app)
            .post('/api/v1/user')
            .set('Content-type', 'application/json')
            .send({
                "username": "elefant",
                "password": "sanyika"
            })

        await request(app)
            .delete(`/api/v1/user/${res.body['_id']}`)
            .set('Content-type', 'application/json')

        const res2 = await request(app)
            .post('/api/v1/user')
            .set('Content-type', 'application/json')
            .send({
                "username": "elefant",
                "password": "sanyika"
            })
        expect(res2.status).to.be.equal(201);
        expect(res2.body.password).to.be.equal('sanyika');
    });

    it("should respond 400 when user already exist", async () => {
        await request(app)
            .post('/api/v1/user')
            .set('Content-type', 'application/json')
            .send({
                "username": "orbanviktor",
                "password": "sanyika"
            })

        const res = await request(app)
            .post('/api/v1/user')
            .set('Content-type', 'application/json')
            .send({
                "username": "orbanviktor",
                "password": "sanyika"
            })

        expect(res.status).to.be.equal(400);
        expect(res.body.message).to.include('duplicate key error');
    });
});