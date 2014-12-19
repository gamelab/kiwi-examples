var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet( 'sprite', './assets/img/solar-system/earth.png', 110, 110 );
};

state.create = function () {
	this.sprite1 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 175, 150);
	this.addChild(this.sprite1);

	this.sprite2 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 300, 150);
	this.addChild(this.sprite2);

	this.sprite2.scaleX = 0.5;

	this.sprite3 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 425, 150);
	this.addChild(this.sprite3);

	this.sprite3.scaleY = 0.5;


	
};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Scale', state, gameOptions);


