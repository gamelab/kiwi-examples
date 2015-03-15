var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime/catgirl.png', 150, 117);

};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.addChild(this.player);


	// Sprites can have multiple animation.
	// Simply add as many as you want to the sprites animation component.
	this.player.animation.add( 'idle', [ 0 ], 0.1, false );
	this.player.animation.add( 'run', [  1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.player.animation.add( 'crouch', [  7, 8 ], 0.1, true );
	this.player.animation.play( 'run' );


	this.currentAnimationText = new Kiwi.GameObjects.Textfield( this, "Current Animation: run", 15, 15, '#000', 20 );
	this.addChild( this.currentAnimationText );

	this.game.input.mouse.onDown.add( this.mouseClicked, this );
	this.animationSelect = 0;

}


//When the mouse is clicked increase the animation selected
state.mouseClicked = function () {
	var anim = '';

	//Increase the current animation number
	this.animationSelect += 1;
	if( this.animationSelect > 2 ){
		this.animationSelect = 0;
	}

	//Select the name corresponding to that number
	switch ( this.animationSelect ) {
		case 0:
			anim = 'run';
			break;
		case 1:
			anim = 'idle';
			break;
		case 2:
			anim = 'crouch';
			break;
		default:
			anim = 'run';
	}


	// Play the animation by the name selected
	this.player.animation.play( anim );
	this.currentAnimationText.text = "Current Animation: " + this.player.animation.currentAnimation.name;

}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Multiple Animation', state, gameOptions);


