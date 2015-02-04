var state = new Kiwi.State('Play');

state.preload = function () {
	this.addImage( 'background', 'assets/img/plugins/fullscreen/background.jpg' );	
	this.addImage( 'button', 'assets/img/plugins/fullscreen/fullscreen-button.png' );
	this.addSpriteSheet( 'fox', 'assets/img/plugins/fullscreen/fox.png', 150, 117 );
};

state.create = function () {
	//Background 
	this.background = new Kiwi.GameObjects.Sprite( this, this.textures.background );
	this.addChild( this.background );


	//The fox sprite
	this.fox = new Kiwi.GameObjects.Sprite( this, this.textures.fox, 0, 0 );
	this.fox.x = (this.game.stage.width - this.fox.width) * 0.5;
	this.fox.y = this.game.stage.height - this.fox.height * 1.55;
	this.addChild( this.fox );


	//Animations for the fox
	this.fox.animation.add( 'run', [ 1, 2, 3, 4, 5, 6 ], 0.05, true );
	this.fox.animation.add( 'idle', [ 0 ], 0.1, false );
	this.fox.animation.add( 'crouch', [ 7 ], 0.1, true );
	this.fox.animation.add( 'jump', [ 9, 10 ], 0.5, false );


	//Create the fullscreen button. Only should appear if the game isn't fullscreen
	this.button = new Kiwi.GameObjects.Sprite( this, this.textures.button, 0, 0 );
	this.button.x = (this.game.stage.width - this.button.width) * 0.5; 
	this.button.y = this.game.stage.height - this.button.height - 20;
	this.addChild( this.button );


	//Add toggle events here
	this.game.fullscreen.onEnter.add( this.fullscreenEnabled, this );
	this.game.fullscreen.onLeave.add( this.fullscreenNotEnabled, this );

	this.fullscreenNotEnabled();
};

//This method is executed each time the game becomes fullscreen.
state.fullscreenEnabled = function() {

	//Hide the button and change the game scale type.
	this.button.visible = false;
	this.game.stage.scaleType = Kiwi.Stage.SCALE_FIT;
	this.game.input.onUp.remove(this.buttonHitCheck, this);
}

//Executed each time the game leaves fullscreen.
state.fullscreenNotEnabled = function() {

	//Show the button, reset the scale and add the input event.
	this.button.visible = true;
	this.fox.animation.play('crouch');
	this.game.stage.scaleType = Kiwi.Stage.SCALE_NONE;
	this.game.input.onUp.add(this.buttonHitCheck, this);
}


//Mouse Event. Used when the game is not fullscreen.
state.buttonHitCheck = function( x, y ) {

	if( this.button.box.hitbox.contains(x, y) ) {
		this.game.fullscreen.launchFullscreen();
	}

}

//Update method to make the fox move.
	state.update = function() {

	//Call states regular update loop
	Kiwi.State.prototype.update.call( this );


	//Check to see if the game is fullscreen
	if ( this.game.fullscreen.isFullscreen ) {


		if( this.game.input.keyboard.isDown( Kiwi.Input.Keycodes.DOWN ) ) {
			this.fox.animation.play( 'crouch', false );
			return;
		}


		if( this.game.input.keyboard.isDown( Kiwi.Input.Keycodes.LEFT ) ) {
			this.fox.animation.play( 'run', false );
			this.fox.x -= 5 * this.game.time.rate;
			this.fox.scaleX = -1;

		} else if( this.game.input.keyboard.isDown( Kiwi.Input.Keycodes.RIGHT ) ) {
			this.fox.animation.play( 'run' , false );
			this.fox.x += 5 * this.game.time.rate;
			this.fox.scaleX = 1;

		} else {
			this.fox.animation.play( 'idle' );
		}

	}

}
var gameOptions = {
	plugins: [ 'Fullscreen' ],
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'FullscreenWithKeyboard', state, gameOptions);


