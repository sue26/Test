/**
 * Created by SueBae on 2016-05-19.
 */
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Items', ['$resource',
    function($resource) {
         return {
            addItem: function() {
                return $resource('addItem', {
                    itemId: '@_id'
                }, {
                    addItem: {
                        method: 'POST'
                    },
                    getItem: {
                        method: 'GET',
                        isArray: true
                    }
                });
            },
             deleteItem: function() {
                 return $resource('deleteItem', {
                     itemId: '@_id'
                 }, {
                     deleteItem: {
                         method: 'POST'
                     }
                 });
             }
        };
    }
]);
