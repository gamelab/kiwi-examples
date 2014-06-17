var CreateAndUpdate = CreateAndUpdate || {};

CreateAndUpdate.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
CreateAndUpdate.Play.create = function () {

	this.speed = 4;
  		

  	this.heart = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
  	this.heart.cellIndex = 8;
  	this.heart.y = this.game.stage.height - this.heart.height - 10;


  	this.sheild = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
  	this.sheild.cellIndex = 9;


  	this.crown = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
  	this.crown.cellIndex = 10; 
  	this.crown.x = this.game.stage.width - this.crown.width - 10;
  	this.crown.y = this.game.stage.height - this.crown.height - 10;


  	this.bomb = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 10);
  	this.bomb.x = this.game.stage.width - this.bomb.width  -10;


  	//Add the GameObjects to the stage
  	this.addChild(this.heart);
  	this.addChild(this.crown);
  	this.addChild(this.sheild);
  	this.addChild(this.bomb);
  
}

CreateAndUpdate.Play.preUpdate = function(){
  this.sheild.x += this.speed;
  if(this.sheild.x > this.game.stage.width){
    this.sheild.x = 0 - this.sheild.width;
  }
};

CreateAndUpdate.Play.update = function(){
  this.bomb.y += this.speed;
  if(this.bomb.y > this.game.stage.height){
    this.bomb.y = 0 - this.bomb.height;
  }
};
CreateAndUpdate.Play.postUpdate = function(){
  this.crown.x -= this.speed;
  if(this.crown.x < 0 - this.crown.width){
    this.crown.x = this.game.stage.width;
  }
};
CreateAndUpdate.Play.postRender = function(){
  this.heart.y -= this.speed;
  if(this.heart.y < 0 - this.heart.height){
    this.heart.y = this.game.stage.height;
  }
};




