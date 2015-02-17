// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var state = new Kiwi.State('Play');

// Load images and sounds
state.preload = function() {
    this.addSpriteSheet( 'circle', './assets/img/shapes/square.png', 70, 70 );
};

// Setup the example
state.create = function() {
    // Set stage background color
    this.game.stage.color = "4488cc";

    // Define constants
    this.SHOT_DELAY = 300; // milliseconds (10 bullets/second)
    this.BULLET_SPEED = 200; // pixels/second
    this.NUMBER_OF_BULLETS = 20;
    this.GRAVITY = 50;

    // Create an object representing our gun
    this.gun = new Kiwi.GameObjects.Sprite( this, this.textures.circle, 20, this.game.stage.height - 100 );
    this.addChild( this.gun );

    // Set the pivot point to the center of the gun
    this.gun.anchorPointX = this.gun.width * 0.5;
    this.gun.anchorPointY = this.gun.height * 0.5;

    // Create an object pool of bullets
    this.bulletPool = new Kiwi.Group( this );
    this.addChild ( this.bulletPool );
    for( var i = 0; i < this.NUMBER_OF_BULLETS; i++ ) {
        // Create each bullet and add it to the group.
        var bullet = new Kiwi.GameObjects.Sprite( this, this.textures.circle, -100, -100 );
        this.bulletPool.addChild( bullet );

        // Set the pivot point to the center of the bullet
        bullet.anchorPointX = this.gun.width * 0.5;
        bullet.anchorPointY = this.gun.height * 0.5;

        // Enable physics on the bullet
        bullet.physics = bullet.components.add(new Kiwi.Components.ArcadePhysics(bullet, bullet.box));

        bullet.physics.acceleration.y = this.GRAVITY;

        // Set its initial state to "dead".
        bullet.alive = false;
        bullet.active = false;
    }
};

state.shootBullet = function() {

    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now() - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now();

    // Get a dead bullet from the pool
    var bullet = this.getFirstDeadBullet();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    this.revive( bullet );

    // Set the bullet position to the gun position.
    bullet.x = this.gun.x;
    bullet.y = this.gun.y;

    bullet.rotation = this.gun.rotation;

    // Shoot it in the right direction
    bullet.physics.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
    bullet.physics.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
};

state.getFirstDeadBullet = function () {

    var bullets = this.bulletPool.members;

    for (var i = bullets.length - 1; i >= 0; i--) {
        if ( !bullets[i].alive ) {
            return bullets[i];
        }
    };
    return null;
}

state.revive = function ( bullet ){
    bullet.alive = true;
    bullet.active = true;
}
state.checkBulletPosition = function ( bullet ) {
    
    if( bullet.x > this.game.stage.width || bullet.x < 0 ||
        bullet.y > this.game.stage.height || bullet.y < 0 ){
        bullet.alive = false;
        bullet.active = false;
    } 
}

// The update() method is called every frame
state.update = function() {
    // Shoot a bullet
    Kiwi.State.prototype.update.call( this );

    this.gun.rotation = Kiwi.Utils.GameMath.angleBetween( this.gun.x, this.gun.y, this.game.input.x, this.game.input.y );

    // Rotate all living bullets to match their trajectory
    this.bulletPool.forEach(this, function( bullet ) {
        bullet.rotation = Math.atan2(bullet.physics.velocity.y, bullet.physics.velocity.x);
    }, this);


    if (this.game.input.mouse.isDown) {
        this.shootBullet();
    }

    this.bulletPool.forEach( this, this.checkBulletPosition );
};

state.angleToPointer = function ( from ) {
    return Math.atan2( this.game.input.y - from.y, this.game.input.x - from.x );

}
var gameOptions = {
    width: 768,
    height: 512
};
var game = new Kiwi.Game('game-container', 'Follower', state, gameOptions);
