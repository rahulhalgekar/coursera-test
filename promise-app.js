(function () {
  'use strict';
angular.module('serviceApp', [])
.controller('AddController', AddController)
.service('ItemService', ItemService)
.service('WeightLossService',WeightLossService)
.controller('MenuController', MenuController)
.service('MenuService', MenuService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
;

AddController.$inject = ['ItemService'];
ItemService.$inject = ['WeightLossService', '$q'];
WeightLossService.$inject = ['$q', '$timeout'];

function AddController(ItemService) {
  var adder = this;

  adder.itemName = "";
  adder.itemQuantity = "";

  adder.addItem = function(){
    ItemService.addItem(adder.itemName,   adder.itemQuantity)
  };

  adder.items = ItemService.getItems();

  adder.removeItem = function(itemindex){
    ItemService.removeItem(itemindex);
  };

};

function ItemService(WeightLossService, $q){
  var service = this;
  var items = [];
  service.addItem = function(itemName, itemQuantity){
    var namePromise = WeightLossService.checkName(itemName);
    var qPromise = WeightLossService.checkQuantity(itemQuantity);
    $q.all([namePromise, qPromise]).
    then(function(){
      var item = {
        name:itemName,
        quantity: itemQuantity
      }
      items.push(item);
    })
    .catch(function(error){
      console.log(error);
    })

  };

  service.getItems = function(){
    return items;
  };

  service.removeItem = function (itemindex){
    items.splice(itemindex,1);
  };

};

function WeightLossService($q, $timeout){

  var service = this;

  service.checkName = function (itemName){
      var def = $q.defer();
      var result = {
        message : ""
      }

      $timeout( function(){
        if(itemName.toLowerCase().indexOf('cookie') != -1){
          result.message = "No Cookie";
          def.reject(result);
        } else {
          def.resolve(result);
        }

      }, 3000);

      return def.promise;

    };

  service.checkQuantity = function(quantity){
      var def = $q.defer();
      var result = {
        message : ""
      }

      $timeout( function(){
        if(quantity > 4){
          result.message = "Too much";
          def.reject(result);
        } else {
          def.resolve(result);
        }
      }, 1000);

      return def.promise;

    };

}

MenuController.$inject = ['MenuService'];

function MenuController(MenuService){
  var menu = this;
  menu.categories = "";
  menu.items = ""
  var promise = MenuService.getMenucategories();
  promise.then(function(response){
    menu.categories = response.data;
  })
  .catch(function (error) {
    console.log(error);
  });

  menu.getMenuItems =  function (shortName){
    var promiseI =  MenuService.getMenuItems(shortName);
    promiseI.then(function(response){
      menu.items = response.data.menu_items;
      console.log(menu.items);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
MenuService.$inject = ['$http', 'ApiBasePath'];

function MenuService($http, ApiBasePath){
  var service = this;
  service.getMenucategories = function(){
    var response = $http(
      {
        method: 'GET',
        url: (ApiBasePath + "/categories.json")
      }

    );
    return response;
  };

  service.getMenuItems = function(shortName){
    var response = $http({
      method: "GET",
      url : (ApiBasePath + "/menu_items.json"),
      params : {
        category : shortName
      }
    });

    return response;
  };

}

})();
