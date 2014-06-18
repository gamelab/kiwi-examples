var PauseAndResume = PauseAndResume || {};

PauseAndResume.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
PauseAndResume.Play.create = function () {
  this.squid = new Kiwi.GameObjects.Sprite(this, this.textures.squid, 25, 30);
  this.addChild(this.squid);
  this.squid.animation.add('walk', [1, 2, 3, 4, 5, 6], 0.075, true);
  this.squid.animation.play('walk');

  this.game.input.onUp.add(this.released, this);

  this.mainText = new Kiwi.GameObjects.Textfield(this, 'Click to Pause/Resume', 14, 175, '#CCCCCC', 17);
  this.addChild(this.mainText);
  
}

PauseAndResume.Play.released = function(){
  if(this.squid.animation.isPlaying){
    this.squid.animation.stop();
  } else {
    this.squid.animation.resume();
  }
}




