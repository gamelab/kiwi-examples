var state = new Kiwi.State('Play');

state.create = function () {

	this.text1 = new Kiwi.GameObjects.Textfield( this, "TRY KIWIJS NOW!", 50, 50, "#9900FF", 32, 'normal', 'impact' );
	this.text1.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	this.myFontSize = 100;

	this.text1.fontSize = this.myFontSize + "";

	this.text1.x = this.game.stage.width * 0.5;
	this.text1.y = this.game.stage.height * 0.5 - this.myFontSize * 0.5;

	this.text1.anchorPointY = this.myFontSize * 0.5;
	this.addChild( this.text1 );

	this.myScale = 1;
	this.myScaleStep = 0.025;

	this.rotationStep = Math.PI * 0.01;

	this.group = new Kiwi.Group ( this );
	this.addChild( this.group );

	for ( var i = 0; i < 4; i ++ ){
		var text = new Kiwi.GameObjects.Textfield ( this, "TRY KIWIJS NOW!", i * 300, 10, '#fff' );
		this.group.addChild( text );
	}

	this.textMoveLeftSpeed = 2;

}

state.update = function () {

	if (this.myScale < 0.1 || this.myScale > 1 ){
		this.myScaleStep *= -1;
	}

	this.text1.scaleX = this.myScale;
	this.text1.scaleY = this.myScale;

	this.myScale += this.myScaleStep;

	this.text1.rotation += this.rotationStep;

	this.group.forEach( this, this.moveText );
	this.changeBackgroundColor();
}

state.moveText = function ( sprite ) {

	sprite.x -= this.textMoveLeftSpeed;

	if( sprite.x < -300 ){
		sprite.x = 300 * ( this.group.numChildren() - 1 );
	}

}

//Changes the background color of the stage
state.changeBackgroundColor = function() {

	//We set the RGB channels to a sin wave based on the current time elapsed.
	// This is so that if you pause the clock and then resume it the color will stop changing naturally
	// also we are use variances in each channel to get different colors. 
	var rgb = { 	
		r: Math.round((0.5 + 0.49 * Math.sin( this.game.time.clock.elapsed() * 1) ) * 255),
		g: Math.round((0.5 + 0.49 * Math.sin( this.game.time.clock.elapsed() * 1.31) ) * 255), 
		b: Math.round((0.5 + 0.49 * Math.sin( this.game.time.clock.elapsed() * 1.157 ) ) * 255)
	};

	console.log(rgb);

	this.game.stage.rgbColor = rgb;  
	
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Text Transform', state, gameOptions);


