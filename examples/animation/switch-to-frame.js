var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('playerSpriteSheet', './assets/img/anime-monsters/snake-sheet.png', 150, 117);
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.playerSpriteSheet, 250, 150);
	this.addChild(this.player);


	this.leftCellIndexText = new Kiwi.GameObjects.Textfield( this, "Cell Index: 0", 15, 15 );
	this.addChild( this.leftCellIndexText );

	this.game.input.mouse.onDown.add( this.nextFrame, this );
};


state.nextFrame = function (){

	var randomFrame = Math.floor( Math.random() * this.player.animation.length );

	this.player.animation.switchTo( randomFrame );
	this.leftCellIndexText.text = "Animation Frame Index: " + this.player.animation.frameIndex;

};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'next-frame', state, gameOptions);


