var state = new Kiwi.State('Play');

state.preload = function () {
    this.addImage('icon', './assets/img/logo/heart.png' );
}

state.create = function () {

	// Adds a icon widget to the defaultHUD of the game.
	this.icon = new Kiwi.HUD.Widget.Icon( this.game, this.textures.icon, 50, 50 );
    this.game.huds.defaultHUD.addWidget( this.icon );

}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Icon', state, gameOptions);


