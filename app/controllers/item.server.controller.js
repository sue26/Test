/**
 * Created by SueBae on 2016-05-19.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Item = mongoose.model('Item'),
    _ = require('lodash');


exports.addItem = function(req, res) {
    var name = req.body.itemName;
    var user = req.user;

    var item = new Item();
    item.itemName = name;
    item.user = user;

    item.save(function(err, result){
        res.jsonp({message: 'Item successfully created', item: item});
    });
};


exports.listItem = function(req, res) {
   // Item.find().sort('-created').exec(function(err, items) {
    Item.find().exec(function(err, items) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(items);
        }
    });
};

exports.deleteItem = function(req, res) {
    var itemName = req.body.itemName;
    var user = req.user;
    console.log(req);
    var item = new Item();
    item.itemName = itemName;
    item.user = user;

    Item.remove({_id: req.body._id}, function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(item);
        }
    });
};

