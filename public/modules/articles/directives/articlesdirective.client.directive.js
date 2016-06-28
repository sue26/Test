'use strict';

angular.module('articles')
	.directive('articlesdirective', [
		function() {
			return {
				restrict: 'E',
				templateUrl: 'modules/canvas/views/modals/frequency/frequency.client.view.html',
				scope: {
					data: '=', //save as object
					key: '@',  //save asvalue
					validate: '&'  // function
				}
			};
		}
]);
