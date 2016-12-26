(function () {
  'use strict';
angular.module('myFirstApp', [])

.controller('CulatorController', CalculatorFn)
.filter('custom', customFilterTest)
.filter('customArg', customArg);

CalculatorFn.$inject=['$scope','$filter', 'customFilter'];

function CalculatorFn($scope, $filter, customFilter) {
  $scope.name="";
  $scope.tvalue=0;
  $scope.upperName="";
  $scope.shoppingList=[
    {"name": "chocos", "quantity": "20"},
    {"name": "IceCreams", "quantity": "3"},
    {"name": "Chips", "quantity":"12"}
  ];

  $scope.itemList=[
    "rahul halgekar", "shaurya halgekar", "Saroj halgekar", "neha hasabe", "Cherry"
  ];


  $scope.imgValue=0;

  $scope.addItemToList = function(){
    var item = { "name" : $scope.newItemName,
                "quantity" : $scope.newItemQuantity};
      $scope.shoppingList.push(item);


  }
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

  $scope.useCustomFilter = useCustomFilter;
  function useCustomFilter(){
    return customFilter($scope.name);
  }

}

function customFilterTest(){

    return function testFn(name){
      var msg = name + " changed Message By filter";
      return msg;
    };
}

function customArg(){
  return function testFn2(name, lastName){
    return " FirstName ["+name + "] Last Name [" + lastName +"]";
  };
}

})();
