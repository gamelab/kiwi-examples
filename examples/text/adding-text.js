var state = new Kiwi.State('Play');

state.create = function () {

	// Create a TextField GameObject.
	this.text = new Kiwi.GameObjects.Textfield( this, "Text goes here.", 50, 50, "#000", 32, 'normal', 'Impact' );

	// Add text to the state
	this.addChild( this.text );

	this.game.input.mouse.onDown.add( this.mouseClicked, this );
	this.game.input.mouse.onWheel.add( this.mouseWheeled, this );

};

state.mouseClicked = function () {

	// On mouse click changes the font of the text.
	if(this.text.fontFamily === 'serif' ){
		this.text.fontFamily = 'Impact';
	} else {
		this.text.fontFamily = 'serif';
	}

	this.text.text = "Text goes here";
	
};

state.mouseWheeled = function ( scrollX, scrollY, mouse ) {

	// Mouse wheel will cahnge the font size of the text.
	if( scrollY > 0 ){
		this.text.fontSize += 1;
	} else {
		this.text.fontSize -= 1;
	}

};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Adding Text', state, gameOptions);


