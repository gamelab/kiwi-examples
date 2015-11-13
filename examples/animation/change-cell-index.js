var state = new Kiwi.State( "Play" );


state.preload = function () {
	this.addSpriteSheet("punk", "./assets/img/anime/punk.png", 150, 117);
};


state.create = function () {

	//Create the player
	this.punk = new Kiwi.GameObjects.Sprite(this, this.textures.punk, 275, 175);
	this.addChild(this.punk);

	//Create the cell
	this.cellIndexText = new Kiwi.GameObjects.Textfield(
		this, "Cell Index: 0", 15, 15, "#000", 20 );
	this.addChild( this.cellIndexText );
};


state.update = function () {

	Kiwi.State.prototype.update.call( this );

	// Getting the x position of the mouse or setting it to 0
	// if the mouse has not been on the stage.
	var mouseX = this.game.input.mouse.x;

	// If mouse has not been on stage mouseX will be set to 0
	// ( By default the mouses x position is -1 ).
	if (this.game.input.mouse.x <= 0 ){
		mouseX = 0;
	}

	// Getting the width of the game.
	var gameWidth = this.game.stage.width;

	// Getting the number of cells of the texture atlas.
	var animationLength = this.textures.punk.numCells;

	// Calculating 
	this.punk.cellIndex =
		Math.floor( ( mouseX / gameWidth ) * animationLength );

	this.cellIndexText.text = "Cell Index: " + this.punk.cellIndex;
};


var gameOptions = {
	width: 768,
	height: 512
};


var game = new Kiwi.Game(
	"game-container", "Change Cell Index", state, gameOptions );
