var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet('player', './assets/img/anime/catgirl.png', 150, 117);
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'run', [  1, 2, 3, 4, 5, 6 ], 0.1, true, false );
	this.addChild(this.player);

	// Enables the player to be dragged.
	this.player.input.enableDrag();
	this.player.input.onDragStarted.add( this.startedDrag, this );
	this.player.input.onDragStopped.add( this.stoppedDrag, this );

}

state.startedDrag = function () {
	this.player.animation.play( 'run' );
}

state.stoppedDrag = function() {
	this.player.animation.switchTo('default');
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Drag Sprite', state, gameOptions);


