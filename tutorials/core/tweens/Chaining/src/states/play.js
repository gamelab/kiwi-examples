var Chaining = Chaining || {};

Chaining.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Chaining.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  this.bullet = new Kiwi.GameObjects.Sprite(this, this.textures.bullet, 100, 200);
  this.addChild(this.bullet);

  //only apply the callback once.
  this.bullet.input.onRelease.addOnce(this.tweenIt, this);
   
  //create the tweens
  this.tweenA = this.game.tweens.create(this.bullet);  
  this.tweenB = this.game.tweens.create(this.bullet); 
  this.tweenC = this.game.tweens.create(this.bullet);
  
  //set the tweens up
  this.tweenA.to({ x: 400 }, 1200, Kiwi.Animations.Tweens.Easing.Linear.None, false);
  this.tweenB.to({ rotation: Kiwi.Utils.GameMath.degreesToRadians(45) }, 750, Kiwi.Animations.Tweens.Easing.Circular.InOut, false);
  this.tweenC.to({ x: 600, y: 400 }, 1200, Kiwi.Animations.Tweens.Easing.Linear.None, false);

  //set the order that they will execute one after the other in.
  this.tweenA.chain(this.tweenB);
  this.tweenB.chain(this.tweenC);
  
}

Chaining.Play.tweenIt = function(){
  this.tweenA.start();
}



