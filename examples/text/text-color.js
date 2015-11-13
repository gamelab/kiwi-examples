var state = new Kiwi.State( "Play" );

state.create = function () {

	this.text1 = new Kiwi.GameObjects.Textfield(
		this, "This text is black.", 50, 50,
		"#000", 32, "normal", "serif" );

	this.addChild( this.text1 );

	// Sets the color of the text to red in the 5th parameter
	this.text2 = new Kiwi.GameObjects.Textfield(
		this, "This text is red.", 50, 100,
		"#FF0000", 32, "normal", "serif" );
	this.addChild( this.text2 );

	// Adds text that is black originally.
	this.text3 = new Kiwi.GameObjects.Textfield(
		this, "This text will be purple.", 50, 150,
		"#000", 32, "normal", "serif" );
	this.addChild( this.text3 );

	// Change the color of the text to be purple.
	this.text3.color = "#9900FF";
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game( "game-container", "Text Color", state, gameOptions );
