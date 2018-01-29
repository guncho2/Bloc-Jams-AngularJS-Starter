(function(){
  //function seekBar() {
//With Angular, $document must be injected as a dependency if we want to access
// the  window.document object. Add it as a dependency to the seekBar directive
function seekBar($document) {

//first function will be called when a user clicks on the seek bar
  var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
  };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
         scope: { },
         link: function(scope, element, attributes) {

           //callback function (in this case, seekBar) is a factory function.
           //It returns an object that describes the directive's behavior to
           // Angular's HTML compiler. This object communicates the behavior
           // through options

           //templateUrl	Specifies a URL from which the directive will load a
           // template.
           //replace	Specifies what the template should replace. If true, the
           //template replaces the directive's element. If false, the template
           //replaces the contents of the directive's element.
           //restrict	Restricts the directive to a specific declaration
           //style: element  E, attribute A, class C, and comment M. If omitted,
           //the defaults (E and A) are used. Multiple restrictions are stringed
           //together, for example AE or AEC.
           // We've named the directive seekBar, which means Angular will look for seek-bar
           //in the HTML and call this directive when it finds that markup.

           //restrict: 'E' instructs Angular to treat this directive as an element.
           //For example, Angular will run the code if it finds <seek-bar> in
           //the HTML, but not if it finds  <div seek-bar>.

           //replace: true instructs Angular to completely replace the <seek-bar>
           // element with the directive's HTML template rather than insert the
           // HTML between the  <seek-bar></seek-bar> tags.

           //The templateUrl option specifies the path to the HTML template that
           //the directive will use. We've added a template URL, but we haven't yet
           // made the template. Let's do that now.
             // directive logic to return
//Keep track of its current value.
//Have a maximum value.
//Calculate the ratio between the current value and max value and convert it
// into a percent string.
//Update the DOM element with an appropriate value so that it is visible to
//the user.
//Declaring an empty scope property ensures that a new scope will exist
//solely for the directive (referred to as isolate-scope). An isolate-scope
//allows us to bind functions from the directive's view to its scope.

//The link function is automatically generated and scoped to the element
//defining the directive. Think of it as a function that executes when the
//directive is instantiated in the view. This is where all logic related to
//DOM manipulation will go.

//Directive link functions take the same arguments (with a strict order)
//during declaration. Altering the order of these arguments will cause errors.

//The link method's first argument is its scope object. Attributes and methods
// on the scope object are accessible within the directive's view.
//The second argument is the jqLite-wrapped element that the directive matches.
//The third argument is a hash of attributes with which the directive was
// declared. If we declare <seek-bar> with no attributes in the HTML, then
//this hash will be empty.
          scope.value = 0;
          scope.max = 100;
          var seekBar = $(element);

          //seekBar's HTML template can access the attributes and methods of the
          //directive's  scope object – in this case: scope.value, scope.max, and
          //scope.fillStyle
          //scope.value	Holds the value of the seek bar, such as the currently playing
          //song time or the current volume. Default value is 0.
          //scope.max	Holds the maximum value of the song and volume seek bars. Default value is 100.
          //percentString()	A function that calculates a percent based on the value and
           //maximum value of a seek bar.
          //scope.fillStyle()	Returns the width of the seek bar fill element based on
          //the calculated percent
          var percentString = function () {
              var value = scope.value;
              var max = scope.max;
              var percent = value / max * 100;
              return percent + "%";
          };

          scope.fillStyle = function() {
              return {width: percentString()};
          };
          scope.onClickSeekBar = function(event) {
             var percent = calculatePercent(seekBar, event);
             scope.value = percent * scope.max;
         };

         //calculatePercent()	Calculates the horizontal percent along the
  //seek bar where the event (passed in from the view as  $event)
  //occurred.
//seekBar	Holds the element that matches the directive (<seek-bar>) as a jQuery
// object so we can call jQuery methods on it.
//scope.onClickSeekBar()	Updates the seek bar value based on the seek bar's
//width and the location of the user's click on the seek bar.

scope.trackThumb = function() {
  //scope.trackThumb()	Similar to scope.onClickSeekBar, but uses $apply to
  //constantly apply the change in value of  scope.value as the user drags
  //the seek bar thumb.
     $document.bind('mousemove.thumb', function(event) {
         var percent = calculatePercent(seekBar, event);
         scope.$apply(function() {
             scope.value = percent * scope.max;
         });
     });

     $document.bind('mouseup.thumb', function() {
         $document.unbind('mousemove.thumb');
         $document.unbind('mouseup.thumb');
     });
 };

//In this previous function is when the user drags the seek bar thumb.ng-mousedown
//is setting to trigger the scope.trackThumb function.This method will bind an
//event handler that tracks the mouse movements, and updates the the seek bar value.
//Also we have the method that bind an event handler to mouseup the event so when
//the when the user is relaese the mouse the the seekBar dont respond anymore
// to the mouse moevements.

         }

    };

  }

  angular
    .module('blocJams')
    //.directive('seekBar', seekBar);
    //With Angular, $document must be injected as a dependency if we want to
    // access the  window.document object. Add it as a dependency to the
    //seekBar directive
    .directive('seekBar', ['$document', seekBar]);



})();
