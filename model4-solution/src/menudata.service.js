(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
;

MenuDataService.$inject = ['$http', 'ApiBasePath'];

function MenuDataService($http, ApiBasePath) {
  var service = this;

  // List of shopping items
  service.getAllCategories = function(){
    var getMatchPromise = $http(
      {
        method: 'GET',
        url: (ApiBasePath + "/categories.json")
      }
    );

    return getMatchPromise;

  };

  service.getItemsForCategory = function(categoryShortName){
    var getMatchPromise = $http(
      {
        method: 'GET',
        url: (ApiBasePath + "/menu_items.json?category="),
        params: {'category' : categoryShortName}
      }
    );

    return getMatchPromise;
  };
}

})();
