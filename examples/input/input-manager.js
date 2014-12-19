var state = new Kiwi.State('Play');


state.create = function () {

	this.setupUpManager( 15, 15 );



	

	this.game.input.onDown.add( this.onDown, this );
	this.game.input.onReleased.add( this.onReleased, this );
	this.game.input.onUp.add( this.onUp, this );

	this.ondownCount = 0;
	this.onReleasedCount = 0;
	this.onUpCount = 0;	



  
};



state.update = function () {
	Kiwi.State.prototype.update.call( this );

	this.xText.text = "x: " + Math.round ( this.game.input.x * 10 ) / 10;
	this.yText.text = "y: " + Math.round ( this.game.input.y * 10 ) / 10;



	this.isDownText.text = "isDown: " + this.game.input.isDown;

	this.onDownText.text = "onDown Count: " + this.ondownCount;
	this.onReleasedText.text = "onReleased Count: " + this.onReleasedCount;
	this.onUpText.text = "onUp Count: " + this.onUpCount;
}

state.onDown = function () {
	this.ondownCount += 1;

}

state.onReleased = function () {
	this.onReleasedCount += 1;
	
}

state.onUp = function () {
	this.onUpCount += 1;
	
}




state.setupUpManager = function ( x, y ){
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

	// onReleased
	this.onReleasedText = new Kiwi.GameObjects.Textfield( this, 'onReleased: ', x, y + 100, '#000000', 16  );
	this.addChild( this.onReleasedText );

	// onUp
	this.onUpText = new Kiwi.GameObjects.Textfield( this, 'onUp: ', x, y + 120, '#000000', 16  );
	this.addChild( this.onUpText );
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'InputManager', state, gameOptions);


