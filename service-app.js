(function () {
  'use strict';
angular.module('serviceApp', [])
.controller('AddController', AddController)
.controller('ShowController', ShowController)
.service('ItemService', ItemService)
.controller('AddShowFactoryController', AddShowFactoryController)
.controller('AddShowFactoryProvider', AddShowFactoryProvider)
.provider('ItemServiceProv', ItemServiceProv)
.factory('ItemServiceF', ItemServiceF)
.config(Config);


Config.$inject = ['ItemServiceProvProvider'];
function Config(ItemServiceProvProvider){
  ItemServiceProvProvider.defaults.maxItem = 2;
};

function ItemServiceProv() {

  var provider = this;
  provider.defaults = {
    maxItem:3
  };

  provider.$get=function(){
    return new ItemServiceSize(provider.defaults.maxItem);
  };
};

function AddShowFactoryProvider(ItemServiceProv){
  var adder = this;

  adder.itemName = "";
  adder.itemQuantity = "";
  adder.errorMessage = ""

  adder.addItem = function(){
    try{
      ItemServiceProv.addItem(this.itemName,   this.itemQuantity);

    } catch( error) {
          adder.errorMessage = error;
    }

  };

  adder.items = ItemServiceProv.getItems();

  adder.removeItem = function(itemindex){
    ItemServiceProv.removeItem(itemindex);
  };
};

AddShowFactoryController.$inject = ['ItemServiceF'];

function AddShowFactoryController(ItemServiceF){

  var adder = this;

  adder.itemName = "";
  adder.itemQuantity = "";

  var itemServiceImpl = ItemServiceF(3);

  adder.addItem = function(){
    try{
      itemServiceImpl.addItem(this.itemName,   this.itemQuantity)

    } catch( error) {
          //Do nothing
    }

  };

  adder.items = itemServiceImpl.getItems();

  adder.removeItem = function(itemindex){
    itemServiceImpl.removeItem(itemindex);
  };
};

function ItemServiceF(){
  var factory = function(size){
    return new ItemServiceSize(size);
  };
  return factory;
};

AddController.$inject = ['ItemService'];

function AddController(ItemService) {
  var adder = this;

  this.itemName = "";
  this.itemQuantity = "";

  this.addItem = function(){
    ItemService.addItem(this.itemName,   this.itemQuantity)
  };

}

ShowController.$inject = ['ItemService'];
function ShowController(ItemService){
  var show = this;

  show.items = ItemService.getItems();

  show.removeItem = function(itemindex){
    ItemService.removeItem(itemindex);
  };
}


function ItemServiceSize(size){
  var service = this;

  var items = [];
  service.addItem = function(itemName, itemQuantity){
    if(size != undefined && items.length >= size)
    {
      throw new Error("Max Nunber reached " + size);
    }
    var item = {
      name:itemName,
      quantity: itemQuantity
    }
    items.push(item);

  };

  service.getItems = function(){
    return items;
  };

  service.removeItem = function (itemindex){
    items.splice(itemindex,1);
  };

};

function ItemService(){
  var service = this;

  var items = [];



  service.addItem = function(itemName, itemQuantity){

    var item = {
      name:itemName,
      quantity: itemQuantity
    }
    items.push(item);

  };

  service.getItems = function(){
    return items;
  };

  service.removeItem = function (itemindex){
    items.splice(itemindex,1);
  };

};

})();
