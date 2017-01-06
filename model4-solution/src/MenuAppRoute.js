(function () {
  'use strict';
angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function RoutesConfig($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl : 'templates/home.html'
      }
    )
    .state('categories', {
      url: '/categories',
      templateUrl : 'templates/categories.html',
      controller : 'MenuAppController as list'
      }
    )
    .state('items',{
      url:'/items/{shortname}',
      templateUrl : 'templates/items.html',
      controller : 'ItemController as list'
    })

    ;


};


})();
