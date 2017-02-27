const request = require('request-promise').defaults({
    encoding: null,
    simple: false,
    resolveWithFullResponse: true
});

const should = require('should');
const config = require('config');

const host = 'http://127.0.0.1:3005';
const User = require('../models/user');

const app = require('../server');

let server;

describe("Server", () => {
    before(done => {
        server = app.listen(3005, '127.0.0.1', done);
    });

    after(done => {
        server.close(done);
    });

    describe('GET /users', () => {
        beforeEach(async () => {
            await createUsers();
        });

        afterEach(async () => {
            await User.remove({});
        });
        
        context('if users exist', () => {
            it('return 200 should return 3 users', async () => {
                const res = await request.get(`${host}/users`);
                let resLength = parseBody(res.body).length;
                
                res.statusCode.should.be.equal(200);
                resLength.should.be.equal(3);
            });
        })
    })

    describe('GET /users/:id', () => {
        afterEach(async () => {
            await User.remove({});
        });

        context('if not exist', () => {
            it('should return 404 ', async () => {
                const res = await request.get(`${host}/users/randomId`);
                
                res.statusCode.should.be.equal(404);
            });
        })

        context('if exist', () => {

            it('should return 200 and user', async () => {
                let user = await User.create({email: 'newUser@test.com', displayName: 'newUser'});
                const res = await request.get(`${host}/users/${user._id}`);

                parseBody(res.body).email.should.be.equal(user.email);
                parseBody(res.body).displayName.should.be.equal(user.displayName);

                res.statusCode.should.be.equal(200);
            });
        })
    })
 
});

function parseBody (body) {
    return JSON.parse(body.toString());
}

async function createUsers() {
    await User.remove({});
    await User.create({email: 'user1@test.com', displayName: 'user1'});
    await User.create({email: 'user2@test.com', displayName: 'user2'});
    await User.create({email: 'user3@test.com', displayName: 'user3'});
}