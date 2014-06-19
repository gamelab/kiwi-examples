var GroupRotation = GroupRotation || {};

GroupRotation.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
GroupRotation.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);
  //Create Two Rocket Groups and add them to the stage.
  this.rockets1 = this.createRockets(75, (this.game.stage.height / 2) - 25);
  this.rockets2 = this.createRockets(375, (this.game.stage.height / 2) - 25);

  //You can try to move the Rotation Point of a Group but it will not work.
  this.rockets2.transform.rotPointX = 400;
  
}
GroupRotation.Play.update = function(){
  //Rotate the Groups
  this.rockets1.rotation += 0.05;
  this.rockets2.rotation += 0.025;
}

GroupRotation.Play.createRockets = function(x, y){
  //Create a new Group and add it to the stage
  var rockets = new Kiwi.Group(this);
  rockets.x = x;
  rockets.y = y;
  this.addChild(rockets);

  //Create a few new Rockets.
  /*
  * Because you can't move a groups point of Rotation we are going to add the rockets around the Groups normal position (which will be its RotationPoint).
  * This is so that when it is rotated the individual items will move around that point and maintain the V shape.
  */
  var half = 45;
  rockets.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, 0, 0));          //Middle 
  rockets.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, half, half));    //Right 
  rockets.addChild(new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, -half, half));   //Left

  //Rotate them individually, Just to make them face the same way.
  for (var i = 0; i < rockets.members.length; i++) {
      rockets.members[i].rotation = -Math.PI / 2;
  }

  //Return the Rockets
  return rockets;
}




