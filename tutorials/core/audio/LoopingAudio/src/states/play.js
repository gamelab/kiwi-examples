var LoopingAudio = LoopingAudio || {};

LoopingAudio.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
LoopingAudio.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  	
	  this.addChild(this.name);

    this.backgroundMusic = new Kiwi.Sound.Audio(this.game, 'loop', 0.3, true);
    this.backgroundMusic.play();
  
}




