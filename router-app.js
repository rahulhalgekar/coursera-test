(function () {
  'use strict';
angular.module('RoutingApp', ['ui.router']);

angular.module('RoutingApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function RoutesConfig($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/tab1');
  $stateProvider
    .state('tab1', {
      url: '/tab1',
      template : '<div> Test1 </div>'
      }
    )

    .state('tab2', {
       url: '/tab2',
       template : '<div> Test2 </div>'
       }
     );

};


})();
