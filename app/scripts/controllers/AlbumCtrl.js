(function() {
     //function AlbumCtrl() {
       //Inject the custom service into the AlbumCtrl
       //Also we will need to inject the services from
       //SongPlayer as a dependency. We will play music from the
       //Albumview
       function AlbumCtrl(Fixtures, SongPlayer) {
       //With jQuery, we would have to select a DOM element, iterate a specified number of times,
       // and append a new album cover thumbnail to the element each iteration.
//Instead of using jQuery to append images, bind the data from the albumPicasso object to the
//Collection template:
this.albums = [];

         //this.albums.push(angular.copy(albumPicasso));
         this.albumData = Fixtures.getAlbum();
         //SongPlayer as a dependency. We will play music from the
         //Albumview
         //the songPlayer property hold the service and make the service
         //accesible through the Albumview
         this.songPlayer = SongPlayer;

        this.album =  this.albums[0]

}
     angular
         .module('blocJams')
         //.controller('AlbumCtrl', AlbumCtrl);
         //SongPlayer as a dependency. We will play music from the
         //Albumview
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
         //We add Fixtures to AlbumCtrl's array of dependencies. Once injected,
         // the service is available for use within the controller.
 })();
