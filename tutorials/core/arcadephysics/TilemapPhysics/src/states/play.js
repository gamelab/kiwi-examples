var TilemapPhysics = TilemapPhysics || {};

TilemapPhysics.Play = new Kiwi.State('Play');




TilemapPhysics.Play.create = function () {

  //Create the Tilemap. We don't pass in the json or the atlas at this stage since we aren't creating it using a JSON file
        this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);

        //Sets the properties of the tilemap. You don't have to do this and can provide it when you create your tilemap but it is easier to do at this stage as it will then be inherited by default. 
        this.tilemap.setTo(48, 48, 17, 6)

        // Create's a bunch of tiletypes based on an list of cellIndexs we want to use for each one.
        this.tilemap.createTileTypes([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        //Give the tile types we have added collision areas.
        for (var i = 1; i < this.tilemap.tileTypes.length; i++)
            this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;

        this.tilemap.createTileTypes([32, 35]);

        //Create our tilemap. Tilemap data in Kiwi is a 1D array.
        var tilemapdata = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0,
            6, 0, 3, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 10, 11, 4, 4,
            6, 0, 7, 8, 8, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,
            6, 0, 7, 8, 8, 8, 9, 0, 3, 4, 5, 0, 0, 0, 0, 7, 8,
        ];

        // Create our TileMapLayer.
        this.tilemap.createNewLayer('Desert', this.textures.desertSpritesheet, tilemapdata);

        //Add the layer to the state.
        this.addChild(this.tilemap.layers[0]);

        //Create our Character
        this.soldier = new CustomSoldier(this, this.textures.desertSoldier, 96, 20);
        
        this.addChild(this.soldier);

        //Add in all of the animations it has
        this.soldier.animation.add('walking', [1, 2, 3, 4, 5, 6], 0.09, true);
        this.soldier.animation.add('idle', [0], 0.1, false, true);
        this.soldier.animation.add('goingUp', [9], 0.1, false);
        this.soldier.animation.add('goingDown', [10], 0.1, false);

  
}

TilemapPhysics.Play.update = function () {
  Kiwi.State.prototype.update.call(this);

  if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {
        this.soldier.scaleX = -1;
        this.soldier.physics.velocity.x = -15;
    } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {
        this.soldier.scaleX = 1;
        this.soldier.physics.velocity.x = 15;
    } else {

        this.soldier.physics.velocity.x = 0;
    }

    //Check for collisions
    this.tilemap.layers[0].physics.overlapsTiles(this.soldier, true);

    //Are we on the ground?
    if (this.soldier.physics.isTouching(Kiwi.Components.ArcadePhysics.DOWN)) {

        //Does the player want to up?
        if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.UP)) {
            this.soldier.physics.velocity.y = -30;
            this.soldier.animation.play('goingUp');

            //No velocity? Ok then we are standing still....duh de doo
        } else if (this.soldier.physics.velocity.x == 0) {
            this.soldier.animation.play('idle');

            //Not jumping or standing still? Then lets walk  (and we aren't already)
        } else if (this.soldier.animation.currentAnimation.name != 'walking') {
            this.soldier.animation.play('walking');

        }

        //So we're not touching the ground, are we going down?
    } else if (this.soldier.physics.velocity.y > 0) {
        this.soldier.animation.play('goingDown');
    }

}



var CustomSoldier = function(state,texture, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);
  this.state = state;
  this.box.hitbox = new Kiwi.Geom.Rectangle(40, 38, 43, 80);
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
  this.physics.acceleration.y = 4;
}
Kiwi.extend(CustomSoldier, Kiwi.GameObjects.Sprite);

CustomSoldier.prototype.update = function(){
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.physics.update();

}




