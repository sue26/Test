/**
 * Created by SueBae on 2016-05-24.
 */
'use strict';

angular.module('articles').controller('ItemsController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Articles',
    'Items',
    function($scope, $state, $stateParams, $location, Authentication, Articles, Items) {
        $scope.itemNameFind = '';
        var itemsCopy = [];

        $scope.addItem = function() {
            $scope.itemName = this.itemName;
            Items.addItem().addItem({
                itemName: $scope.itemName
            }, function(response) {
                $scope.items.push(response.item);
                console.log(response);
            });
    };

        $scope.findItemList = function() {
            Items.addItem().getItem(function(response){
                $scope.items = response;
                itemsCopy = $scope.items;
            });
//Instead of having the result = ......
//make sure I get the response correctly
        };

        $scope.deleteItem = function(item) {
            if (item) {
                Items.deleteItem().deleteItem({
                    item: item,
                    itemName: item.itemName,
                    _id: item._id
                }, function (response) {
                    for (var i in $scope.items) {
                        if ($scope.items[i] === item) {
                            $scope.items.splice(i, 1);
                        }
                    }
                    console.log(response);
                });
            }

        };

        $scope.findItemName = function() {
            var result = _.filter(itemsCopy, function(item) {
                // First Approach
                var contains = new RegExp("^" + $scope.itemNameFind);
                return contains.test(item.itemName);

                // Second Approach
/*
                var startsWith = true;
                for (var i = 0; i < $scope.itemNameFind.length; i++) {
                    if (item.itemName.charAt(i) !== $scope.itemNameFind.charAt(i)) {
                        startsWith = false;
                        break;
                    }
                }
                return startsWith;*/
            });
            $scope.items = result;
        };
    }
]);
