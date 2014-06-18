var BasicCollision = BasicCollision || {};

BasicCollision.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
BasicCollision.Play.create = function () {

  	this.britishTank = new CustomTank(this, this.textures.britishTank, 50, 50);
    this.addChild(this.britishTank);
    

    this.germanTank = new CustomTank(this, this.textures.germanTank, 600, 50);
    this.addChild(this.germanTank);

    this.germanTank.scaleX = -1;


    this.germanTank.physics.acceleration.x = -1;
    this.britishTank.physics.acceleration.x = 1;

    this.germanTank.physics.elasticity = 0.5;
    this.britishTank.physics.elasticity = 0.5;

}


BasicCollision.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  this.germanTank.physics.overlaps(this.britishTank, true);
}


var CustomTank = function(state,texture, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);
  this.state = state;
  this.box.hitbox = new Kiwi.Geom.Rectangle(40, 38, 86, 80);
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

  this.animation.add('drive', [1, 2, 3, 4, 5, 6], 0.1, true);
  this.animation.play('drive');
}
Kiwi.extend(CustomTank, Kiwi.GameObjects.Sprite);

CustomTank.prototype.update = function(){
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.physics.update();

}



