var state = new Kiwi.State("Play");

state.preload = function () {
	this.addSpriteSheet( "square", "./assets/img/shapes/square.png", 70, 70 );
	this.addSpriteSheet( "circle", "./assets/img/shapes/circle.png", 70, 70 );
};

state.create = function () {

	this.mouse = this.game.input.mouse;

	this.squareIntersect = new Kiwi.GameObjects.Sprite( this, this.textures.square, 100, 100 );
	this.addChild( this.squareIntersect );

	this.circleIntersect = new Kiwi.GameObjects.Sprite( this, this.textures.circle, 100, 300 );
	this.addChild( this.circleIntersect );
	this.circleIntersect.circleGeom = new Kiwi.Geom.Circle( this.circleIntersect.x + this.circleIntersect.width * 0.5, this.circleIntersect.y + this.circleIntersect.height * 0.5, 70 );

	this.mySquareCursor = new Kiwi.GameObjects.Sprite( this, this.textures.square, -100, -100 );
	this.addChild( this.mySquareCursor );

	console.log( this.mySquareCursor.width * this.mySquareCursor.scaleX );

	this.myCircleCursor = new Kiwi.GameObjects.Sprite( this, this.textures.circle, -100, -100 );
	this.addChild( this.myCircleCursor );
	this.moveCursor();

	this.game.input.mouse.onUp.add( this.toggleCursor, this );
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );

	var squareIntersected = Kiwi.Geom.Intersect.rectangleToRectangle( this.mySquareCursor.box.bounds, this.squareIntersect.box.bounds );
	var circleIntersected = Kiwi.Geom.Intersect.circleToRectangle( this.circleIntersect.circleGeom, this.mySquareCursor.box.bounds );

	if( squareIntersected.result ){
		this.squareIntersect.cellIndex = 2;
	} else {
		this.squareIntersect.cellIndex = 0;
	}

	if( circleIntersected.result ){
		this.circleIntersect.cellIndex = 2;
	} else {
		this.circleIntersect.cellIndex = 0;
	}

	this.moveCursor();
};

state.moveCursor = function () {
	this.mySquareCursor.x = this.mouse.x - this.mySquareCursor.width * 0.5;
	this.mySquareCursor.y = this.mouse.y - this.mySquareCursor.height * 0.5;

	this.myCircleCursor.x = this.mouse.x - this.myCircleCursor.width * 0.5;
	this.myCircleCursor.y = this.mouse.y - this.myCircleCursor.height * 0.5;
};

state.toggleCursor = function () {

	if ( this.mySquareCursor.visible ) {
		this.mySquareCursor.visible = false;
		this.myCircleCursor.visible = true;
	} else {
		this.mySquareCursor.visible = true;
		this.myCircleCursor.visible = false;
	}
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game("game-container", "Rectangle", state, gameOptions);
