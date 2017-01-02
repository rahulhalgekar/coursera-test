(function () {
  'use strict';
angular.module('serviceApp', [])
.controller('AddShowFactoryController', AddShowFactoryController)
.controller('AddShowFactoryProvider', AddShowFactoryProvider)
.provider('ItemServiceProv', ItemServiceProv)
.provider('ItemServiceProv2', ItemServiceProv)
.directive('listDisplay', ListDisplay)
.controller('ListDisplayCntrl', ListDisplayCntrl)
.config(Config);

function ListDisplay() {
  var ddo = {
    restrict :"AE",
    templateUrl : 'list-directive-templ.html',
    scope : {
      items:"<",
      onRemove : "&"
    },
    controller: 'ListDisplayCntrl as list',
    bindToController:true,
    link: LinkContFun,
    transclude:true
  };
  return ddo;
};

function LinkContFun(scope, element, attr, controller){

  scope.$watch("list.checkChips()", function (newValue, oldvalue) {
    console.log("newValue" + newValue);
    if(newValue === true){
      displayWarning();
    } else {
      hideWarning();
    }

  });

  function displayWarning(){
    var warning = element.find("div");
    warning.css('display', 'block');
  };

  function hideWarning(){
    var warning = element.find("div");
    warning.css('display', 'none');
  };


};

function ListDisplayCntrl(){
  var list = this;

  this.checkChips = function(){
    for(var i =0 ; i < list.items.length ; i++) {
      var itemName = list.items[i].name;
      if(itemName.toLowerCase().indexOf('chip') !== -1) {
        return true;
      }

    }
      return false;
  }
};


Config.$inject = ['ItemServiceProvProvider', 'ItemServiceProv2Provider'];
function Config(ItemServiceProvProvider, ItemServiceProv2Provider){
  ItemServiceProvProvider.defaults.maxItem = 2;
  ItemServiceProv2Provider.defaults.maxItem = 6;
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
AddShowFactoryProvider.$inject = ['ItemServiceProv'];
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
    console.log("this is " + this);
    ItemServiceProv.removeItem(itemindex);
  };

  adder.checkChips = function(){
    for(var i =0 ; i < adder.items.length ; i++) {
      var itemName = adder.items[i].name;
      if(itemName.toLowerCase().indexOf('chip') !== -1) {
        return true;
      }

    }
      return false;
  }
};

AddShowFactoryController.$inject = ['ItemServiceProv2'];

function AddShowFactoryController(ItemServiceProv){

  var adder = this;

  adder.itemName = "";
  adder.itemQuantity = "";
  adder.addItem = function(){
    try{
      ItemServiceProv.addItem(this.itemName,   this.itemQuantity)

    } catch( error) {
          //Do nothing
    }

  };

  adder.items = ItemServiceProv.getItems();

  adder.removeItem = function(itemindex){
    console.log("this is " + this);
    ItemServiceProv.removeItem(itemindex);
  };

  adder.checkChips = function(){
    for(var i =0 ; i < adder.items.length ; i++) {
      var itemName = adder.items[i].name;
      if(itemName.toLowerCase().indexOf('chip') !== -1) {
        return true;
      }

    }
      return false;
  }
};

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

})();
