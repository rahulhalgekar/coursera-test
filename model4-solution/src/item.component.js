(function () {
'use strict';

angular.module('MenuApp')
.component('item', {
  templateUrl: 'templates/item.component.html',
  bindings: {
    items: '<'
  }
});

})();
