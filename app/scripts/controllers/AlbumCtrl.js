(function() {
     //function AlbumCtrl() {
       //Inject the custom service into the AlbumCtrl
       function AlbumCtrl(Fixtures) {
       //With jQuery, we would have to select a DOM element, iterate a specified number of times,
       // and append a new album cover thumbnail to the element each iteration.
//Instead of using jQuery to append images, bind the data from the albumPicasso object to the
//Collection template:
this.albums = [];
     for (var i=0; i < 12; i++) {
         //this.albums.push(angular.copy(albumPicasso));
         this.albumData = Fixtures.getAlbum();
     }
        this.album =  this.albums[0]

}
     angular
         .module('blocJams')
         //.controller('AlbumCtrl', AlbumCtrl);
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
         //We add Fixtures to AlbumCtrl's array of dependencies. Once injected,
         // the service is available for use within the controller.
 })();
