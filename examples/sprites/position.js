var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet( 'sprite', './assets/img/anime-monsters/squid-sheet.png', 150, 117 );
};

state.create = function () {
	this.sprite1 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 0, 0);
	this.addChild(this.sprite1);

	this.sprite2 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 0, 0);
	this.addChild(this.sprite2);

	this.sprite3 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 0, 0);
	this.addChild(this.sprite3);


	// This sprite will not appear in the middle because positions are taken from the top left corner of the sprite.
	this.sprite1.x = this.game.stage.width * 0.5;
	this.sprite1.y = this.game.stage.height * 0.5;

	this.sprite2.x = 150;
	this.sprite2.y = -50;

	this.sprite3.x = 500;
	this.sprite3.y = 200;

	
};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Position', state, gameOptions);


