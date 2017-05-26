angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$cordovaCamera,$ionicPopup) {
  $scope.title = "Welcome to Ionic";

   var options = {};


  $scope.getImage = function (x,y,w) {
    console.log('clicked');
    console.log('start');
    $cordovaCamera.getPicture(options).then(function(imageURI) {
      console.log('then',imageURI);
      $scope.imageURI = imageURI ;
      $scope.drawImage(imageURI,x,y,w); 
    }, function(err) {
      // error
      console.log('error',err);
    });
    console.log('done');
  }
  

    // canvas start here
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    // setup
    canvas.width = 600;
    canvas.height = 400;
    context.globalAlpha = 1.0;
    context.beginPath();

    $scope.drawImage = function (image_url,x,y,w) {
      
      var img = new Image();
      img.onload = function() {
          console.log('draw image');
          context.drawImage(img, x, y,w, w * img.height / img.width);
      };
      img.src = image_url;

    }


    $scope.save = function () {
      window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            console.log(msg);
             var alertPopup = $ionicPopup.alert({
            title: 'Saved!',
            template: 'check gallary'
            });
            alertPopup.then(function(res) {
                console.log('done');
            });
        },
        function(err){
            console.log(err);
             var alertPopup = $ionicPopup.alert({
            title: 'Not Saved!',
            template: 'check console'
            });
            alertPopup.then(function(res) {
                console.log('done');
            });
        },
          canvas
      );
    }

    $scope.get1stImage = function () {
      $scope.getImage( 0, 0,200);
    }


    $scope.get2ndtImage = function () {
      $scope.getImage( 0, 205,200);
    }

    $scope.get4thtImage = function () {
      $scope.getImage( 205, 205,200);
    }

    $scope.get3rdtImage = function () {
      $scope.getImage(205, 0,200);
    }

    
    

  // canvas end here

  

  document.addEventListener("deviceready", function () {
      console.log('device ready'); 
  })
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
