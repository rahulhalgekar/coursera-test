(function () {
  'use strict';
angular.module('MenuApp')
.controller('MenuAppController', MenuAppController)
.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
;

MenuAppController.$inject = ['MenuDataService'];

function MenuAppController(MenuDataService){
  var list = this;
  list.items = [];

  list.$onInit = function(){
    console.log("Init called");
    var promse = MenuDataService.getAllCategories();
    promse.then(function(response){
      console.log(response.data);
      list.items = response.data;
    })
    .catch(function(error){
      console.log(error);
    });

  };
};

})();
