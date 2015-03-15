var state = new Kiwi.State('Play');

state.preload = function () {
    this.addImage('icon', './assets/img/logo/shield.png' );
}

state.create = function () {

	// Adds a icon bar widget to the defaultHUD of the game.
	this.iconBar = new Kiwi.HUD.Widget.IconBar( this.game, this.textures.icon, 5, 10, 50, 50 );
    this.game.huds.defaultHUD.addWidget( this.iconBar );

}

state.update = function () {
	Kiwi.State.prototype.update.call( this );
	this.iconBar.counter.current = ( this.game.input.mouse.x / this.game.stage.width ) * 10 + 1;
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Icon Bar', state, gameOptions);


