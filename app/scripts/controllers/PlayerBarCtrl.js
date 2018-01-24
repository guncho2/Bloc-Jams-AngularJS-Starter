// we inject both services from the Fixtures and SongPlayer
//into this controller
(function() {
  function PlayerBarCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }

  angular
      .module( 'blocJams')
      .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);

})();
