var Scale = Scale || {};

Scale.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Scale.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  /**
  * When you want to scale an entity down you can access the transform property that is located on every entity. 
  * Note: Some entities have the scaleX/scaleY aliased for ease of use.
  **/
  
  //to see information about animations look at the animation component section
  this.textures.snake.sequences.push(new Kiwi.Animations.Sequence('slither', [1, 2, 3, 4, 5, 6], 0.1, true));

  this.snakeA = new Kiwi.GameObjects.Sprite(this, this.textures.snake, 10, 300);                  //create the snake
  this.addChild(this.snakeA);
  this.snakeA.transform.scale = 0.5; 
  this.snakeA.animation.play('slither');

  this.snakeB = new Kiwi.GameObjects.StaticImage(this, this.textures.snake, 400, 200);
  this.addChild(this.snakeB);
  this.snakeB.transform.scaleY = 1.5;

  this.snakeC = new Kiwi.GameObjects.Sprite(this, this.textures.snake, 250, 10);
  this.addChild(this.snakeC);
  this.snakeC.scaleX = 1.5;       //shortcut/shorthand way
  this.snakeC.scaleY = 0.5;
  this.snakeC.animation.play('slither');
  
}




