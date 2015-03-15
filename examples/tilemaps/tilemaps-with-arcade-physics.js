// A tutorial on how to create JSON tilemaps with 'Tiled' can be found here : 
// http://www.kiwijs.org/documentation/tutorials/tilemap-creating-tiled-maps

var state = new Kiwi.State('Play');


//Preload the assets
state.preload = function () {
	this.addJSON( 'tilemap', './assets/data/tilemap/anime.json');
	this.addSpriteSheet( 'tiles', './assets/img/anime/terrain.png', 48, 48 );
	this.addSpriteSheet( 'character', './assets/img/anime/princess.png', 150, 117 );
	this.addImage( 'background', './assets/img/anime/sky-bg.png' );
};


//Setup our game world
state.create = function () {

	//Create the background layer
	this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.background );
	this.addChild( this.background );
	

	//Create our character
	this.character = new Kiwi.GameObjects.Sprite(this, this.textures.character, 0, 75);	


	//Add physics to the character
	this.character.box.hitbox = new Kiwi.Geom.Rectangle( 48, 0, 50, 117 ); 
	this.character.physics = this.character.components.add( new Kiwi.Components.ArcadePhysics( this.character, this.character.box ) );
	this.character.physics.acceleration.y = 77;
	this.character.physics.maxVelocity.y = 140;

	//Create the characters animation
	this.character.animation.add('walking', [ 1, 2, 3, 4, 5, 6 ], 0.1, true);
	this.character.animation.add('idle', [ 0 ], 0.1, true, false);
	this.character.animation.add('jump', [ 10 ], 0.1, true);
	this.character.animation.add('fall', [ 9 ], 0.1, true);

	//Add to the screen.
	this.addChild(this.character);


	//Create the tilemap
	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'tilemap', this.textures.tiles);

	for( var i = 0; i < this.tilemap.layers.length; i++ ) {
		this.addChild( this.tilemap.layers[ i ] );
	}

	for(var i = 1; i < this.tilemap.tileTypes.length; i++) {
		this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;
	}


	//Add the key controls to the character
	this.keyboard = this.game.input.keyboard;

	this.leftKey = this.keyboard.addKey(Kiwi.Input.Keycodes.LEFT, true);
	this.rightKey = this.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT, true);
	this.jumpKey = this.keyboard.addKey(Kiwi.Input.Keycodes.UP, true);
	//Prevent the down key from scrolling the page
	this.keyboard.addKey(Kiwi.Input.Keycodes.DOWN, true);

	this.keyboard.onKeyDownOnce.add(this.keyDownOnce, this);
	this.keyboard.onKeyUp.add(this.keyUp, this);

}


state.update = function () {
	//Update all the gameobjects
	Kiwi.State.prototype.update.call(this);

	//Update physics
	this.checkCollision();

	this.updateCharacterMovement();
	this.updateCharacterAnimation();
	
	this.resetCharacter();
}


//Resolve collisions between the character and the first layer. 
state.checkCollision = function () {
	this.tilemap.layers[0].physics.overlapsTiles( this.character, true );
}


//Updated the characters velocities
state.updateCharacterMovement = function () {
	
	//Move the player/character
	if ( this.leftPressed ) {
		this.character.scaleX = -1;
		this.character.physics.velocity.x = -40;

	} else if ( this.rightPressed ) {
		this.character.scaleX = 1;
		this.character.physics.velocity.x = 40;

	} else {
		this.character.physics.velocity.x = 0;
	}

	if (this.jumpPressed && this.character.physics.isTouching( Kiwi.Components.ArcadePhysics.DOWN ) ){
		this.character.physics.velocity.y = -95;
	}

}

//Changes the characters animation to match what he is doing
state.updateCharacterAnimation = function () {

	//Are we in the air?
	if( !this.character.physics.isTouching( Kiwi.Components.ArcadePhysics.DOWN ) ) {

		//Are we going down or up?
		if( this.character.physics.velocity.y > 0 ) {
			this.character.animation.play('fall', false);
		} else {
			this.character.animation.play('jump', false);
		}

	} else if ( this.rightPressed || this.leftPressed ){
		this.character.animation.play('walking', false);

	} else {
		this.character.animation.play('idle', false);
		
	}

}


//Check to see if the character has fallen and needs to reset
state.resetCharacter = function() {

	if( this.character.y > this.game.stage.height + this.game.stage.height / 2 ) {
		this.character.y = 75;
		this.character.x = 0;
		this.character.physics.velocity.y = 0;
	}

}


//When the key is pressed
state.keyDownOnce = function(keyCode, key) {
	if( keyCode === this.rightKey.keyCode ){
		this.rightPressed = true;
	} 

	if( keyCode === this.leftKey.keyCode ){
		this.leftPressed = true;
	} 

	if( keyCode === this.jumpKey.keyCode ){
		this.jumpPressed = true;
	} 
}


//When the key is released
state.keyUp = function(keyCode, key) {

	if( keyCode === this.rightKey.keyCode ){
		this.rightPressed = false;
	} 

	if( keyCode === this.leftKey.keyCode ){
		this.leftPressed = false;
	} 

	if( keyCode === this.jumpKey.keyCode){
		this.jumpPressed = false;
	} 

}


//Create the game.
var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Tilemap with Arcade Physics', state, gameOptions);