'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/user.model');
const should = chai.should();

chai.use(chaiHttp);

describe('User Controllers', () => {
    // clear existing data
    beforeEach((done) => {
        User.deleteOne({}, (err) => {
            done();
        });
    });

    // list all users list
    describe('Users List => /GET /api/user/list-users', () => {
        it('It should return all users list.', () => {
            chai.request(server)
                .get('/api/user/list-users')
                .end((err, res) => {
                    res.should.be.a.json;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.should.have.property('status');
                    res.body.status.should.equal('success');
                });
        });
    });

    // Get user by UserId
    describe('Users List => /GET /api/user/find-user/:userId', () => {
        it('It should return user details by userId.', () => {
            let user = new User({
                name: 'Peter Parker',
                email: 'Peter.parker@gmail.com',
                phone: '9837263910',
                password: 'User@1234'
            })
            user.save((err, user) => {
                chai.request(server)
                    .get('/api/user/find-user/' + user.id)
                    .end((err, res) => {
                        res.should.be.a.json;
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data');
                        res.body.should.have.property('status');
                        res.body.status.should.equal('success');
                        res.body.data.should.have.property('_id').eql(user.id);
                    });
            });
        });
    });
});
