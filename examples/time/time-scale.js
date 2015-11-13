var state = new Kiwi.State("Play");

state.preload = function () {
	this.addSpriteSheet("player", "./assets/img/anime/catgirl.png", 150, 117);
};

state.create = function () {
	this.player = new Kiwi.GameObjects.Sprite(
		this, this.textures.player, 275, 150 );
	this.player.animation.add(
		"run", [  01, 02, 03, 04, 05, 06 ], 0.1, true, false );
	this.player.animation.play( "run" );
	this.addChild( this.player );
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );

	var mousePos = this.game.input.mouse.x / this.game.stage.width,
		timeScale = ( mousePos - 0.5 ) * 4;

	// Adjust the time scale of the clock depending on the mouse position. 
	// This will change the clock to play anywhere between -2 and 2. 
	this.game.time.clock.timeScale = timeScale;
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game( "game-container", "Time Scale", state, gameOptions );
