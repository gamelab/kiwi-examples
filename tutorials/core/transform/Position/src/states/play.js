var Position = Position || {};

Position.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Position.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);
  /**
  * When you want to scale an entity down you can access the transform property that is located on every entity. 
  * Note: Some entities have the scaleX/scaleY aliased for ease of use.
  **/

  //to see information about animations look at the animation component section
  this.textures.snake.sequences.push(new Kiwi.Animations.Sequence('slither', [1, 2, 3, 4, 5, 6], 0.1, true));

  this.snakeA = new Kiwi.GameObjects.Sprite(this, this.textures.snake);                  //create the snake
  this.addChild(this.snakeA);
  this.snakeA.transform.x = 400;
  this.snakeA.transform.y = 150;

  this.snakeB = new Kiwi.GameObjects.StaticImage(this, this.textures.snake, 400, 200);
  this.addChild(this.snakeB);
  this.snakeB.transform.x = 100;
  this.snakeB.y = 50;             //shorthand
  
}




