var ManipulatingGroups = ManipulatingGroups || {};

ManipulatingGroups.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
ManipulatingGroups.Play.create = function () {

	/*
	* Replace with your own game creation code here...
	*/
  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
    this.addChild(this.name);
  		

  	//his.heart.cellIndex = 8;
  	//his.sheild.cellIndex = 9;
  	//his.crown.cellIndex = 10; 



    this.scaleGroup = new Kiwi.Group(this);
    this.rotationGroup = new Kiwi.Group(this);
    this.positionGroup = new Kiwi.Group(this);

    this.scaleGroup.x = game.stage.width * 0.25;
    this.scaleGroup.y = game.stage.height * 0.5;

    this.rotationGroup.x = game.stage.width * 0.5;
    this.rotationGroup.y = game.stage.height * 0.5;

    this.positionGroup.x = game.stage.width * 0.75;
    this.positionGroup.y = game.stage.height * 0.5;

    this.addChild(this.scaleGroup);
    this.addChild(this.rotationGroup);
    this.addChild(this.positionGroup)

    var scale1 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 0 - game.stage.height * 0.25);
    var scale2 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 0);
    var scale3 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, game.stage.height * 0.25);
    scale1.cellIndex = 8;
    scale2.cellIndex = 8;
    scale3.cellIndex = 8;
    this.scaleGroup.addChild(scale1);
    this.scaleGroup.addChild(scale2);
    this.scaleGroup.addChild(scale3);

    var rotation1 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 0 -game.stage.height * 0.25);
    var rotation2 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 0);
    var rotation3 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, game.stage.height * 0.25);
    rotation1.cellIndex = 9;
    rotation2.cellIndex = 9;
    rotation3.cellIndex = 9;
    this.rotationGroup.addChild(rotation1);
    this.rotationGroup.addChild(rotation2);
    this.rotationGroup.addChild(rotation3);

    var position1 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 0 - game.stage.height * 0.25);
    var position2 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 0);
    var position3 = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, game.stage.height * 0.25);
    position1.cellIndex = 10;
    position2.cellIndex = 10;
    position3.cellIndex = 10;
    this.positionGroup.addChild(position1);
    this.positionGroup.addChild(position2);
    this.positionGroup.addChild(position3);

    this.scaleStep = 0.01;
    this.positionStep = 1;

  
}
ManipulatingGroups.Play.update = function(){
  if(this.scaleGroup.scaleX >= 1.5 || this.scaleGroup.scaleX <= 0.25){
    this.scaleStep *= -1;
  }
  this.scaleGroup.scaleY += this.scaleStep;
  this.scaleGroup.scaleX += this.scaleStep;

  this.rotationGroup.rotation += 0.01;

  if(this.positionGroup.x >= game.stage.width * 0.9 || this.positionGroup.x <= game.stage.width * 0.7){
    this.positionStep *= -1;
  }
  this.positionGroup.x += this.positionStep;
}



