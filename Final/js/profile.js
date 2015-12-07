//profile
'use strict'		

angular.module('SignUpApp', [])
.controller('MyCtrl', ['$scope', '$http', function($scope, $http) {

	// empty each input by reloading the page
    $scope.resetBtn = function() {
    	location.reload();
    };

	console.log(Date.parse($scope.birthdate));

	// check whether user is below 13 years old
	$scope.checkBirth = function() {
		$scope.birthInfo = {};
		var birthD = Date.parse($scope.birthdate);
		console.log(birthD);
		var newD = new Date();
		console.log(newD);
		if (isNaN(birthD)) {
			$scope.birthInfo.check = true;
			console.log($scope.birthInfo.check);
		} else {
			console.log(Date.parse(newD));
			console.log(Date.parse(newD) - 410290189000);
			// check whether user was born 13 years before the current day
			if (birthD <= Date.parse(newD) - 410290189000) {
				$scope.birthInfo.checkAge = false;
				console.log($scope.birthInfo.checkAge);
			} else {
				$scope.birthInfo.checkAge = true;
				console.log($scope.birthInfo.checkAge);
			}
		}
		console.log($scope.birthInfo);
	};

	$scope.compareTo = function() {
		console.log($scope.password);
		console.log($scope.confirmPassword);
		//check whether the password and confirm password are empty and whether they are the same.
		if ($scope.password != null && $scope.confirmPassword != null && $scope.password === $scope.confirmPassword) {
			return true;
		} else {
			return false;
		}
	};

	// a variable to decide whether the success message is displayed.
	$scope.clicked = false;

	// only show the success message when user submit their form
	$scope.showMessage = function() {
		$scope.resetBtn;
		$scope.clicked = true;
	};

}])