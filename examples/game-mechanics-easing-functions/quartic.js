var state = new Kiwi.State('Play');

state.preload = function () {
	this.game.stage.color = "#4488cc";
};

state.create = function () {

	// Create static properties for start and end positions.
	this.TOP_Y = 100;
	this.BOTTOM_Y = this.game.stage.height - 100;

	this.START_X = 0;
	this.FINISH_X = this.game.stage.width;

	 this.TWEEN_TIME = 2500;

	// Setup text object to show the name of the active easing function.
	this.easingFunctionName = new Kiwi.GameObjects.Textfield( this, "", 25, 25, "#ffffff", 16 );
	this.addChild ( this.easingFunctionName );

	this.position = new Kiwi.Geom.Point( this.START_X, this.TOP_Y );
	
	
	// Define the tweening functions we'll toggle between.
	this.tweenFunctions = [
		{ name: "Quartic In", ease: Kiwi.Animations.Tweens.Easing.Quartic.In },
		{ name: "Quartic Out", ease: Kiwi.Animations.Tweens.Easing.Quartic.Out },
		{ name: "Quartic InOut", ease: Kiwi.Animations.Tweens.Easing.Quartic.InOut }
	]

	// Create background lines.
	this.createLines();

	// Create ball the will display the position of the tween.
	this.createEllipse ();

	// Setup group to display the trajectory of the ball.
	this.dotGroup = new Kiwi.Group ( this );
	this.addChild ( this.dotGroup );

	// Setup interval that will draw dots on stage.
	this.game.time.clock.setInterval ( this.drawDot, 50, this );

	// Add toggle ease callback on mouse input object.
	this.game.input.mouse.onDown.add ( this.toggleEase, this );

	// Start the tweens.
	this.toggleEase();

	 

};

state.toggleEase = function () {
	this.game.tweens.removeAll();

	this.position.x = this.START_X;
	this.position.y = this.TOP_Y;

	// Switch to the next easing function.
	this.currentEase = ( this.currentEase + 1 ) % this.tweenFunctions.length || 0;
	var easingFunction = this.tweenFunctions[this.currentEase].ease;
    var easingName = this.tweenFunctions[this.currentEase].name;

    // Clear the paths drawn on the screen.
	this.dotGroup.clear();

	// Display the name of the easing function.
	this.easingFunctionName.text = easingName;

	// Move the ball vertically by the easing function.
	this.tweenY = this.game.tweens.create( this.position );
    this.tweenY.to( { y: this.BOTTOM_Y } , this.TWEEN_TIME, easingFunction, true );
    this.tweenY.start();

    	// Move the ball linearly across the screen.
    this.tweenX = this.game.tweens.create( this.position );
    this.tweenX.to( { x: this.FINISH_X } , this.TWEEN_TIME, Kiwi.Animations.Tweens.Easing.Linear.In, true );
    this.tweenX.start();

    this.tweenX.onComplete( this.loopTween, this );



};

state.loopTween = function () {
	this.position.x = this.START_X;
	this.position.y = this.TOP_Y;

	this.tweenX.start();
	this.tweenY.start();
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );

	this.ellipse.x = this.position.x - 20;
	this.ellipse.y = this.position.y - 20;
}

var gameOptions = {
	width: 768,
	height: 512
};

state.drawDot = function () {
		var params = {
			state: this,
			width: 2,
			height: 2,
			x: this.position.x - 1,
			y: this.position.y - 1,
			drawStroke: false,
			color: [ 1.0, 1.0, 1.0 ]
		};
		var dot = new Kiwi.Plugins.Primitives.Rectangle( params );
		this.dotGroup.addChild ( dot );
}

state.createEllipse = function () {

	var params = {
		state: this,
		width: 40,
		height: 40,
		x: 0,
		y: 0,
		drawStroke: false,
		color: [ 1.0, 1.0, 1.0 ]
	};
	this.ellipse = new Kiwi.Plugins.Primitives.Ellipse( params );
	this.addChild( this.ellipse );

}

state.createLines = function () {
	var params = {
		state: this,
		x: 0,
		y: 0,
		strokeColor: [ 1.0, 1.0, 1.0 ],
		strokeWidth: 1,
		points: [ [ this.START_X, this.TOP_Y ], [ this.FINISH_X, this.TOP_Y ] ]
	};
	this.topLine = new Kiwi.Plugins.Primitives.Line( params );
	this.addChild ( this.topLine );

	params = {
		state: this,
		x: 0,
		y: 0,
		strokeColor: [ 1.0, 1.0, 1.0 ],
		strokeWidth: 1,
		points: [ [ this.START_X, this.BOTTOM_Y ], [ this.FINISH_X, this.BOTTOM_Y ] ]
	};
	this.botLine = new Kiwi.Plugins.Primitives.Line( params );
	this.addChild ( this.botLine );
}

var game = new Kiwi.Game('game-container', 'Quartic', state, gameOptions);


