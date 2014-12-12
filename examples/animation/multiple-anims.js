var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime/girl-sheet-catgirl-3.png', 150, 117);

};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);

	this.player.animation.add( 'idle', [ 0 ], 0.1, false );
	this.player.animation.add( 'run', [  01, 02, 03, 04, 06 ], 0.1, true );
	this.player.animation.add( 'crouch', [  07, 08 ], 0.1, true );
	this.player.animation.play( 'run' );

	this.addChild(this.player);

	this.currentAnimationText = new Kiwi.GameObjects.Textfield( this, "Current Animation: run", 15, 15 );

	this.addChild( this.currentAnimationText );

	this.game.input.mouse.onDown.add( this.mouseClicked, this );

	this.animationSelect = 0;


  
};

state.mouseClicked = function () {
	var anim = '';

	this.animationSelect += 1;
	if( this.animationSelect > 2 ){
		this.animationSelect = 0;
	}

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

	this.player.animation.play( anim );

	this.currentAnimationText.text = "Current Animation: " + this.player.animation.currentAnimation.name;

}




var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'MultipleAnimation', state, gameOptions);


