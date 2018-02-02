//like in fixtures, we create a variable with an empty object
//the service returns this object and make it public within its
//methods and properties
//@function SongPlayer
//@desc function THAT HOLD METHODS and properties for the song player
// @param
(function(){
  //function SongPlayer() {
  function SongPlayer(Fixtures) {

  //To move between songs, we need to know the index of the
  //song object within the  songs array. To access the songs
  //array, we need to store the album information.
//Inject the Fixtures service into the SongPlayer service.
//SongPlayer(Fixtures)

    var SongPlayer = {};
//Then use the getAlbum method to store the album information
    var currentAlbum = Fixtures.getAlbum();
    // will add a method play to play a songs:
    //Update the play method with a condition that checks if the currently
    //playing song is not equal to the song the user clicks on
    //If the currently playing song is not the same as the song
    // the user clicks on, then we want to:

//Stop the currently playing song, if there is one.
//Set a new Buzz sound object.
//Set the newly chosen song object as the SongPlayer.currentSong.
//Play the new Buzz sound object.


//Now that we can access the album, we can write a function to get
//the index of a song
var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
};
//@desc currentSong variable audio file
//@type var
    //var SongPlayer.currentSong = null;
    SongPlayer.currentSong = null;

 // @desc Current playback time (in seconds) of currently playing song
 //  @type {Number}
 // If the length of a song is the max value of the seek bar, then the current
 //playback time of the song is the value of the seek bar, which determines the
 // position of the seek bar thumb
 SongPlayer.currentTime = null;
    //@desc Buzz object audio file
 //@type {Object}
     var currentBuzzObject = null;
     //@function setSong
     //@desc Stops currently playing song and loads new audio file as currentBuzzObject
     // @param {Object} song
    SongPlayer.play = function(song) {

// While we still can't access the song object, that's okay.
// We've already figured out that we don't need to have access
// to song in the player bar. We only need to know the currently
// playing song, which we can access via the service. The second
//step to make the player bar work is to update play and pause
//to account for the fact that the player bar can't pass song as
// an argument.Add the following lines to the play and pause methods
      song = song || SongPlayer.currentSong;
      //We use || to tell the function: assign (1) the value of
      // song or (2) the value of  SongPlayer.currentSong to the
      // song variable. The first condition occurs when we call
      //the methods from the Album view's song rows, and the
      //second condition occurs when we call the methods from
      // the player bar.
      if (SongPlayer.currentSong !== song) {



          //  if (currentBuzzObject) {
          //      currentBuzzObject.stop();
//In our SongPlayer service, every time we play, pause,
// or stop a song, we'll need to update this boolean
          //      SongPlayer.currentSong.playing = null;
        //    }
      //var currentBuzzObject = new buzz.sound(sound.audioUrl, {
    //  currentBuzzObject = new buzz.sound(song.audioUrl, {
    //    formats: ['mp3'],
    //    preload: true
    //  });
    //  SongPlayer.currentSong = song;

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
        SongPlayer.currentSong.playing = null;
    }
    // the play method take the argument song which will get from the Albumview
    //when the user clicks the play button, the ng-Repeat directive used on the Albumview
    //template will dictate which song to pass into the function. The play method
    // crates a new Buzz object using song's audioUrl property and then call
    //Buzz owns play method on the object
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    SongPlayer.currentSong = song;
 };



      setSong(song);
      currentBuzzObject.play();
      //In our SongPlayer service, every time we play, pause,
      // or stop a song, we'll need to update this boolean
       song.playing = true;
      //checks if SongPlayer.currentSong is equal to  song
      //If the user can trigger the play method on a song that is already set
      // as the  SongPlayer.currentSong, then the assumption is that the song must be
      //paused. The conditional statement if (currentBuzzObject.isPaused())
      //is a check to make sure our assumption is correct

    } else if (SongPlayer.currentSong === song) {
       if (currentBuzzObject.isPaused()) {
           currentBuzzObject.play();
           song.playing = true;
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
    //Now that we can actually see the pause button, let's implement the method
    // to call when a user clicks on it  pause

    //@function pause
    //@desc Play currently playing song is paused so the current object song audio
    //is paused and the playing song is false

    // @param {Object} song

    SongPlayer.pause = function(song) {
      //We use || to tell the function: assign (1) the value of
      // song or (2) the value of  SongPlayer.currentSong to the
      // song variable. The first condition occurs when we call
      //the methods from the Album view's song rows, and the
      //second condition occurs when we call the methods from
      // the player bar.
      song = song || SongPlayer.currentSong;
     currentBuzzObject.pause();
     song.playing = false;
 };

 //a method to go to the previous song
 SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
  //what should happen if the previous song index is less than zero
  //– that is, what should happen when the user is on the first song and clicks the previous button? There are many possibilities. We'll opt to:
//stop the currently playing song, and
//set the value of the currently playing song to the first song
if (currentSongIndex < 0) {
       currentBuzzObject.stop();
       SongPlayer.currentSong.playing = null;

   //If the currentSongIndex is not less than zero, then it
   //must be greater than zero. Add an else conditional that
   //moves to the previous song and automatically plays it
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

 //pause method requires less logic because we don't need to check for various
 //conditions – a song must already be playing before the user can trigger it.
    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);

})();
