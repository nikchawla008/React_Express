let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

// To call using Http Protocol
chai.use(chaiHttp);

//Assertion Style = should
chai.should();

describe('ALL APIs Test', () => {

    /**
     * Test showPosts API
     */

    describe('showPost API test', function () {
        it('It should get all the posts', (done) => {
            chai.request(server)
                .get('/api/showPosts')
                .end((error, response) => {
                    // Assertions go here
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.length.should.be.eq(100); for fetch posts length should be 100
                    done();

                })
        })

    });


    /**
        * Test the getPosts API
        * Give index that exists to get 200 response and an index that does not exist will give 404 error
     */

    describe('getPost By ID test', ()=>{
        it('Test for passing in ID that actually exists in the database', (done) => {
            chai.request(server)
                .get('/api/getPost/2')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                    done();

                });
        });


        it('Test for passing in ID that does not exits in the database', (done) => {
            chai.request(server)
                .get('/api/getPost/1000')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(0);
                    done();

                });
        });


    });



    /**
        * Test delPost API for id that exists and id that does not exist
     */

   describe('Testing deletePost API for IDs that exist and do not exist', () => {

        it('Tests for id that does exist in the database', (done)=>{
            let id = 8;
            chai.request(server)
                .delete('/api/deletePost/' + id)
                .send()
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('affectedRows').greaterThan(0);
                    done();
                })

        })


       it('Tests for id that does not exist in the database', (done)=>{
            let id = 1000;
            chai.request(server)
                .delete('/api/deletePost/' + id)
                .send()
                .end((error, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('affectedRows').eq(0);
                    done();
                })

        })


    });



    /**
        * Test addPost API when input is correct => (title:string, body:string, userId:integer)
        * and when incorrect will give 400 bad request
     */

    describe('Testing the addPost API for correct and incorrect inputs', ()=>{
        it('Testing for correct input', (done)=>{
            let testObject = {
                title: 'This is the title',
                body: 'This is the body',
                userId: '2'
            };
            chai.request(server)
                .post('/api/addPost')
                .send(testObject)
                .end((error, response)=>{
                    response.should.have.status(201);
                    response.body.should.have.property('title').eq('This is the title');
                    response.body.should.have.property('body').eq('This is the body');
                    response.body.should.have.property('userId').eq('2');
                    done();
                });
            });

            it('Testing for incorrect input i.e. userId is a string', (done)=>{
            let testObject = {
                title: 'This is the title',
                body: 'This is the body',
                userId: 'This is now a string'
            };
            chai.request(server)
                .post('/api/addPost')
                .send(testObject)
                .end((error, response)=>{
                    response.should.have.status(400);
                    done();
                })

        });
    });


        /**
     * Test editPost API
     */
    describe('Testing EditPost API', ()=>{

        it('Testing for id that exists', (done)=>{
            let testObject = {
                title: 'This is the title',
                body: 'This is the body',
                id:'4'
            };

            chai.request(server)
                .put('/api/editPost')
                .send(testObject)
                .end((error, response)=>{
                    response.should.have.status(201);
                    response.body.should.have.property('title').eq('This is the title');
                    response.body.should.have.property('body').eq('This is the body');
                    done();
                })

        });


        it('Testing for id that does not exist', (done)=>{
            let testObject = {
                id:'1000',
                title: 'This is the title',
                body: 'This is the body',
                userId:1
            };

            chai.request(server)
                .put('/api/editPost')
                .send(testObject)
                .end((error, response)=>{
                    response.should.have.status(400);
                    response.body.should.have.property('affectedRows').eq(0);
                    done();
                })

        });



    });


    /**
     * Test searchPost API
     */

    describe('Testing search post API', () => {

        it('Searches for title that actually exists', (done)=>{
            let title = 'sunt';
            chai.request(server)
                .get('/api/searchPost/' + title)
                .end((error, response) => {
                    response.body.should.be.a('array');
                    response.body.should.have.length.greaterThan(0);
                    response.should.have.status(200);
                    done();
                })
        })



        it('Searches for title that does not exist', (done)=>{
            let title = 'broooo';
            chai.request(server)
                .get('/api/searchPost/' + title)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.should.have.lengthOf(0);
                    done();
                })
        })


    })



});

