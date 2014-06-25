var BasicDebugCanvas = BasicDebugCanvas || {};

BasicDebugCanvas.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
BasicDebugCanvas.Play.create = function () {

	/*
	* Replace with your own game creation code here...
	*/
  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  		

  	this.heart = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
  	this.heart.cellIndex = 8;
  	this.heart.y = this.game.stage.height * 0.5 - this.heart.height * 0.5;
    this.heart.x = this.game.stage.width * 0.33 - this.heart.width * 0.5;


  	this.sheild = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 200, 200);
  	this.sheild.cellIndex = 9;
  	this.sheild.y = this.game.stage.height * 0.5 - this.sheild.height * 0.5;
  	this.sheild.x = this.game.stage.width * 0.66 - this.sheild.width * 0.5;

  	//Add the GameObjects to the stage
  	this.addChild(this.heart);
  	this.addChild(this.sheild);
	  this.addChild(this.name);
    game.stage.createDebugCanvas();
  
}

BasicDebugCanvas.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  this.heart.rotation += 0.01;

  game.stage.clearDebugCanvas();

  this.heart.box.draw(game.stage.dctx);
  this.sheild.box.draw(game.stage.dctx);
}




