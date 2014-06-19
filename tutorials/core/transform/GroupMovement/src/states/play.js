var GroupMovement = GroupMovement || {};

GroupMovement.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
GroupMovement.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  //to see information about animations look at the animation component section
  this.textures.snake.sequences.push(new Kiwi.Animations.Sequence('slither', [1, 2, 3, 4, 5, 6], 0.1, true));
  
  //create a new group and add it to the stage
  this.snakes = new Kiwi.Group(this);
  this.addChild(this.snakes);
  this.numSnakes = 50;
  this.direction = 'right';

  /**
  * Create some new snakes and add them all to the snakes group.
  **/
  for (var i = 0; i < this.numSnakes; i++) {

      var s = new Kiwi.GameObjects.Sprite(this, this.textures.snake, Math.random() * this.game.stage.width, Math.random() * this.game.stage.height - 117 );
      this.snakes.addChild(s);
      s.animation.play('slither');

  }
  
}
GroupMovement.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  /**
  * Move the entire group in the 'right' or 'left' direction. 
  **/
  if (this.direction == 'right') {

      this.snakes.scaleX = 1;
      this.snakes.x += 3;

      if (this.snakes.x > this.game.stage.width) {
          this.direction = 'left';
          this.snakes.x *= 2;
      }

  } else {

      this.snakes.scaleX = -1;
      this.snakes.x -= 3;

      if (this.snakes.x < -150) {
          this.direction = 'right';
          this.snakes.x -= this.game.stage.width;
      }

  }
}




