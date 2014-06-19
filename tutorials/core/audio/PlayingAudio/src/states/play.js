var PlayingAudio = PlayingAudio || {};

PlayingAudio.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
PlayingAudio.Play.create = function () {

  this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  this.boom = new Kiwi.Sound.Audio(this.game, 'loop', 0.3, false);
  this.addChild(this.name);

  this.mainText = new Kiwi.GameObjects.Textfield(this, 'Click to Play Audio', 30, 175, '#CCCCCC', 17);
  this.addChild(this.mainText);

  this.game.input.onUp.add(this.playAudio, this);
  
}

PlayingAudio.Play.playAudio = function () {
  this.boom.stop();
  this.boom.play();
}




