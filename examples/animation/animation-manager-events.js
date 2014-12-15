var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime/girl-sheet-catgirl-3.png', 150, 117);

};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);

	this.player.animation.add( 'idle', [ 0 ], 0.1, false );
	this.player.animation.add( 'run', [  01, 02, 03, 04, 05, 06 ], 0.1, true );
	this.player.animation.add( 'crouch', [  07, 08 ], 0.1, true );
	this.player.animation.play( 'run' );

	this.player.animation.onStop.add(this.stoppedAnimation, this);
	this.player.animation.onChange.add(this.changedAnimation, this);
	this.player.animation.onPlay.add(this.playedAnimation, this);
	this.player.animation.onUpdate.add(this.updatedAnimation, this);




	this.addChild(this.player);

	this.counter = 0;
	this.timesChanged = 0;

	this.playedText = new Kiwi.GameObjects.Textfield( this, "Current Animation: run", 15, 15 );
	this.stoppedText = new Kiwi.GameObjects.Textfield( this, "Last Animation: crouch", 15, 50 );
	this.updateText = new Kiwi.GameObjects.Textfield( this, "FramesPlayed: 0", 15, 85 );
	this.changedText = new Kiwi.GameObjects.Textfield( this, "Times Changed: 0", 15, 120 );

	this.addChild( this.playedText );
	this.addChild( this.stoppedText );
	this.addChild( this.updateText );
	this.addChild( this.changedText );

  
};

state.changedAnimation = function ( name, object ) {
	this.timesChanged += 1;
	this.changedText.text = "Times Changed: " + this.timesChanged; 
  
};
state.playedAnimation = function ( object ) {

	this.counter = 0;
	this.playedText.text = "Current Animation: " + object.name; 

  
};
state.stoppedAnimation = function ( currAnimation ) {
	this.stoppedText.text = "Last Animation: " + currAnimation.name; 
	if ( this.player.animation.currentAnimation.name == 'run' ) {
		this.player.animation.play( 'crouch' );
	} else {
		this.player.animation.play( 'run' );
	}


  
};
state.updatedAnimation = function () {
	this.counter += 1;
	this.updateText.text = "Frames Played: " + this.counter; 

	if ( this.counter >= 20 ){
		this.player.animation.stop();
	}


  
};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'AnimationEvents', state, gameOptions);


