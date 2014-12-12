var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime/girl-sheet-maori.png', 150, 117);
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);

	// Creates animation with the name of 'run', frames from 01 to 06, loops, and will play automatically.
	this.player.animation.add( 'run', [  01, 02, 03, 04, 06 ], 0.1, true, true );
	this.addChild(this.player);
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'StopAnimation', state, gameOptions);


