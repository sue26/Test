/**
 * Created by SueBae on 2016-05-19.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ItemSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    itemName: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Item', ItemSchema);
