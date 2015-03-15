var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet('player', './assets/img/anime/catgirl.png', 150, 117);
}

state.create = function () {

	// This sprite will be given two animations "Run" and "Crouch" that 
	// the sprite will switch between once it has reached 20 frames played.
	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);

	this.player.animation.add( 'run', [  1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.player.animation.add( 'crouch', [  7, 8 ], 0.1, true );
	this.player.animation.play( 'run' );

	// Create four animation events that will fire this corresponding function on
	// the stopping, changing of frame, playing, and update of a Sprites animation.
	this.player.animation.onStop.add(this.stoppedAnimation, this);
	this.player.animation.onChange.add(this.changedAnimation, this);
	this.player.animation.onPlay.add(this.playedAnimation, this);
	this.player.animation.onUpdate.add(this.updatedAnimation, this);

	this.addChild(this.player);


	// Variables to keep track of the frames played and the times the sprites animation has changed.
	this.counter = 0;
	this.timesChanged = 0;

	//Create the text to keep track of the animation
	this.playedText = new Kiwi.GameObjects.Textfield( this, "Current Animation: run", 15, 15, '#000', 20 );
	this.stoppedText = new Kiwi.GameObjects.Textfield( this, "Last Animation: crouch", 15, 50, '#000', 20 );
	this.updateText = new Kiwi.GameObjects.Textfield( this, "FramesPlayed: 0", 15, 85, '#000', 20 );
	this.changedText = new Kiwi.GameObjects.Textfield( this, "Times Changed: 0", 15, 120, '#000', 20 );

	this.addChild( this.playedText );
	this.addChild( this.stoppedText );
	this.addChild( this.updateText );
	this.addChild( this.changedText );

  
}


// This function runs only when an animation has changed frame. It will
// increment the variable keeping track of the frames played by one.
state.changedAnimation = function ( name, object ) {
	this.timesChanged += 1;
	this.changedText.text = "Times Changed: " + this.timesChanged; 
  
}


// This function runs when a new animation has been played. 
// It resets the frame counter variable and updates the TextField.
state.playedAnimation = function ( object ) {
	this.counter = 0;
	this.playedText.text = "Current Animation: " + object.name; 
  
}


// This function gets called when an animation has stopped playing.
state.stoppedAnimation = function ( currAnimation ) {
	this.stoppedText.text = "Last Animation: " + currAnimation.name; 
	if ( this.player.animation.currentAnimation.name == 'run' ) {
		this.player.animation.play( 'crouch' );
	} else {
		this.player.animation.play( 'run' );
	}

}


// This function is called any time that the animation components cellIndex has been updated.
state.updatedAnimation = function () {
	this.counter += 1;
	this.updateText.text = "Frames Played: " + this.counter; 

	if ( this.counter >= 20 ){
		this.player.animation.stop();
	}

}



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Animation Events', state, gameOptions);


