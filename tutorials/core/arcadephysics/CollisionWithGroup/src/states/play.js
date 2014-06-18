var CollisionWithGroup = CollisionWithGroup || {};

CollisionWithGroup.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
CollisionWithGroup.Play.create = function () {
  this.choppa = new Choppa(this, 100, 100);
  this.bulletGroup = new Kiwi.Group(this);
  this.addChild(this.choppa);

  for (var i = 0; i < 6; i++) {
    //Create the bullet objects off screen and at random points.
    var bullet = new Bullet(this, this.game.stage.width + Math.random() * this.game.stage.width, this.game.stage.height * Math.random());
    bullet.scaleX = -1; //Flip the bullets so that they are flying towards the helicopter
    bullet.physics.velocity.x = -25; //Make the bullets move towards the helicopter
    this.bulletGroup.addChild(bullet); //Add them
    this.addChild(this.bulletGroup);

  }


  
}
CollisionWithGroup.Play.update = function(){
  Kiwi.State.prototype.update.call(this);

        for (var i = 0; i < this.bulletGroup.members.length; i++) {
            var overlaped = this.choppa.physics.overlaps(this.bulletGroup.members[i], false);

            if (this.bulletGroup.members[i].x + (this.bulletGroup.members[i]).width < 0 || overlaped) {

                this.bulletGroup.members[i].x = this.game.stage.width + 100;
                this.bulletGroup.members[i].y = this.game.stage.height * Math.random();

            } 

        }

}




var Choppa = function(state, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, state.textures.choppa, x, y);
  
  this.state = state;
  this.box.hitbox = new Kiwi.Geom.Rectangle(40, 38, 86, 50);
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));


  this.animation.add('fly', [1, 2, 3, 4, 5, 6], 0.1, true);
  this.animation.play('fly');
}
Kiwi.extend(Choppa, Kiwi.GameObjects.Sprite);

Choppa.prototype.update = function(){
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.physics.update();

}

var Bullet = function(state, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, state.textures.missile, x, y);
  console.log(x, y);
  this.state = state;
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

}
Kiwi.extend(Bullet, Kiwi.GameObjects.Sprite);

Bullet.prototype.update = function(){
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.physics.update();

}




