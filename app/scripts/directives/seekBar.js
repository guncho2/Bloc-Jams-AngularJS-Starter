(function(){
  function seekBar() {
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E'

    };

  }

  angular
    .module('blocJams')
    .directive('seekBar', seekBar);

})();
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
