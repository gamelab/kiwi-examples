// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

var state = new Kiwi.State('Play');

// Load images and sounds
state.preload = function() {
    this.addImage('player', './assets/img/logo/spade.png');
};

// Setup the example
state.create = function() {
    // Set stage background color
    this.game.stage.color = '4488cc';

    // Create a follower
    // this.follower = new Follower(this, this.game.stage.width/2, this.game.stage.height/2, this.game.input);
    // this.addChild( this.follower );

    // Create 5 followers, each one following the one ahead of it
    // The first one will follow the mouse pointer
    var NUMBER_OF_FOLLOWERS = 10;
    var tempFollower = this.game.input;
    for(var i = 0; i < NUMBER_OF_FOLLOWERS; i++) {
        tempFollower = new Follower( this, this.game.stage.width/2, this.game.stage.height/2, tempFollower );
        this.addChild( tempFollower );
    }
    

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
    this.game.input.x = this.game.width/2;
    this.game.input.y = this.game.height/2;
};

// The update() method is called every frame
state.update = function() {
    Kiwi.State.prototype.update.call( this );
};

// Follower constructor
var Follower = function(state, x, y, target) {
    Kiwi.GameObjects.Sprite.call(this, state, state.textures.player, x, y );


    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;

    // Enable physics on this object
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

    // Each Follower will record its position history in
    // an array of point objects (objects with x,y members)
    // This will be used to make each Follower follow the
    // same track as its target
    this.history = [];
    this.HISTORY_LENGTH = 5;

    // Define constants that affect motion
    this.MAX_SPEED = 60.0; // pixels/second
    this.MIN_DISTANCE = 32; // pixels
};

Kiwi.extend( Follower, Kiwi.GameObjects.Sprite );

Follower.prototype.update = function() {
    Kiwi.GameObjects.Sprite.prototype.update.call( this );

    

    // Get the target x and y position.
    //
    // This algorithm will follow targets that may or may not have a position
    // history.
    //
    // The targetMoving flag tells this object when its target is moving
    // so that it knows when to move and when to stop.
    var t = {};
    var targetMoving = false;
    if (this.target.history !== undefined && this.target.history.length) {
        // This target has a history so go towards that
        t = this.target.history[0];
        if (this.target.physics.velocity.x !== 0 ||
            this.target.physics.velocity.y !== 0) targetMoving = true;
    } else {
        // This target doesn't have a history defined so just
        // follow its current x and y position
        t.x = this.target.x;
        t.y = this.target.y;

        // Calculate distance to target
        // If the position is far enough way then consider it "moving"
        // so that we can get this Follower to move.
        // var distance = this.game.math.distance(this.x, this.y, t.x, t.y);
        var distance = Math.sqrt( ( ( this.x + this.width * 0.5 ) - t.x ) * ( ( this.x + this.width * 0.5 )  - t.x ) 
            + ( ( this.y + this.height * 0.5 )  - t.y ) * ( ( this.y + this.height * 0.5 ) - t.y ) );
        if (distance > this.MIN_DISTANCE) targetMoving = true;
    }

    // If the distance > MIN_DISTANCE then move
    if (targetMoving) {
        // Add current position to the end of the history array
        this.history.push({ x: this.x, y: this.y });

        // If the length of the history array is over a certain size
        // then remove the oldest (first) element
        if (this.history.length > this.HISTORY_LENGTH) this.history.shift();

        // Calculate the angle to the target
        var rotation = Kiwi.Utils.GameMath.angleBetween(this.x, this.y, t.x, t.y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.physics.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.physics.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.physics.velocity.setTo(0, 0);
    }
};
var gameOptions = {
    width: 768,
    height: 512
};
var game = new Kiwi.Game('game-container', 'Follower', state, gameOptions);