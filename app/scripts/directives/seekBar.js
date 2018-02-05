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
      //Declaring an empty scope property ensures that a new scope will exist
      //solely for the directive (referred to as isolate-scope). An isolate-scope
      //allows us to bind functions from the directive's view to its scope.

         //scope: { },

//We want Angular to treat the on-change attribute (on-change="playerBar.songPlayer.setCurrentTime(value)"
//differently than the value or max attributes. We don't want on-change to act like
// a number, string, or static object.Instead, we want the directive to evaluate the
//on-change expression and execute it.To make sure the directive evaluates the
//attribute, we'll attach it to the directive's scope, rather than the attributes
//object. Scoping the attribute allows us the flexibilityto specify how we want to
// handle the value passed to the on-change attribute

scope: {
         onChange: '&'
     },
//The & in the isolate scope object is a type of directive scope binding.
//The three types of directive scope bindings – @, =, and & – allow us to treat
//the value of the given attribute differently. The & binding type provides a way
//to execute an expression in the context of the parent scope.






         //The link function is automatically generated and scoped to the element
         //defining the directive. Think of it as a function that executes when the
         //directive is instantiated in the view. This is where all logic related to
         //DOM manipulation will go.

         //Directive link functions take the same arguments (with a strict order)
         //during declaration. Altering the order of these arguments will cause errors.
         link: function(scope, element, attributes) {
           //The link method's first argument is its scope object. Attributes and methods
           // on the scope object are accessible within the directive's view.
           //The second argument is the jqLite-wrapped element that the directive matches.
           //The third argument is a hash of attributes with which the directive was
           // declared. If we declare <seek-bar> with no attributes in the HTML, then
           //this hash will be empty.

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


//Update the DOM element with an appropriate value so that it is visible to
//the user.




//scope.value	Holds the value of the seek bar, such as the currently playing
//song time or the current volume. Default value is 0.
          scope.value = 0;
          //scope.max	Holds the maximum value of the song and volume seek bars. Default value is 100.
          scope.max = 100;
          //Have a maximum value.
          var seekBar = $(element);
          // To monitor the value changes of these attributes in a manner specific
          //to this directive, we have to "observe" them. We can notify the directive
          // of all changes to attribute values by using the $observe method on the
          // Angular attributes object:
          attributes.$observe('value', function(newValue) {
     scope.value = newValue;
 });

 attributes.$observe('max', function(newValue) {
     scope.max = newValue;
 });
//This code observes the values of the attributes we declare in the HTML by
//specifying the attribute name in the first argument. When the observed
//attribute is set or changed, we execute a callback (the second argument)
//that sets a new scope value (newValue) for the scope.value and scope.max
//attributes. We use the directive's scope to determine the location of the
//seek bar thumb, and correspondingly, the playback position of the song

          //seekBar's HTML template can access the attributes and methods of the
          //directive's  scope object – in this case: scope.value, scope.max, and
          //scope.fillStyle
  //percentString()	A function that calculates a percent based on the value and
  //maximum value of a seek bar.
          var percentString = function () {
              var value = scope.value;
              var max = scope.max;
              var percent = value / max * 100;
              //Calculate the ratio between the current value and max value and convert it
              // into a percent string.
              return percent + "%";
          };
          //scope.fillStyle()	Returns the width of the seek bar fill element based on
          //the calculated percent
          scope.thumbStyle = function() {
            return {left: percentString()};
          }

          scope.fillStyle = function() {
              return {width: percentString()};
          };
          scope.onClickSeekBar = function(event) {
//scope.onClickSeekBar()	Updates the seek bar value based on the seek bar's
//width and the location of the user's click on the seek bar.
             var percent = calculatePercent(seekBar, event);
 //calculatePercent()	Calculates the horizontal percent along the
//seek bar where the event (passed in from the view as  $event)
//occurred.
//seekBar	Holds the element that matches the directive (<seek-bar>) as a jQuery
// object so we can call jQuery methods on it.
             scope.value = percent * scope.max;
//We update the value of scope.value and yet we don't see that update reflected on
//the attribute in the view.We need to pass the updated value to the onChange
//attribute. To do so, we'll write a function to call in the onClickSeekBar and
//trackThumb methods that will send the updated scope.value to the function
//evaluated by onChange
             notifyOnChange(scope.value);
//We name the function notifyOnChange because its purpose is to notify
 //onChange that scope.value has changed
         };

scope.trackThumb = function() {
  //scope.trackThumb()	Similar to scope.onClickSeekBar, but uses $apply to
  //constantly apply the change in value of  scope.value as the user drags
  //the seek bar thumb.
     $document.bind('mousemove.thumb', function(event) {
         var percent = calculatePercent(seekBar, event);
         scope.$apply(function() {
             scope.value = percent * scope.max;
             notifyOnChange(scope.value);
  //We name the function notifyOnChange because its purpose is to notify
//onChange that scope.value has changed
         });
     });

     $document.bind('mouseup.thumb', function() {
         $document.unbind('mousemove.thumb');
         $document.unbind('mouseup.thumb');
     });
 };

 //We name the function notifyOnChange because its purpose is to notify onChange
 // that scope.value has changed


//In this previous function is when the user drags the seek bar thumb.ng-mousedown
//is setting to trigger the scope.trackThumb function.This method will bind an
//event handler that tracks the mouse movements, and updates the the seek bar value.
//Also we have the method that bind an event handler to mouseup the event so when
//the when the user is relaese the mouse the the seekBar dont respond anymore
// to the mouse moevements.

var notifyOnChange = function(newValue) {
     if (typeof scope.onChange === 'function') {
         scope.onChange({value: newValue});
     }
 };
 //We test to make sure that scope.onChange is a function. If a future developer fails
 // to pass a function to the on-change attribute in the HTML, the next line will not be reached,
 //and no error will be thrown.
//We pass a full function call to the on-change attribute in the HTML –  scope.onChange()
// calls the function in the attribute.
//The function we pass in the HTML has an argument, value, which isn't defined in the
// view (remember that it's not the same as scope.value). Using built-in Angular
//functionality, we specify the value of this argument using hash syntax. Effectively,
// we're telling Angular to insert the local newValue variable as the  value argument
// we pass into the SongPlayer.setCurrentTime() function called in the view.
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
