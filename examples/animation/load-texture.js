var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('princess', './assets/img/anime/girl-sheet-princess-3.png', 150, 117);
    this.addSpriteSheet('monster', './assets/img/anime-monsters/squid-sheet.png', 150, 117);

};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.princess, 275, 150);

	this.player.animation.add( 'run', [  01, 02, 03, 04, 06 ], 0.1, true, true );

	this.addChild(this.player);

	this.game.input.mouse.onDown.add( this.mouseClicked, this );
};

state.mouseClicked = function () {

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


