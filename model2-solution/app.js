(function () {
  'use strict';
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var adder = this;
  adder.boughtList = ShoppingListCheckOffService.boughtList();
}

function ToBuyController(ShoppingListCheckOffService){
  var show = this;

  show.toBuyList = ShoppingListCheckOffService.getToBuyList();

  show.buyItem = function(itemindex){
    ShoppingListCheckOffService.buyItem(itemindex);
  };
}


function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItem = [
    { name : "Coffee Mugs" , quantity: "20"},
    { name : "Cookies" , quantity: "10"},
    { name : "Pens" , quantity: "5"},
    { name : "Perfumes" , quantity: "3"},
    { name : "Shoes" , quantity: "2"}
  ];

  var boughtItems = [];

  service.buyItem = function(index){
    var itemBought = toBuyItem[index];
    boughtItems.push(itemBought);
    toBuyItem.splice(index, 1);
  };

  service.getToBuyList = function(){
    return toBuyItem;
  };

  service.boughtList = function (itemindex){
    return boughtItems;
  };

};

})();
