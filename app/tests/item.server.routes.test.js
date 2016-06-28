/**
 * Created by SueBae on 2016-05-19.
 */
'use strict';
var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Item = mongoose.model('Item'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, item;

/**
 * Item routes tests
 */
describe('Item Routing Test', function() {
   beforeEach(function(done) {
       credentials = {
           username: 'username',
           password: 'password'
       };

       // Create a new user
       user = new User({
           firstName: 'Full',
           lastName: 'Name',
           displayName: 'Full Name',
           email: 'test@test.com',
           username: credentials.username,
           password: credentials.password,
           provider: 'local'
       });

       user.save(function() {
           item = new Item({
               itemName: 'Item Number 1',
               user: user._id
           });

           done();
       });
   });
    
    it('should be able to add an item if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                if (signinErr) done(signinErr);

                var userId = user.id;

                agent.post('/addItem')
                    .send(item)
                    .expect(200)
                    .end(function (itemSaveErr, itemSaveRes) {
                        // Handle article save error
                        if (itemSaveErr) done(itemSaveErr);

                        itemSaveRes.body.message.should.match('Item successfully created');

                        // Get a list of articles
                        agent.get('/listItem')
                            .expect(200)
                            .end(function (itemGetErr, itemGetRes) {
                                // Handle article save error
                                if (itemGetErr) done(itemGetErr);

                                // Get articles list
                                var items = itemGetRes.body;

                                // Set assertions
                                (items[0].user).should.equal(userId);
                                (items[0].itemName).should.match('Item Number 1');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should contain no items initially', function(done) {
        agent.get('/listItem')
            .end(function (itemGetErr, itemGetRes) {
                if (itemGetErr) done(itemGetErr);

                //No Item has been added
                var items = itemGetRes.body;

                //Set assertions
                items.should.be.empty;
                done();
            });
    });

    it('should remove the item if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                if(signinErr) done(signinErr);
                
                var userId = user.id;
                
                //Add item
                agent.post('/addItem')
                    .send(item)
                    .expect(200)
                    .end(function(itemSaveErr, itemSaveRes) {
                        if (itemSaveErr) done(itemSaveErr);

                        itemSaveRes.body.message.should.match('Item successfully created');
                        var item = itemSaveRes.body.item;
//Since whatever I created before all part only has what is defined there
//For example, _id is not automatically created
//The client side creates them automatically
//So I should use the item created via client side
                        agent.get('/addItem')
                            .expect(200)
                            .end(function(itemGetErr, itemGetRes) {
                                if (itemGetErr) done(itemGetErr);
                                
                                var items = itemGetRes.body;
                                
                                (items[0].user).should.equal(userId);
                                (items[0].itemName).should.match('Item Number 1');
                                
                                agent.post('/deleteItem')
                                    .send(item)
                                    .expect(200)
                                    .end(function(itemDeleteErr, itemDeleteRes) {
                                        if(itemDeleteErr) done(itemDeleteErr);
                                        
                                        agent.get('/addItem')
                                            .expect(200)
                                            .end(function (itemGetErr, itemGetRes) {
                                                if(itemGetErr) done(itemGetErr);
                                                
                                                var items = itemGetRes.body;
                                                
                                                items.should.be.empty;
                                                done();
                                            });
                                    });
                            });
                    });
            });
    });
    
    afterEach(function(done) {
        User.remove().exec();
        Item.remove().exec();
        done();
    });
});
