//defining a controller for the landing view
(function(){
  function LandingCtrl(){
    // to initialize a $scope object, a controller attach properties to it
    //we add heroTitle property to LandingCtrl using this. where $scope contain
    //the model or data that the view will present, available on the template at
    // the point on the DOM where the the controller is registered. The LandingCtrl
    // is registered for the landing.html template

    this.heroTitle = "Turn the music Up!";
//heroTitle property to LandingCtrl using this. where $scope contain
//the model or data
  }

  angular
    .module('blocJams')
    .controller('LandingCtrl', LandingCtrl);
})();
// the .controller has 2 parameters, the name of the controller and a callback
//function or an array that injects dependencies, the last item on the array
//is the callback function
//first argument LandingCtrl which is the controller, the second argument
//is the callback function that execute when the controller initialize
//. module() does not have the second argument Because we have already set
// the dependencies on the App.js " .module('blocJams', ['ui.router'])"
//we can add more dependencies to LandingCtrl but we dont need them
// (function() {
//    function MyCtrl($scope, dep1, dep2) {
        // controller logic
//    }

//    angular
//        .module('myApp')
//        .controller('MyCtrl', [$scope, dep1, dep2, MyCtrl]);
//})();
//Instantiate a Controller
//we can add a new controller through <body ng-Controller="MyCtrl">
//where the ng-Controller tell angularto Instantiate the controller to MyCtrl
//for the body. this directive create a new scope tied to the $scope object
//Whe the application start it loads the angular reads the <body ng-Controller="MyCtrl"> attribute
//on the html and execute the callback to initialize the controller
