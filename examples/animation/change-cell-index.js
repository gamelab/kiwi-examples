var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('playerSpriteSheet', './assets/img/anime/girl-sheet-punk-3.png', 150, 117);
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.playerSpriteSheet, 275, 150);
	this.addChild(this.player);

	this.cellIndexText = new Kiwi.GameObjects.Textfield( this, "Cell Index: 0", 15, 15 );
	this.addChild( this.cellIndexText );
};

state.update = function (){
	Kiwi.State.prototype.update.call(this);
	
	// Getting the x position of the mouse or setting it to 0 if the mouse has not been on the stage.
	var mouseX = this.game.input.mouse.x;

	// If mouse has not been on stage mouseX will be set to 0 ( By default the mouses x position is -1 ).
	if (this.game.input.mouse.x <= 0 ){
		mouseX = 0;
	}

	// Getting the width of the game.
	var gameWidth = this.game.stage.width;

	// Getting the number of cells of the texture atlas.
	var animationLength = this.textures.playerSpriteSheet.numCells;

	// Calculating 
	var newCellIndex = Math.floor( (mouseX / gameWidth) * animationLength );

	this.player.cellIndex = newCellIndex;

	this.cellIndexText.text = "Cell Index: " + this.player.cellIndex;
};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'ChangeCellIndex', state, gameOptions);


