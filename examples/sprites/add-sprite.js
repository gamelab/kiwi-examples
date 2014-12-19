var state = new Kiwi.State('Play');

state.preload = function () {
    this.addImage( 'shield', './assets/img/logo/shield.png' );
};

state.create = function () {
	this.sprite = new Kiwi.GameObjects.Sprite(this, this.textures.shield, 275, 150);
	this.addChild(this.sprite);
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'AddSprite', state, gameOptions);


