// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License
var state = new Kiwi.State( 'Play' );

// Load images and sounds
state.preload = function() {
    this.addSpriteSheet('ship', './assets/img/shapes/square.png', 70, 70);
};

// Setup the example
state.create = function() {
    // Set stage background color
    this.game.stage.color = "333333";

    // Define motion constants
    this.ROTATION_SPEED = Math.PI / 3;
    this.ACCELERATION = 20; 
    this.MAX_SPEED = 25; 
    this.DRAG = 2.5;
    this.GRAVITY = 5;

    // Add the ship to the stage
    this.ship = new Kiwi.GameObjects.Sprite( this, this.textures.ship, this.game.stage.width/2, this.game.stage.height/2 );
    this.addChild( this.ship );
    this.ship.scaleY = 0.5;
    this.ship.rotation = -Math.PI * 0.5; // Point the ship up

    // Enable physics on the ship
    this.ship.physics = this.ship.components.add( new Kiwi.Components.ArcadePhysics( this.ship, this.ship.box ) );


    // Set maximum velocity
    this.ship.physics.maxVelocity = this.MAX_SPEED;

    // Add drag to the ship that slows it down when it is not accelerating
    this.ship.physics.drag.x = this.DRAG;
    this.ship.physics.drag.y = this.DRAG;

    // Define the keyboard keys we will be using.
    this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.LEFT );
    this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.RIGHT );

    this.upKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.UP );
};

// The update() method is called every frame
state.update = function() {
    Kiwi.State.prototype.update.call( this );
    
    // Keep the ship on the screen
    if (this.ship.x > this.game.stage.width) this.ship.x = 0;
    if (this.ship.x < 0) this.ship.x = this.game.stage.width;
    if (this.ship.y > this.game.stage.height) this.ship.y = 0;
    if (this.ship.y < 0) this.ship.y = this.game.stage.height;

    if (this.leftInputIsActive()) {
        // If the LEFT key is down, rotate left
        this.ship.physics.angularVelocity = -this.ROTATION_SPEED;
    } else if ( this.rightInputIsActive() ) {
        // If the RIGHT key is down, rotate right
        this.ship.physics.angularVelocity = this.ROTATION_SPEED;
    } else {
        // Stop rotating
        this.ship.physics.angularVelocity = 0;
    }

    if (this.upInputIsActive()) {
        // If the UP key is down, thrust
        // Calculate acceleration vector based on this.angle and this.ACCELERATION
        this.ship.physics.acceleration.x = Math.cos( this.ship.rotation ) * this.ACCELERATION;
        this.ship.physics.acceleration.y = Math.sin( this.ship.rotation ) * this.ACCELERATION;

        // Show the frame from the spritesheet with the engine on
        this.ship.cellIndex = 1;
    } else {
        // Otherwise, stop thrusting
        this.ship.physics.acceleration.setTo( 0, 0 );

        // Show the frame from the spritesheet with the engine off
        this.ship.cellIndex = 0;
    }

    // Applies acceleration to the y axis everyframe to simulate gravity.
    this.updateGravity();
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
state.leftInputIsActive = function() {
    var isActive = false;

    isActive = this.leftKey.isDown;

    return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
state.rightInputIsActive = function() {
    var isActive = false;

    isActive = this.rightKey.isDown;

    return isActive;
};

state.updateGravity = function () {
    this.ship.physics.acceleration.y += this.GRAVITY;
}

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
state.upInputIsActive = function() {
    var isActive = false;

    isActive = this.upKey.isDown;

    return isActive;
};

var gameOptions = {
    width: 768,
    height: 512
};

var game = new Kiwi.Game( 'game-container', 'Basic Movement', state, gameOptions );