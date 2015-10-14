Products = new Meteor.Collection("products");

if (Meteor.isClient) {
  Template.you.helpers({
    items : function(){
      return [
        { name : 'chris' }
      ];
    }
  });

  Meteor.subscribe('allYourVegetables', function(){
    Products.find().observe({
      added:function(res) {
        console.log(res);
      },
      updated : function(item){
        console.log("something was updated");
        console.log(item);
      }  
    });
    
  });
  //Meteor.subscribe('allVegetables');

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    vegetable : function(){
      return Products.findOne();
    },
    usr : function(){
      var id = Meteor.userId();
      return id;
    }
  });

  Template.hello.events({
    'click button': function () {
    
      //Meteor.call('add',1,2);
      Meteor.call('addProduct', Meteor.userId(), 'cucumber');
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'addProduct' : function(user, product){
        Products.insert({ user : user, name: product });
    }
  });

  Meteor.methods({
    'add' : function(lhs, rhs){
      console.log("should add two variables " + (lhs + rhs));
    }
  });

  Meteor.startup(function () {
    Meteor.publish('allYourVegetables', function(){
      return Products.find({ user : this.userId });
    });

    Meteor.publish('allVegetables', function(){
      return Products.find();
    });

    if(Products.find().count() === 0){
      Products.insert({ name : 'tomato' });  
    }
    
    // code to run on server at startup
  });
}
