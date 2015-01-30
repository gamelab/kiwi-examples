var state = new Kiwi.State('Play');

state.preload = function () {
    
    // Adds SpriteSheet to the loader queue.
    this.addSpriteSheet('player', './assets/img/anime/girl-sheet-catgirl-3.png', 150, 117);

};

state.create = function () {

	// Adds sprite to stage. This is not needed in order to load a SpriteSheet.
	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'run', [  01, 02, 03, 04, 05, 06 ], 0.1, true, false );
	this.addChild(this.player);
	this.player.animation.play( 'run' );
  
};

state.mouseClicked = function () {

}




var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'PlayAnimation', state, gameOptions);


