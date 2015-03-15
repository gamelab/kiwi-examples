var state = new Kiwi.State('Play');

state.create = function () {

	this.text1 = new Kiwi.GameObjects.Textfield( this, "This text is centered.", this.game.stage.width * 0.5, 50, "#000", 24, 'normal', 'Impact' );

	// Aligns the text to the center.
	// This is the same as this.text1.textAlign = 'center';.
	this.text1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.addChild( this.text1 );

	// Aligns the text to the left.
	this.text2 = new Kiwi.GameObjects.Textfield( this, "This text is aligned to the left.", this.game.stage.width * 0.5, 100, "#000", 24, 'normal', 'Impact' );
	this.text2.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT;
	this.addChild( this.text2 );

	// Aligns the text to the right.
	this.text3 = new Kiwi.GameObjects.Textfield( this, "This text is aligned to the right.", this.game.stage.width * 0.5, 150, "#000", 24, 'normal', 'Impact' );
	this.text3.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_RIGHT;
	this.addChild( this.text3 );



  
};




var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Text Align', state, gameOptions);


