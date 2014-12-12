var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('playerSpriteSheet', './assets/img/anime-monsters/griffon-sheet.png', 150, 117);
};

state.create = function () {

	this.player1 = new Kiwi.GameObjects.Sprite(this, this.textures.playerSpriteSheet, 200, 150);
	this.addChild(this.player1);

	this.player2 = new Kiwi.GameObjects.Sprite(this, this.textures.playerSpriteSheet, 400, 150);
	this.player2.animation.add( 'run', [ 01, 02, 03, 04, 05, 06 ], 1 );
	this.player2.animation.switchTo( 'run', false );
	this.addChild(this.player2);

	this.leftCellIndexText = new Kiwi.GameObjects.Textfield( this, "Left Cell Index: 0", 15, 15 );
	this.addChild( this.leftCellIndexText );

	this.rightCellIndexText = new Kiwi.GameObjects.Textfield( this, "Right Cell Index: 1", 15, 50 );
	this.addChild( this.rightCellIndexText );

	this.game.input.mouse.onDown.add( this.nextFrame, this );
};


state.nextFrame = function (){

	this.player1.animation.nextFrame();
	this.leftCellIndexText.text = "Left Cell Index: " + this.player1.cellIndex;

	this.player2.animation.nextFrame();
	this.rightCellIndexText.text = "Right Cell Index: " + this.player2.cellIndex;
};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'next-frame', state, gameOptions);


