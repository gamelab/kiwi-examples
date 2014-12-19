


var state = new Kiwi.State( 'Play' );

state.preload = function () {
	
	this.addImage( 'sprite', './assets/img/logo/heart.png' );

};

state.create = function () {

	this.group = new Kiwi.Group( this );
	this.addChild( this.group );

	this.spriteWidth = 47;
	this.spriteHeight = 47;

	for ( var i = 0; i < 175; i ++ ){
		var randX = Math.random() * ( this.game.stage.width - this.spriteWidth ),
			randY = Math.random() * ( this.game.stage.height - this.spriteHeight );

		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.sprite, randX, randY );

		// Set an inital alpha for the sprite.
		tempSprite.alpha = Math.random();

		// Set the rate at which the alpha will change. From 0.001 to 0.021.
		tempSprite.alphaStep = Math.random() * 0.02 + 0.001;

		// Add sprite to group.
		this.group.addChild( tempSprite );
	}
	
	this.wobble = 0.4;
	this.wobbleSpeed = 0.005;
   
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );

	// Adjusting the rotation of the hearts.
	if ( this.wobble <= 0 || this.wobble >= 0.4 ){
		this.wobbleSpeed *= -1;
	}
	this.wobble += this.wobbleSpeed;

	// Calls the forEach method on 'this.group'. Passing custom parameters in the third parameter.
	this.group.forEach( this, this.changeAlpha, [ this.wobble ] );
};


state.changeAlpha = function ( sprite, wobble ) {

	if( sprite.alpha >= 1 || sprite.alpha <= 0 ){

		// Reverses the direction of the alphaStep.
		sprite.alphaStep *= -1;
	}
	sprite.alpha += sprite.alphaStep;
	sprite.rotation = wobble;
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'ForEach', state, gameOptions);


