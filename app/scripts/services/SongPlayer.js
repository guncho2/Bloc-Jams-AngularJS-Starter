//like in fixtures, we create a variable with an empty object
//the service returns this object and make it public within its
//methods and properties
//@function SongPlayer
//@desc function THAT HOLD METHODS and properties for the song player
// @param
(function(){
  function SongPlayer() {
    var SongPlayer = {};
    // will add a method play to play a songs:
    //Update the play method with a condition that checks if the currently
    //playing song is not equal to the song the user clicks on
    //If the currently playing song is not the same as the song
    // the user clicks on, then we want to:

//Stop the currently playing song, if there is one.
//Set a new Buzz sound object.
//Set the newly chosen song object as the currentSong.
//Play the new Buzz sound object.

//@desc currentSong variable audio file
//@type var
    var currentSong = null;
    //@desc Buzz object audio file
 //@type {Object}
     var currentBuzzObject = null;
     //@function setSong
     //@desc Stops currently playing song and loads new audio file as currentBuzzObject
     // @param {Object} song
    SongPlayer.play = function(song) {
      if (currentSong !== song) {


          //  if (currentBuzzObject) {
          //      currentBuzzObject.stop();
//In our SongPlayer service, every time we play, pause,
// or stop a song, we'll need to update this boolean
          //      currentSong.playing = null;
        //    }
      //var currentBuzzObject = new buzz.sound(sound.audioUrl, {
    //  currentBuzzObject = new buzz.sound(song.audioUrl, {
    //    formats: ['mp3'],
    //    preload: true
    //  });
    //  currentSong = song;

//@function playSong
//@desc Play currently playing song and loads new audio file as currentBuzzObject
// @param {Object} song



//@function setSong
//@desc stop currently playing song and loads new audio file as currentBuzzObject
//if current song is == song playing and current song object is paused
//the current playing object song will play
// @param {Object} song
    var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentSong = song;
 };



      setSong(song);
      currentBuzzObject.play();
      //In our SongPlayer service, every time we play, pause,
      // or stop a song, we'll need to update this boolean
       song.playing = true;
      //checks if currentSong is equal to  song
      //If the user can trigger the play method on a song that is already set
      // as the  currentSong, then the assumption is that the song must be
      //paused. The conditional statement if (currentBuzzObject.isPaused())
      //is a check to make sure our assumption is correct

    } else if (currentSong === song) {
       if (currentBuzzObject.isPaused()) {
           currentBuzzObject.play();
           song.playing = true;
       }
   }
// the play method take the argument song which will get from the Albumview
//when the user clicks the play button, the ng-Repeat directive used on the Albumview
//template will dictate which song to pass into the function. The play method
// crates a new Buzz object using song's audioUrl property and then call
//Buzz owns play method on the object
    };

    //Now that we can actually see the pause button, let's implement the method
    // to call when a user clicks on it  pause

    //@function pause
    //@desc Play currently playing song is paused so the current object song audio
    //is paused and the playing song is false

    // @param {Object} song

    // Assignment

     SongPlayer.playSong = function(song) {
     if (currentBuzzObject){
    currentBuzzObject.play();
    song.playing = true;
    };
    currentBuzzObject = new buzz.sound(song.audioUrl, {
       formats: ['mp3'],
       preload: true
    });

    currentSong = song;
    };


    //Finish Assignment


    SongPlayer.pause = function(song) {
     currentBuzzObject.pause();
     song.playing = false;
 };
 //pause method requires less logic because we don't need to check for various
 //conditions – a song must already be playing before the user can trigger it.
    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);

})();
