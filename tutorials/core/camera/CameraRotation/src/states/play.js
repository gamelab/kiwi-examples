var CameraRotation = CameraRotation || {};

CameraRotation.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
CameraRotation.Play.create = function () {

    

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  		

  	this.heart = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
  	this.heart.cellIndex = 8;
  	this.heart.y = this.game.stage.height - this.heart.height - 10;


  	this.sheild = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 200, 200);
  	this.sheild.cellIndex = 9;
  	this.sheild.y = this.game.stage.height * 0.5 - this.sheild.height * 0.5;
  	this.sheild.x = this.game.stage.width * 0.5 - this.sheild.width * 0.5;


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
	  this.addChild(this.name);

    this.camera = game.cameras.defaultCamera;
    this.rotSpeed = Math.PI/100;
  
}

CameraRotation.Play.update = function(){
  this.camera.transform.rotation += this.rotSpeed
  if(this.camera.transform.rotation >= 2*Math.PI || this.camera.transform.rotation <= 0){
    this.rotSpeed *= -1;
  }
}



