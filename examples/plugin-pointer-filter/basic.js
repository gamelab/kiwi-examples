var gameOptions = {},
	MyGame = {};

MyGame.game = new Kiwi.Game( "game-container", "game", null, gameOptions );

MyGame.state = new Kiwi.State( "state" );

MyGame.state.preload = function() {
	Kiwi.State.prototype.preload.call(this);
};

MyGame.state.create = function() {

	var moveDefault;

	// Add primitives
	this.pointer = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 10,
		height: 10,
		drawStroke: false,
		color: [ 1, 0, 0 ]
	});
	this.featurelessSquare = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 100,
		height: 100,
		drawStroke: false,
		color: [ 0, 0, 0 ],
		enableInput: true,
		x: this.game.stage.width * 0.1
	} );
	this.featurelessSquare.input.onDown.add( (function( event ){
		if ( this.featurelessSquare.color[ 0 ] === 0 ) {
			this.featurelessSquare.color = [ 0.75, 0.75, 0.75 ];
		} else {
			this.featurelessSquare.color = [ 0, 0, 0 ];
		}
	}).bind( this ) );

	// Add pointer feedback text
	this.textPos = this.text = new Kiwi.GameObjects.Textfield( this,
		"Pointer",
		this.game.stage.width * 0.1, this.game.stage.height / 2,
		"#aaa", 72 );
	this.textPos.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT;
	this.textInstruct = this.text = new Kiwi.GameObjects.Textfield( this,
		"Click square to toggle color",
		this.game.stage.width * 0.1, this.game.stage.height * 0.25,
		"#aaa", 36 );
	this.textInstruct.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_LEFT;


	// Do filtering on mouse
	// Note that these filter methods execute in the scope of the Pointer
	// to which they are attached.
	this.game.pointerFilterMouse = new Kiwi.Plugins.PointerFilter.PointerFilter(
		this.game.input.pointers[ 10 ] );
	this.game.pointerFilterMouse.onMove = function( event ) {
		event.x = this.game.stage.width - event.x;
		event.y = this.game.stage.height - event.y;
	};
	this.game.pointerFilterMouse.filterMove = true;
	this.game.pointerFilterMouse.onStart = function( event ) {
		console.log( "Pointer Start" );
	};
	this.game.pointerFilterMouse.filterStart = true;
	this.game.pointerFilterMouse.onStop = function( event ) {
		console.log( "Pointer Stop" );
	};
	this.game.pointerFilterMouse.filterStop = true;
	this.game.pointerFilterMouse.onWheel = function( event ) {
		console.log( "Pointer Wheel" );
	};
	this.game.pointerFilterMouse.filterWheel = true;


	Kiwi.State.prototype.create.call(this);

	this.addChild( this.featurelessSquare );
	this.addChild( this.textPos );
	this.addChild( this.textInstruct );
	this.addChild( this.pointer );
};

MyGame.state.update = function() {

	Kiwi.State.prototype.update.call( this );

	this.textPos.text = "Pointer " + MyGame.game.input.mouse.x +
		", " + MyGame.game.input.mouse.y;

	// Interactive pointer
	this.pointer.x = MyGame.game.input.mouse.x;
	this.pointer.y = MyGame.game.input.mouse.y;
};

MyGame.game.states.addState( MyGame.state );
MyGame.game.states.switchState( "state" );
