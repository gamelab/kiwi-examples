var Sprite = Sprite || {};

Sprite.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Sprite.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  /**
  * Create a new Sprite
  * - Parameter One - The state that this sprite belongs to.
  * - Parameter Two - The texture you want to apply to this entity
  * - Parameter Three - The sprites initial coordinates on the x axis.
  * - Parameter Four - The sprites initial coordinates on the y axis.
  * - Parameter Five - If the input component should be enabled or not.
  **/
  this.mySprite = new Kiwi.GameObjects.Sprite(this, this.textures.tree, 30, 60, false);

  //Add the sprite to the State
  this.addChild(this.mySprite);
  
}




