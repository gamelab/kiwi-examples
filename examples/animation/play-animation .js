var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('catgirl', './assets/img/anime/catgirl.png', 150, 117);

};

state.create = function () {

	this.catgirl = new Kiwi.GameObjects.Sprite(this, this.textures.catgirl, 275, 150);
	this.addChild(this.catgirl);

	/*
	* Adding the 'run' animation to the animation component of the sprite. 
	* Param 1: Name.
	* Param 2: cells of texture atlas.
	* Param 3: Speed of animation.
	* Param 4: Loop animation boolean.
	* Param 5: Play this animation.
	*/ 
	this.catgirl.animation.add( 'run', [  1, 2, 3, 4, 5, 6 ], 0.1, true, false );

	this.game.input.mouse.onDown.add( this.mouseClicked, this );

}


state.mouseClicked = function () {
	this.catgirl.animation.play( 'run' );
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Play Animation', state, gameOptions);


