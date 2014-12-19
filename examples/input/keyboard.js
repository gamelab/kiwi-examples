var state = new Kiwi.State('Play');

state.preload = function () {
	
	this.addSpriteSheet('player', './assets/img/anime-monsters/griffon-sheet.png', 150, 117);
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);
	this.player.animation.play( 'walk' );

	console.dir( this.player );

	this.keyboard = this.game.input.keyboard;
	this.speed = 3;


	this.game.input.keyboard.onKeyDownOnce.add( this.keyDownOnce, this );
	this.game.input.keyboard.onKeyUp.add( this.keyUp, this );

	this.message = new Kiwi.GameObjects.Textfield ( this, "Use 'wasd' or the arrow keys to move the character.", 15, 15, "#000", 16 );
	this.addChild( this.message );

	this.textDown = new Kiwi.GameObjects.Textfield ( this, "Key has not been pressed", 15, 50, "#000", 16 );
	this.addChild( this.textDown );

	this.textUp = new Kiwi.GameObjects.Textfield ( this, "Key has not been released", 15, 85, "#000", 16 );
	this.addChild( this.textUp );


	// Creating Keys
	this.rightKey = this.keyboard.addKey(Kiwi.Input.Keycodes.D);
	this.rightArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT, true);

	this.leftKey = this.keyboard.addKey(Kiwi.Input.Keycodes.A);
	this.leftArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.LEFT, true);

	this.upKey = this.keyboard.addKey(Kiwi.Input.Keycodes.W);
	this.upArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.UP, true);

	this.downKey = this.keyboard.addKey(Kiwi.Input.Keycodes.S);
	this.downArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.DOWN, true);





};

state.keyDownOnce = function(keyCode, key) {
	this.textDown.text = "Keycode : " + keyCode + " has been pressed.";
};
state.keyUp = function(keyCode, key) {
	this.textUp.text = "Keycode : " + keyCode + " has been released. Held for: " + (key.timeUp - key.timeDown) + " milliseconds.";
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );
	if( this.rightKey.isDown || this.rightArrowKey.isDown ){
		this.player.x += this.speed;
	} 

	if( this.leftKey.isDown || this.leftArrowKey.isDown ){
		this.player.x -= this.speed;
	} 

	if( this.upKey.isDown || this.upArrowKey.isDown ){
		this.player.y -= this.speed;
	}
	if( this.downKey.isDown || this.downArrowKey.isDown ){
		this.player.y += this.speed;
	}  
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'keyboard', state, gameOptions);


