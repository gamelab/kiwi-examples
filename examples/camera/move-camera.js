var state = new Kiwi.State('Play');

state.preload = function () {
	
	this.addSpriteSheet('player', './assets/img/anime/girl-sheet-maori.png', 150, 117);
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);

	// Creates animation with the name of 'run', frames from 01 to 06, loops, and will play automatically.
	this.player.animation.add( 'run', [  01, 02, 03, 04, 06 ], 0.1, true, true );
	this.addChild(this.player);

	this.cameraStep = 10;

	this.game.input.keyboard.onKeyDown.add( this.myKeyDown, this );


	// this.upKey = this.game.input.keyboard.onKeyDown.addKey( Kiwi.Input.Keycodes.UP );
	// this.downKey = this.game.input.keyboard.onKeyDown.addKey( Kiwi.Input.Keycodes.DOWN );
	// this.rightKey = this.game.input.keyboard.onKeyDown.addKey( Kiwi.Input.Keycodes.RIGHT );
	// this.leftKey = this.game.input.keyboard.onKeyDown.addKey( Kiwi.Input.Keycodes.LEFT );

	// console.log("Create Finished", this.rightKey );

};

// state.myKeyDown = function( keyCode, key ) {
// 	console.log( "Key has been pressed" );
// 	  
// };

state.myKeyDown = function(keyCode, key) {
    console.log("Keydown", key);

    if(keyCode === Kiwi.Input.Keycodes.LEFT ){
		this.game.cameras.defaultCamera.transform.x += this.cameraStep;
	}
	if(keyCode === Kiwi.Input.Keycodes.RIGHT ){
		this.game.cameras.defaultCamera.transform.x -= this.cameraStep;
	} 
	if(keyCode === Kiwi.Input.Keycodes.UP ){
		this.game.cameras.defaultCamera.transform.y += this.cameraStep;
	} 
	if(keyCode === Kiwi.Input.Keycodes.DOWN ){
		this.game.cameras.defaultCamera.transform.y -= this.cameraStep;
	}

};
var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'MoveCamera', state, gameOptions);


