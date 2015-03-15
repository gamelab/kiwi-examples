var state = new Kiwi.State('Play');

state.create = function () {
    
    // Adds a Time widget to the defaultHUD of the game.
    this.myTime = new Kiwi.HUD.Widget.Time( this.game, '', 50, 50 );
    this.game.huds.defaultHUD.addWidget( this.myTime );

    this.myTime.style.color = 'black';
    this.myTime.start();

}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Time', state, gameOptions);


