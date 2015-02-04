var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime/girl-sheet-catgirl-3.png', 150, 117);

};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);

	/*
	* Adding the 'run' animation to the animation component of the sprite. 
	* Param 1: Name.
	* Param 2: cells of texture atlas.
	* Param 3: Speed of animation.
	* Param 4: Loop animation boolean.
	* Param 5: Play this animation.
	*/ 
	this.player.animation.add( 'run', [  01, 02, 03, 04, 05, 06 ], 0.1, true, false );

	this.addChild(this.player);

	this.game.input.mouse.onDown.add( this.mouseClicked, this );



  
};

state.mouseClicked = function () {
	this.player.animation.play( 'run' );

}




var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'PlayAnimation', state, gameOptions);


