var ManipulatingGroupMembers = ManipulatingGroupMembers || {};

ManipulatingGroupMembers.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
ManipulatingGroupMembers.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
    this.addChild(this.name);
  		

  	var heart = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
  	heart.cellIndex = 8;
  	heart.y = game.stage.height - heart.height - 10;


  	var shield = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 200, 200);
  	shield.cellIndex = 9;
  	shield.y = game.stage.height * 0.5 - shield.height * 0.5;
  	shield.x = game.stage.width * 0.5 - shield.width * 0.5;


  	var crown = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
  	crown.cellIndex = 10; 
  	crown.x = game.stage.width - crown.width - 10;
  	crown.y = game.stage.height - crown.height - 10;


  	var bomb = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 0, 10);
  	bomb.x = game.stage.width - bomb.width  -10;

    //Create group
    this.myGroup = new Kiwi.Group(this);

    //Add group to stage
    this.addChild(this.myGroup);



  	//Add the GameObjects to the group
  	this.myGroup.addChild(heart);
  	this.myGroup.addChild(crown);
  	this.myGroup.addChild(shield);
  	this.myGroup.addChild(bomb);

    this.step = 4;

    //Manipulate single entity 
    this.myGroup.members[0].scaleX = 2;
    this.myGroup.members[0].scaleY = 2;
	  
  
}

ManipulatingGroupMembers.Play.update = function(){
  Kiwi.State.prototype.update.call(this);

  //Manipulate single entity 
  if(this.myGroup.members[2].x  >= game.stage.width - this.myGroup.members[2].width || this.myGroup.members[2].x <= 0){
    this.step *= -1;
  }
  this.myGroup.members[2].x += this.step;

  //Manipulate entire group
  for (var i = this.myGroup.members.length - 1; i >= 0; i--) {
    this.myGroup.members[i].rotation += 0.01;
  };
}




