var gameOptions = {
		plugins: [ "PointerLock" ]
	},
	MyGame = {};

MyGame.game = new Kiwi.Game( "game-container", "game", null, gameOptions );



MyGame.state = new Kiwi.State( "state" );

MyGame.state.preload = function() {
	Kiwi.State.prototype.preload.call(this);
};

MyGame.state.create = function() {

	var runOnMouseMove,
		stateSelf = this;

	// Add a black square to the stage
	this.featurelessSquare = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 100,
		height: 100,
		drawStroke: false,
		color: [ 0, 0, 0 ]
	} );

	// Demo pointer delta display
	this.text = this.text = new Kiwi.GameObjects.Textfield( this,
		"Deltas",
		this.game.stage.width / 2, this.game.stage.height / 2,
		"#aaa", 144 );
	this.text.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;


	// Custom callback
	// Note that this is in the scope of the PointerLock object.
	runOnMouseMove = function() {
		var square = stateSelf.featurelessSquare,
			squareVel = 5;

		// Display mouse deltas
		stateSelf.text.text = this.movementX + ", " + this.movementY;

		// Move featureless black square
		square.x += this.movementX * squareVel;
		square.y += this.movementY * squareVel;
		if ( square.x < -square.width ) {
			square.x = stateSelf.game.stage.width + square.width;
		}
		if ( square.x > stateSelf.game.stage.width + square.width ) {
			square.x = -square.width;
		}
		if ( square.y < -square.height ) {
			square.y = stateSelf.game.stage.height + square.height;
		}
		if ( square.y > stateSelf.game.stage.height + square.height ) {
			square.y = -square.height;
		}
	};


	// Create pointer lock manager.
	// Note that we create this on the game.
	MyGame.game.pointerLock = new Kiwi.Plugins.PointerLock.PointerLock( {
		game: MyGame.game,
		runOnMouseMove: runOnMouseMove,
		trackWhileUnlocked: false
	} );


	Kiwi.State.prototype.create.call(this);

	this.addChild( this.text );
	this.addChild( this.featurelessSquare );
};

MyGame.game.states.addState( MyGame.state );
MyGame.game.states.switchState( "state" );
