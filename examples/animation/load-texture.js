var state = new Kiwi.State('Play');

state.preload = function () {
    
    // Adding multiple textures with the sametexture atlas layout. This allows for seemless atlas switching.
    this.addSpriteSheet('princess', './assets/img/anime/girl-sheet-princess-3.png', 150, 117);
    this.addSpriteSheet('monster', './assets/img/anime-monsters/squid-sheet.png', 150, 117);

};

state.create = function () {

	// This sprite will be the one that changes texture on the fly.
	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.princess, 275, 150);
	this.player.animation.add( 'run', [  01, 02, 03, 04, 06 ], 0.1, true, true );
	this.addChild(this.player);

	// Adding mouseClicked function to the mouse component of the input. This will fire when the mouse is pressed.
	this.game.input.mouse.onDown.add( this.mouseClicked, this );
};

state.mouseClicked = function () {

	// Switches the atlas of the this.player sprite to the non current atlas.
	if( this.player.atlas === this.textures.princess ){
		this.player.atlas = this.textures.monster;
	} else {
		this.player.atlas = this.textures.princess;
	}
}



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'LoadTexture', state, gameOptions);


