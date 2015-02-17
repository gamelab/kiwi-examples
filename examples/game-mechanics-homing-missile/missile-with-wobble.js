// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License
var state = new Kiwi.State( 'Play' );


// Load images and sounds
state.preload = function() {
    this.addSpriteSheet('rocket', './assets/img/shapes/square.png', 70, 70 );
};

// Setup the example
state.create = function() {
    // Set stage background to something sky colored
    this.game.stage.color = "4488cc";

    // Create a missile and add it to the game in the bottom center of the stage
    this.missile = new Missile ( this, this.game.stage.width * 0.5, this.game.stage.height * 0.5 );
    this.addChild( this.missile );

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
    this.game.input.x = this.game.stage.width * 0.5;
    this.game.input.y = this.game.stage.height * 0.5;
};

// The update() method is called every frame
state.update = function() {
    Kiwi.State.prototype.update.call( this );
};

// Missile constructor
var Missile = function( state, x, y ) {
    Kiwi.GameObjects.Sprite.call(this, state, state.textures.rocket, x, y );
    this.state = state;

    this.scaleX = 0.5;
    this.scaleY = 0.25;


    // Enable physics on the missile
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

    // Define constants that affect motion
    this.SPEED = 25;
    this.TURN_RATE = Math.PI / 48; 
    this.WOBBLE_LIMIT = this.TURN_RATE * 3;
    this.WOBBLE_SPEED = 400;

    this.wobble = this.WOBBLE_LIMIT;

    // Move the ball linearly across the screen.
    this.wobbleTween = this.state.game.tweens.create( this );
    this.wobbleTween.to( { wobble: -this.WOBBLE_LIMIT } , this.WOBBLE_SPEED, Kiwi.Animations.Tweens.Easing.Sinusoidal.InOut, false );
    this.wobbleTweenBack = this.state.game.tweens.create( this );
    this.wobbleTweenBack.to( { wobble: this.WOBBLE_LIMIT } , this.WOBBLE_SPEED, Kiwi.Animations.Tweens.Easing.Sinusoidal.InOut, false );

    this.wobbleTween.chain( this.wobbleTweenBack );
    this.wobbleTween.start();
    this.wobbleTweenBack.onComplete( this.loopTween, this );
};
// Missiles are a type of Kiwi.GameObject.Sprite
Kiwi.extend(Missile, Kiwi.GameObjects.Sprite);

Missile.prototype.loopTween = function (){
    // this.wobble = this.WOBBLE_LIMIT;
    this.wobbleTween.start();
}


Missile.prototype.update = function() {
    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    Kiwi.GameObjects.Sprite.prototype.update.call( this );

    var targetAngle = Kiwi.Utils.GameMath.angleBetween(
        this.x + this.width * 0.5, this.y + this.height * 0.5,
        this.game.input.x, this.game.input.y
    );
    targetAngle += this.wobble;

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            this.rotation += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.rotation -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.TURN_RATE ){
            this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.physics.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.physics.velocity.y = Math.sin(this.rotation) * this.SPEED;
};



var gameOptions = {
    width: 768,
    height: 512
};

var game = new Kiwi.Game( 'game-container', 'Basic Movement', state, gameOptions );