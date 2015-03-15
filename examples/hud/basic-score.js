var state = new Kiwi.State('Play');

state.preload = function () {
	
	// Adds a basic score widget to the defaultHUD of the game.
	this.score = new Kiwi.HUD.Widget.BasicScore( this.game, 50, 50, 0 );
	this.game.huds.defaultHUD.addWidget( this.score );

	this.score.style.color = 'blue';

}

state.create = function () {
	this.game.input.mouse.onDown.add( this.mouseClicked, this );
}

state.update = function () {
	Kiwi.State.prototype.update.call( this );
}

state.mouseClicked = function () {
	this.score.counter.current += 10;
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Basic Score', state, gameOptions);


