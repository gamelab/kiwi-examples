var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet( 'sprite', './assets/img/anime/girl-sheet-catgirl-3.png', 150, 118 );
};

state.create = function () {
	this.sprite1 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 175, 150);
	this.addChild(this.sprite1);

	this.sprite2 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 300, 150);
	this.addChild(this.sprite2);

	this.sprite3 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 425, 150);
	this.addChild(this.sprite3);

	this.sprite1.rotation = 0;
	this.sprite2.rotation = Math.PI * 0.5;
	this.sprite3.rotation = Math.PI;

	
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Rotation', state, gameOptions);


