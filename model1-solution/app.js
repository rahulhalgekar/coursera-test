(function () {

'use strict';
angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckControllerFn);

LunchCheckControllerFn.$inject = ['$scope'];

function LunchCheckControllerFn($scope) {
  $scope.lunchMenu = "";
  $scope.message = "";

  $scope.checkLunch = function() {

    if($scope.lunchMenu.length > 0){
      var menuSplit = $scope.lunchMenu.split(',',4);
      if(menuSplit.length > 3){
          $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    } else {
      $scope.message = "Please enter data first";
    }
  };
}


})();
