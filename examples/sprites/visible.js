var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet( 'sprite', './assets/img/anime/girl-sheet-princess-3.png', 150, 117 );
};

state.create = function () {
	this.sprite1 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 175, 150);
	this.addChild(this.sprite1);

	this.sprite2 = new Kiwi.GameObjects.Sprite(this, this.textures.sprite, 300, 150);
	this.addChild(this.sprite2);

	this.sprite1.visible = true;
	this.sprite2.visible = false;

	this.game.input.mouse.onDown.add( this.mouseDown, this );
};

state.mouseDown = function () {
	this.sprite1.visible = !this.sprite1.visible;
	this.sprite2.visible = !this.sprite2.visible;

}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Alpha', state, gameOptions);


