// A tutorial on how to create JSON tilemaps with 'Tiled' can be found here : 
// http://www.kiwijs.org/documentation/tutorials/tilemap-creating-tiled-maps

var state = new Kiwi.State('Play');

state.preload = function () {
	this.addJSON( 'tilemap', './assets/img/tiles/tilemap-json.json');
	this.addSpriteSheet( 'tiles', './assets/img/tiles/tileset-basic.png', 48, 48 );
	this.addSpriteSheet( 'character', './assets/img/anime/girl-sheet-princess-3.png', 150, 117 );
};

state.create = function () {
	//Create our character
	this.character = new Kiwi.GameObjects.Sprite(this, this.textures.character, 0, 0);

	this.character.box.hitbox = new Kiwi.Geom.Rectangle(50, 0, 50, 117); 

	this.character.physics = this.character.components.add( new Kiwi.Components.ArcadePhysics( this.character, this.character.box ) );

	this.character.animation.add('walking', [ 1, 2, 3, 4, 5, 6 ], 0.1, true);
	this.character.animation.add('idle', [ 0 ], 0.1, true, false);
	this.character.animation.add('jump', [ 10 ], 0.1, true);
	this.character.animation.add('fall', [ 9 ], 0.1, true);
	this.character.physics.acceleration.y = 7;


	//Add to the screen.
	this.addChild(this.character);



	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'tilemap', this.textures.tiles);

	this.addChild(this.tilemap.layers[0]);
	this.addChild(this.tilemap.layers[1]);
	for(var i = 1; i < this.tilemap.tileTypes.length; i++) {
		this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;
	}

	this.keyboard = this.game.input.keyboard;

	this.leftKey = this.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
	this.rightKey = this.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);

	this.jumpKey = this.keyboard.addKey(Kiwi.Input.Keycodes.UP);

	this.keyboard.onKeyDownOnce.add(this.keyDownOnce, this);
	this.keyboard.onKeyUp.add(this.keyUp, this);

	this.canJump = true;

};

state.update = function () {
	Kiwi.State.prototype.update.call(this);
	this.character.physics.update();
	this.checkCollision();

	this.updateCharacterMovement();
	this.updateCharacterAnimation();
	
}
state.checkCollision = function () {
	this.tilemap.layers[0].physics.overlapsTiles(this.character, true);
}



state.updateCharacterMovement = function () {
	
	//Move the player/character
	if ( this.leftPressed ) {
		this.character.scaleX = -1;
		this.character.physics.velocity.x = -15;
	} else if ( this.rightPressed ) {
		this.character.scaleX = 1;
		this.character.physics.velocity.x = 15;
	} else {
		this.character.physics.velocity.x = 0;
	}

	if (this.jumpPressed && this.canJump ){
		console.log ( 'attempt jump' );
		this.character.physics.velocity.y = -30;
		this.canJump = false;
	}

}

state.updateCharacterAnimation = function () {

	if( !this.canJump ) {
		if ( this.character.animation.currentAnimation.name != 'jump' ){
			this.character.animation.play('jump', false);
		}
	} else if ( this.rightPressed || this.leftPressed ){
		if ( this.character.animation.currentAnimation.name != 'walking' ){
			this.character.animation.play('walking', false);
		}
	} else {
		if ( this.character.animation.currentAnimation.name != 'idle' ){
			this.character.animation.play('idle', false);
		}
	}

}

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
state.keyUp = function(keyCode, key) {

	if( keyCode === this.rightKey.keyCode ){
		this.rightPressed = false;
	} 

	if( keyCode === this.leftKey.keyCode ){
		this.leftPressed = false;
	} 

	if( keyCode === this.jumpKey.keyCode ){
		this.jumpPressed = false;
		this.canJump = true;
	} 

}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Basic Tilemap', state, gameOptions);