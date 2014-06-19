var Rotation = Rotation || {};

Rotation.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Rotation.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  	this.addChild(this.name);
    this.rocket = new CustomRocket(this, this.textures.rocket, 55, 62);
    this.addChild(this.rocket);
    this.rocket.physics.angularAcceleration = 0.05;
    this.rocket.physics.maxAngular = 5;


  
}

Rotation.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  

}

var CustomRocket = function(state,texture, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);
  this.state = state;
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

}
Kiwi.extend(CustomRocket, Kiwi.GameObjects.Sprite);

CustomRocket.prototype.update = function() {
  Kiwi.GameObjects.Sprite.prototype.update.call(this);
  this.physics.update();

};


