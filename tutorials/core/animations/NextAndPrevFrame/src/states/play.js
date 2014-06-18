var NextAndPrevFrame = NextAndPrevFrame || {};

NextAndPrevFrame.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
NextAndPrevFrame.Play.create = function () {
  this.createText();

	this.snake = new Kiwi.GameObjects.Sprite(this, this.textures.snake, 25, 30);
  this.addChild(this.snake);

  this.game.input.onUp.add(this.released, this);
  
}

NextAndPrevFrame.Play.released = function(x){

  if (x > this.game.stage.width / 2) {
      this.snake.animation.nextFrame();
  } else {
      this.snake.animation.prevFrame();
  }
   

}


NextAndPrevFrame.Play.createText = function(x){
  this.leftText = new Kiwi.GameObjects.Textfield(this, '<', 5, 85, '#CCCCCC');
  this.addChild(this.leftText);
  this.rightText = new Kiwi.GameObjects.Textfield(this, '>', 178, 85, '#CCCCCC');
  this.addChild(this.rightText);
  this.mainText = new Kiwi.GameObjects.Textfield(this, 'Click to Change Animation', 3, 175, '#CCCCCC', 17);
  this.addChild(this.mainText);
}




