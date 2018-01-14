//we need providers which are services to configure behaviors
//of different modules,$stateProvider congigure state behavior,
//locationProvider how the application handle URLs on the browser


// By setting the html5Mode method's enabled property
//to true, the hashbang URLs are disabled; that is,
//users will see clean URLs without the hashbang.
//Setting the  requireBase property to false is
//unrelated to the hashbang issue, but is one way to
// avoid a common $location error
(function() {
     function config($stateProvider, $locationProvider) {
       $locationProvider
          .html5Mode({
            enabled: true,
            requireBase: false
          });
          //stateName is a string that identify a state and stateConfig
          //is an object that defines specifics properties of the states
          //Bloc jams creating a a state named landing and add an
          //accompanying URL and template to the stateConfig object.
          $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'

           })
//Because $stateProvider.state() returns $stateProvider,
// we are able to call  state() again without having to
// reference the $stateProvider variable.
// With no arguments passed to the state() call, this
// would look like  $stateProvider.state().state().
// This is called method chaining. It's common to chain
// state() calls instead of calling them individually
// on $stateProvider. Add another state, named album:
         .state('collection', {
             url: '/collection',
             templateUrl: '/templates/collection.html'

          })

         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'

         });


     }

angular
     .module('blocJams', ['ui.router'])
     .config(config);
//this angular.module will act as a root for different parts of the application
//blocjams is the name of the module and the empty array injects dependency
//into an application, the second argument is the array where is the external modules where
//blocjams depends, known as DEPENDENCY INJECTION.When we add an external module's scripts
//source, we inject the module into the application, by ADDING it in to the ARRAY.
})();
//provider is accesible through the application INJECTED
//as a BLOCK config to pass into the (config) function.
// .config(config);
