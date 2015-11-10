var PianoKey = function(note){
  this.letter = note;
  this.notesRange = {
    'a': "c",
    's': "d",
    'd': "e",
    'f': "f",
    'g': "g",
    'h': "a",
    'j': "b",
  };
  this.note = this.notesRange[this.letter];
  this.audioSrc = "audios/piano/";
  this.instrument = "piano";
  // this.notes = false;
  this.audioElement = this.addSamples();
};
PianoKey.prototype = {
  init: function () {
    this.createButtons();
    this.addSamples();
    this.addGlobalListner();
  },
  createButtons: function (){
    /*
    <input type="button" name="c" value="C" id="a">
    <input type="button" name="d" value="D" id="s">
    <input type="button" name="e" value="E" id="d">
    <input type="button" name="f" value="F" id="f">
    <input type="button" name="g" value="G" id="g">
    <input type="button" name="a" value="A" id="h">
    <input type="button" name="b" value="B" id="j">
    */
    for (var key in this.notesRange) {
      console.log(key, this.notesRange[key]);
      var button = document.createElement("INPUT");
      button.name = this.notesRange[key];
      button.type = 'button';
      button.id = key;
      button.value = key.toUpperCase();
      // audio.controls = "true";
      document.querySelector('.'+this.instrument).appendChild(button);
    }
    this.checkButtons();
  },
  checkButtons: function () {
    Array.prototype.slice.call(document.querySelectorAll('.'+this.instrument+' INPUT[type=button]'), 0).forEach(function(el,i) {

      var element = document.getElementById(el.id);
      //console.log(element);
      element.addEventListener('click', function (e){
        var key = new PianoKey(el.id);
        key.playNote();
       });
    });
  },
  addSamples: function () {
    if(this.notesRange[this.letter] && document.getElementById(this.instrument + this.note) === null ){
      // console.log(this.notesRange[this.letter]);
      var audio = document.createElement("AUDIO");
      audio.src = this.audioSrc + this.note +".wav";
      audio.id = this.instrument+this.note;
      // audio.controls = "true";
      document.querySelector('.'+this.instrument).appendChild(audio);
    }
    return document.getElementById(this.instrument + this.note);
  },
  removeSamples: function() {
    if(this.audioElement && this.audioElement.parentNode){
      this.audioElement.parentNode.removeChild(this.audioElement);
    }
  },
  playNote: function() {
    // console.log('started');
    if(this.audioElement){
      this.audioElement.play();
    }
    //  console.log(this);

  },
  stopNote: function() {
    if(this.audioElement){
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.removeSamples();
    }
    // console.log(this);
  },
  addGlobalListner: function(){
    var that = this;
    document.addEventListener("keypress", function(e){
      var letter = String.fromCharCode(e.keyCode).toLowerCase();
      if(typeof that.notesRange[letter] !== 'undifined'){
        var key = new PianoKey(letter);
        key.playNote();
        // console.log(key);
        document.addEventListener("keyup", function(ev){
          // console.log(e, ev);
          if(e.keyIdentifier === ev.keyIdentifier){
            key.stopNote();
          }
        });
      }

    });

  },
};

window.onload = function () {
  var piano = new PianoKey();
  piano.init();
}
