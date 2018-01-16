(function() {
     function CollectionCtrl() {
       //With jQuery, we would have to select a DOM element, iterate a specified number of times,
       // and append a new album cover thumbnail to the element each iteration.
//Instead of using jQuery to append images, bind the data from the albumPicasso object to the
//Collection template:
this.albums = [];
     for (var i=0; i < 12; i++) {
         this.albums.push(angular.copy(albumPicasso));
     }

     angular
         .module('blocJams')
         .controller('CollectionCtrl', CollectionCtrl);
 })();
//We add an albums property and set its value to an empty array. Within the for loop,
// we use angular.copy to make copies of albumPicasso and push them to the array.
