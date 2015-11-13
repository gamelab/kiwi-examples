var state = new Kiwi.State("Play");

state.preload = function () {
	// Adds texture atlas for the sprite to use
	this.addSpriteSheet( "circle", "./assets/img/shapes/circle.png", 70, 70 );
};

state.create = function () {
	this.mouse = this.game.input.mouse;

	this.horzLine1 = new Kiwi.Geom.Line ( 50, 250, 100, 250 );

	this.vertLine1 = new Kiwi.Geom.Line ( 100, 50, 100, 50 );
	this.vertLine2 = new Kiwi.Geom.Ray ( 250, 50, 250, 50 );
	this.vertLine3 = new Kiwi.Geom.Line ( 400, 50, 400, 50 );

	this.vertText1 = new Kiwi.GameObjects.Textfield( this, "Line Segment.", 110, 50, "#000", 16 );
	this.addChild( this.vertText1 );
	this.vertText2 = new Kiwi.GameObjects.Textfield( this, "Ray.", 260, 50, "#000", 16 );
	this.addChild( this.vertText2 );
	this.vertText3 = new Kiwi.GameObjects.Textfield( this, "Line.", 410, 50, "#000", 16 );
	this.addChild( this.vertText3 );

};

state.update = function () {
	Kiwi.State.prototype.update.call( this );
	this.moveCursor();
	this.checkCollisions();
	this.drawLines();

};

state.checkCollisions = function () {

	this.lineResult1 = Kiwi.Geom.Intersect.lineSegmentToLineSegment (
		this.horzLine1, this.vertLine1 );

	this.lineResult2 = Kiwi.Geom.Intersect.lineSegmentToRay (
		this.horzLine1, this.vertLine2 );

	this.lineResult3 = Kiwi.Geom.Intersect.lineToLineSegment (
		this.vertLine3, this.horzLine1 );
};

state.moveCursor = function () {
	this.horzRightPoint = new Kiwi.Geom.Point( this.mouse.x, 0 );
	this.vertBotPoint = new Kiwi.Geom.Point( 0, this.mouse.y );

	this.horzLine1.x2 = this.horzRightPoint.x; 

	this.vertLine1.y2 = this.vertBotPoint.y;
	this.vertLine2.y2 = this.vertBotPoint.y;
	this.vertLine3.y2 = this.vertBotPoint.y;

};

state.drawLines = function () {

	this.horzDrawLine1 && this.removeChild( this.horzDrawLine1 );
	this.vertDrawLine1 && this.removeChild( this.vertDrawLine1 );
	this.vertDrawLine3 && this.removeChild( this.vertDrawLine2 );
	this.vertDrawLine3 && this.removeChild( this.vertDrawLine3 );

	this.color = [ 1.0, 0, 0 ];

	var params = {
		state: this,
		x: 0,
		y: 0,
		strokeColor: this.color,
		strokeWidth: 3,
		points: [ [ this.horzLine1.x1, this.horzLine1.y1 ], [ this.horzLine1.x2, this.horzLine1.y2 ] ]
	};

	this.horzDrawLine1 = new Kiwi.Plugins.Primitives.Line( params );
	this.addChild( this.horzDrawLine1 );

	if ( this.lineResult1.result ) {
		this.color = [ 0.25, 0.5, 0.25 ];
	} else {
		this.color = [ 1.0, 0, 0 ];
	}

	params = {
		state: this,
		x: 0,
		y: 0,
		strokeColor: this.color,
		strokeWidth: 3,
		points: [ [ this.vertLine1.x1, this.vertLine1.y1 ], [ this.vertLine1.x2, this.vertLine1.y2 ] ]
	};

	this.vertDrawLine1 = new Kiwi.Plugins.Primitives.Line( params );
	this.addChild( this.vertDrawLine1 );

	if ( this.lineResult2.result ) {
		this.color = [ 0.25, 0.5, 0.25 ];
	} else {
		this.color = [ 1.0, 0, 0 ];
	}

	params = {
		state: this,
		x: 0,
		y: 0,
		strokeColor: this.color,
		strokeWidth: 3,
		points: [ [ this.vertLine2.x1, this.vertLine2.y1 ], [ this.vertLine2.x2, this.vertLine2.y2 ] ]
	};

	this.vertDrawLine2 = new Kiwi.Plugins.Primitives.Line( params );
	this.addChild( this.vertDrawLine2 );

	if ( this.lineResult3.result ) {
		this.color = [ 0.25, 0.5, 0.25 ];
	} else {
		this.color = [ 1.0, 0, 0 ];
	}

	params = {
		state: this,
		x: 0,
		y: 0,
		strokeColor: this.color,
		strokeWidth: 3,
		points: [ [ this.vertLine3.x1, this.vertLine3.y1 ], [ this.vertLine3.x2, this.vertLine3.y2 ] ]
	};

	this.vertDrawLine3 = new Kiwi.Plugins.Primitives.Line( params );
	this.addChild( this.vertDrawLine3 );
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game("game-container", "Lines to lines", state, gameOptions);
