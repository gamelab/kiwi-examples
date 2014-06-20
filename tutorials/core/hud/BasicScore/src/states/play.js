var BasicScore = BasicScore || {};

BasicScore.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
BasicScore.Play.create = function () {
  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
	  this.addChild(this.name);

  /**
  * Create a new Textfield
  * - Parameter One - The game that this BasicScore belongs to.
  * - Parameter Two - The cooridnates of the game on the x-axis.
  * - Parameter Three - The cooridnates of the game on the y-axis.
  * - Parameter Four - The initial score to start off at.
  *
  * You can also apply your own CSS to these widgets to customize your game even further.
  **/
    this.myScore = new Kiwi.HUD.Widget.BasicScore(this.game, 10, 30, 0);
    this.myScore.style.color = '#FFFFFF';

    this.game.huds.defaultHUD.addWidget(this.myScore);
  
}
BasicScore.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  this.myScore.counter.current += 10;
}




