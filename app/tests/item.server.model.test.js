/**
 * Created by SueBae on 2016-05-19.
 */
'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Item = mongoose.model('Item');

/**
 * Globals
 */
var user, item;

/**
 * Unit tests
 */
describe('Item Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password'
        });
        user.save(function() {
            item = new Item({
                itemName: 'hello',
                user: user._id
            });
            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            item.save(function(err, itemSaved) {
                should.not.exist(err);
                done();
            });
        });

        it('should be able to save item name exactly as written', function(done) {
            var newItem = new Item({
                itemName: 'Item    .   {% $  @   One',
                user: user
            });
            newItem.save(function(err, itemSaved){
                should.not.exist(err);
                itemSaved.itemName.should.equal('Item    .   {% $  @   One');
                newItem.remove(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        Item.remove().exec();
        User.remove().exec();
        done();
    });
});
