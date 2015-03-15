var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('catgirl', './assets/img/anime/catgirl.png', 150, 117);

};

state.create = function () {

	this.catgirl = new Kiwi.GameObjects.Sprite(this, this.textures.catgirl, 275, 150);

	this.catgirl.animation.add( 'run', [ 1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.catgirl.animation.play( 'run' );

	this.addChild( this.catgirl );

	this.game.input.mouse.onDown.add( this.mouseClicked, this );

}


state.mouseClicked = function () {

	// This will stop the animation playing on the 'this.catgirl' sprite.
	this.catgirl.animation.stop();

}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Stop Animation', state, gameOptions);


