var state = new Kiwi.State('Play');

state.create = function () {
    
    // Adds a button widget to the defaultHUD of the game.
    this.myButton = new Kiwi.HUD.Widget.Button( this.game, 'PRESS ME!', 50, 50 );
    this.game.huds.defaultHUD.addWidget( this.myButton );

    this.myButton.style.color = 'white';
    this.myButton.style.fontSize = '2em';
    this.myButton.style.fontWeight = 'bold';
    this.myButton.style.padding = '0.5em 1em';
    this.myButton.style.backgroundColor = 'black';
    this.myButton.style.cursor = 'pointer';

    this.myButton.input.onDown.add( this.buttonPressed, this );
    this.myButton.input.onUp.add( this.buttonReleased, this );

    this.myButton.input.onOver.add( this.buttonOver, this );
    this.myButton.input.onOut.add( this.buttonOut, this );

}

state.buttonPressed = function() {
    this.myButton.y = 55;
}

state.buttonReleased = function() {
    this.myButton.y = 50;
    this.myButton.text = 'THANK YOU :)';
}

state.buttonOver = function() {
    this.myButton.style.backgroundColor = 'green';
}

state.buttonOut = function() {
    this.myButton.style.backgroundColor = 'black';
}


var gameOptions = {
	width: 330,
	height: 175
};

var game = new Kiwi.Game('game-container', 'Button', state, gameOptions);


