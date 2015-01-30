var state = new Kiwi.State('Play');

state.create = function () {
    
    this.myButton = new Kiwi.HUD.Widget.Button( this.game, 'Button One', 50, 50 );
    this.game.huds.defaultHUD.addWidget( this.myButton );

    this.myButton.style.color = 'blue';
    this.myButton.style.backgroundColor = 'red';

    console.log ( this.myButton );

    this.myButton.input.onDown.add( this.buttonPressOne, this );



};

state.buttonPressOne = function () {
	console.log( "pressed" );
}


state.update = function () {
	Kiwi.State.prototype.update.call( this );

}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Button', state, gameOptions);


