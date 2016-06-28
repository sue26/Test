/**
 * Created by SueBae on 2016-05-19.
 */
'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
    items = require('../../app/controllers/item.server.controller');

module.exports = function(app) {
    // Article Routes
   
    app.route('/addItem')
        .get(items.listItem)
        .post(users.requiresLogin, items.addItem);

    app.route('/listItem')
        .get(items.listItem)
        .post(users.requiresLogin, items.addItem);

    app.route('/deleteItem')
        .post(users.requiresLogin, items.deleteItem);


};
