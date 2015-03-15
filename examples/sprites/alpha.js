var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet( 'sprite', './assets/img/anime/catgirl.png', 150, 117 );
}

state.create = function () {
	this.sprite1 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 175, 150);
	this.addChild(this.sprite1);

	this.sprite2 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 300, 150);
	this.addChild(this.sprite2);

	this.sprite3 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 425, 150);
	this.addChild(this.sprite3);



	// Changes the Alpha property of the three sprites.
	this.sprite1.alpha = 1;
	this.sprite2.alpha = 0.5;
	this.sprite3.alpha = 0.25;
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Alpha', state, gameOptions);


