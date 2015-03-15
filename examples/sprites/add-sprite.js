var state = new Kiwi.State('Play');

state.preload = function () {
	// Adds texture atlas for the sprite to use
    this.addImage( 'shield', './assets/img/logo/shield.png' );
}

state.create = function () {

	/*
	* Creaing a Kiwi.GameObjects.Sprite and storing it in 'this.sprite'. 
	* Param 1: The state that the Sprite belongs to.
	* Param 2: Texture atlas of the sprite.
	* Param 3: x position.
	* Param 4: y position.
	*/
	this.sprite = new Kiwi.GameObjects.Sprite(this, this.textures.shield, 275, 150);
	this.addChild(this.sprite);
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Add Sprite', state, gameOptions);


