(function () {
  'use strict';
angular.module('MenuApp')
.controller('ItemController', ItemController)
.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
;

ItemController.$inject = ['MenuDataService', '$stateParams'];

function ItemController(MenuDataService, $stateParams){
  var list = this;
  list.menuItems = [];
  list.$onInit = function(){
    console.log("Init called");
    var shortName = $stateParams.shortname;
    console.log("Short name passed - [" + shortName +"]");
    var promse = MenuDataService.getItemsForCategory(shortName);
    promse.then(function(response){
      console.log(response.data);
      list.menuItems = response.data.menu_items;
    })
    .catch(function(error){
      console.log(error);
    });

  };
};

})();
