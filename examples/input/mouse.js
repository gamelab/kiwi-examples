var state = new Kiwi.State('Play');


state.create = function () {

	this.setupUpMouse( 15, 15 );

	this.ondownCount = 0;
	this.onReleasedCount = 0;
	this.onUpCount = 0;	

	this.wheelCount = 0;



  
};



state.update = function () {
	Kiwi.State.prototype.update.call( this );

	this.xText.text = "x: " + Math.round ( this.game.input.x * 10 ) / 10;
	this.yText.text = "y: " + Math.round ( this.game.input.y * 10 ) / 10;



	this.isDownText.text = "isDown: " + this.game.input.isDown;

	this.onDownText.text = "onDown Count: " + this.ondownCount;
	this.onUpText.text = "onUp Count: " + this.onUpCount;

	this.onWheelText.text = "onWheel Count: " + this.wheelCount;

	this.wheelDeltaXText.text = "Mouse Wheel Delta X: " + this.game.input.mouse.wheelDeltaX;
	this.wheelDeltaYText.text = "Mouse Wheel Delta Y: " + this.game.input.mouse.wheelDeltaY;
};

state.onDown = function () {
	this.ondownCount += 1;

};

state.onReleased = function () {
	this.onReleasedCount += 1;
	
};

state.onUp = function () {
	this.onUpCount += 1;
	
};

state.onWheel = function () {
	this.wheelCount += 1;
	
};




state.setupUpMouse = function ( x, y ){
	this.title = new Kiwi.GameObjects.Textfield( this, 'InputManager', x, y + 0, '#000000', 16 );
	this.addChild( this.title );

	// x
	this.xText = new Kiwi.GameObjects.Textfield( this, 'x: ', x, y + 20, '#000000', 16 );
	this.addChild( this.xText );

	// y
	this.yText= new Kiwi.GameObjects.Textfield( this, 'y: ', x, y + 40, '#000000', 16  );
	this.addChild( this.yText );

	// isDown
	this.isDownText = new Kiwi.GameObjects.Textfield( this, 'isDown: ', x, y + 60, '#000000', 16  );
	this.addChild( this.isDownText );

	// onDown
	this.onDownText = new Kiwi.GameObjects.Textfield( this, 'onDown: ', x, y + 80, '#000000', 16  );
	this.addChild( this.onDownText );


	// onUp
	this.onUpText = new Kiwi.GameObjects.Textfield( this, 'onUp: ', x, y + 100, '#000000', 16  );
	this.addChild( this.onUpText );

	// mouseWheel
	this.onWheelText = new Kiwi.GameObjects.Textfield( this, 'onWheel Count: ', x, y + 120, '#000000', 16  );
	this.addChild( this.onWheelText );

	// wheelDeltaX
	this.wheelDeltaXText = new Kiwi.GameObjects.Textfield( this, 'wheelDeltaX: ', x, y + 140, '#000000', 16  );
	this.addChild( this.wheelDeltaXText );

	// wheelDeltaY
	this.wheelDeltaYText = new Kiwi.GameObjects.Textfield( this, 'wheelDeltaY: ', x, y + 160, '#000000', 16  );
	this.addChild( this.wheelDeltaYText );

	this.game.input.mouse.onDown.add( this.onDown, this );
	this.game.input.mouse.onUp.add( this.onUp, this );

	this.game.input.mouse.onWheel.add( this.onWheel, this );
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Mouse', state, gameOptions);


