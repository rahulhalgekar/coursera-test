(function () {
  'use strict';
angular.module('myFirstApp', [])

.controller('CulatorController', CalculatorFn);

CalculatorFn.$inject=['$scope','$filter'];

function CalculatorFn($scope, $filter) {
  $scope.name="";
  $scope.tvalue=0;
  $scope.upperName="";

  $scope.imgValue=0;
  $scope.changeImage = function(){
    $scope.imgValue=1;
  };

  $scope.displayNumeric= function(){
    $scope.tvalue=calculateNumeric($scope.name);
  };

  function upper(){
    var upperCase  = $filter('uppercase');
    $scope.upperName = upperCase($scope.name);
  }
  $scope.upperFun = upper;

  function calculateNumeric(string){

    var totalValue = 0;
    for(var i=0; i<string.length;i++){
      totalValue += string.charCodeAt(i);
    }
    return totalValue;
  };

}


})();
