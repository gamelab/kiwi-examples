// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var state = new Kiwi.State('Play');
// Load images and sounds
state.preload = function() {
    this.addSpriteSheet('ground', './assets/img/shapes/square.png', 70, 70 );
    this.addSpriteSheet('player', './assets/img/shapes/circle.png', 70, 70);
};

// Setup the example
state.create = function() {
    // Set stage background to something sky colored
    this.game.stage.color = '4488cc';

    // Define movement constants
    this.MAX_SPEED = 100; // pixels/second
    this.ACCERATION = 100;
    this.DRAG = 50;
    this.GRAVITY = 200;
    this.JUMP_SPEED = -200;

    this.jumping = false;

    // Create a player sprite
    this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, this.game.stage.width/2, this.game.stage.height - 140 );

    // Enable physics on the player
    this.player.physics = this.player.components.add(new Kiwi.Components.ArcadePhysics(this.player, this.player.box));
    this.player.physics.acceleration.y = this.GRAVITY;
    this.player.physics.maxVelocity = this.MAX_SPEED;
    this.player.physics.drag.x = this.DRAG;
    this.addChild( this.player );


    this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.LEFT );
    this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.RIGHT );

    this.upKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.UP );



    // Create some ground for the player to walk on
    this.ground = new Kiwi.Group( this );
    this.addChild( this.ground );
    for(var x = 0; x < this.game.stage.width; x += 70) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = new Kiwi.GameObjects.Sprite(this, this.textures.ground, x, this.game.stage.height - 70 );
        groundBlock.physics = groundBlock.components.add(new Kiwi.Components.ArcadePhysics(groundBlock, groundBlock.box));
        groundBlock.physics.immovable = true;
        this.ground.addChild( groundBlock );
    }
};

// The update() method is called every frame
state.update = function() {
    Kiwi.State.prototype.update.call( this );
    // Collide the player with the ground
    this.player.physics.overlapsGroup(this.ground, true);

    if (this.leftInputIsActive()) {
        // If the LEFT key is down, set the player velocity to move left
        this.player.physics.acceleration.x = -this.ACCERATION;
    } else if (this.rightInputIsActive()) {
        // If the RIGHT key is down, set the player velocity to move right
        this.player.physics.acceleration.x = this.ACCERATION;
    } else {
        // Stop the player from moving horizontally
        this.player.physics.acceleration.x = 0;
    }

    // Set a variable that is true when the player is touching the ground
    var onTheGround = this.player.physics.isTouching( Kiwi.Components.ArcadePhysics.DOWN );

    // If the player is touching the ground, let him have 2 jumps
    if (onTheGround) {
        this.jumps = 2;
        this.jumping = false;
    }

    if (this.jumps > 0 && !this.jumping && this.upInputIsActive()) {
        // Jump when the player is touching the ground and the up arrow is pressed
        this.player.physics.velocity.y = this.JUMP_SPEED;
        this.jumping = true;
    }
    if (this.upInputIsReleased() && this.jumping) {
        this.jumping = false;
        this.jumps--;
    }
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
state.leftInputIsActive = function() {
    var isActive = false;

    isActive = this.leftKey.isDown;

    return isActive;
};

state.rightInputIsActive = function() {
    var isActive = false;
    

    isActive = this.rightKey.isDown;
    return isActive;
};
state.upInputIsActive = function() {
    var isActive = false;

    isActive = this.upKey.isDown;

    return isActive;
};

state.upInputIsReleased = function() {
    var isActive = false;

    isActive = this.upKey.justReleased();

    return isActive;
};

var gameOptions = {
    width: 768,
    height: 512
};

var game = new Kiwi.Game('game-container', 'Double Jump', state, gameOptions);