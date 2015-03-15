var state = new Kiwi.State('Play');

state.create = function () {
    
    this.bar = new Kiwi.HUD.Widget.Bar( this.game, 100, 100, 50, 50, 200, 15, '#000' );
    this.game.huds.defaultHUD.addWidget( this.bar );

    this.healthBar = new Kiwi.HUD.Widget.Bar ( this.game, 500, 1000, 50, 250, 668, 15 );

    // Change the style of the bar
    this.healthBar.bar.style.backgroundColor = '#060';


    // Chage the style of the HUD object
    this.healthBar.style.backgroundColor = '#F00';
    this.healthBar.style.boxShadow = '5px 5px 10px #000';

    this.game.huds.defaultHUD.addWidget( this.healthBar );

}

state.update = function () {
	Kiwi.State.prototype.update.call( this );
	this.healthBar.counter.current = ( this.game.input.mouse.x / this.game.stage.width ) * this.healthBar.counter.max;
}

var gameOptions = {
	width: 768,
	height: 512
}

var game = new Kiwi.Game('game-container', 'Bar', state, gameOptions);


