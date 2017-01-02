(function () {
  'use strict';
angular.module('NarrowItDownApp', [])
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.controller('NarrowItDownController', NarrowItDownController)
.controller('FoundItemCntrl', FoundItemCntrl)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItem)
;

function FoundItem() {
  var ddo = {
    restrict :"AE",
    templateUrl : 'found-item-directive-templ.html',
    scope : {
      items:"<",
      onRemove:"&"
    },
    controller: 'FoundItemCntrl as list',
    bindToController:true
  };
  return ddo;
};

function FoundItemCntrl(){

};

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.matchedItems = "";
  this.getMatchedMenuItems = function(searchTerm){
    ctrl.matchedItems = "";
    if(searchTerm){
      var matchedPromise = MenuSearchService.getMatchedMenuItems(searchTerm);

      matchedPromise.then( function (data){
        ctrl.matchedItems = data;
        if(data.length > 0 ){
          ctrl.noThingFound = false;
        } else {
          ctrl.noThingFound = true;
        }
      })
      .catch(function(error){
        console.log("error " + error);
      });
    } else {
      ctrl.noThingFound = true;
    }

  };

  ctrl.onRemove = function(index){
    ctrl.matchedItems.splice(index, 1);
  }

};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function (searchTerm){
    var getMatchPromise = $http(
      {
        method: 'GET',
        url: (ApiBasePath + "/menu_items.json")
      }

    );
    var promiseToReturn = getMatchPromise.then(function(response){
        var data = [];
        for(var i = 0; i < response.data.menu_items.length; i++ ){
          var mItem = response.data.menu_items[i];
          if(mItem.description.toLowerCase().indexOf(searchTerm) !== -1){
            data.push(mItem);
          }
        }
        return data;
    });

    return promiseToReturn;

  };

};

})();
