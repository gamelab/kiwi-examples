var CreateTween = CreateTween || {};

CreateTween.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
CreateTween.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  //create our cat
  this.bullet = new Kiwi.GameObjects.Sprite(this, this.textures.bullet, 100, 200);
  this.addChild(this.bullet); 
  
  /**
  * To create a tween you need to create the tween via the manager.
  * When you create the tween you pass in the object that the tween is taking affect on.
  **/
  this.tween = this.game.tweens.create(this.bullet);

  /**
  * Using the method 'to' you tell the tween where you want the object to go 'to'
  * Parameter One - Object with the finished values. Can contain more than one value
  * Parameter Two - Duration in milliseconds.
  * Parameter Three - OPTIONAL - Easing method to use. - Default is linear none 
  **/
  this.tween.to({ x: 800 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None); 
  this.tween.delay(2000); //delays the tween after starting. In milliseconds.
  this.tween.start();     //start the tween
  
}




