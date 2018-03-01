
(function(){

  function SongPlayer($rootScope, Fixtures) {


    var SongPlayer = {};

    var currentAlbum = Fixtures.getAlbum();

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    SongPlayer.currentSong = null;

    SongPlayer.currentTime = null;

    SongPlayer.currentVolume = null;

    var currentBuzzObject = null;

    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });
      currentBuzzObject.bind('volumechange', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentVolume = currentBuzzObject.getVolume();
        });
      });

      SongPlayer.currentSong = song;
    };

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
  if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
            playSong(song)
        }
      }

    };

    // Assignment

    var playSong = function(song) {
      if (currentBuzzObject){
        currentBuzzObject.play();
        song.playing = true;
      };

    };
    //Finish Assignment
    // @param {Object} song

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;

      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    //ASSIGNMENT NEXT
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentAlbum.songs.length-1) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;


      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };


    //FINISH ASSIGNMENT NEXT

    //@function setCurrentTime
    //@desc Set current time (in seconds) of currently playing song
    //@param {Number} time

    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };


    SongPlayer.setCurrentVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
    };
    SongPlayer.mute = function() {

      if (SongPlayer.currentVolume > 0) {
      SongPlayer.setCurrentVolume(0);
      } else {
          SongPlayer.setCurrentVolume(80);
        }
      };
    return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

})();
