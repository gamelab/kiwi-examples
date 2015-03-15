var state = new Kiwi.State('Play');

state.preload = function () {
    this.addImage( 'shield', './assets/img/logo/shield.png' );
    this.addImage( 'heart', './assets/img/logo/heart.png' );
}

state.create = function () {
	this.sprite1 = new Kiwi.GameObjects.Sprite(this, this.textures.shield, 275, 150);
	this.addChild(this.sprite1);

	this.sprite2 = new Kiwi.GameObjects.Sprite(this, this.textures.heart, 450, 150);
	this.addChild(this.sprite2);

	this.game.input.mouse.onUp.add( this.mouseUp, this );
}

state.mouseUp = function () {
	// On mouse click it will remove sprite1 and sprite2 from the game in different ways.
	this.sprite1.exists = false;
	this.sprite2.destroy();
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Remove Sprite', state, gameOptions);


