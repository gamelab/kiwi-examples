


var state = new Kiwi.State( 'Play' );

state.preload = function () {
	
	this.addImage( 'sprite', './assets/img/logo/heart.png' );

	this.addImage('player', './assets/img/logo/fingers.png');

};

state.create = function () {

	this.group = new Kiwi.Group( this );
	this.addChild( this.group );

	this.spriteWidth = 150;
	this.spriteHeight = 117;

	for ( var i = 0; i < 10; i ++ ){
		var randX = Math.random() * ( this.game.stage.width - this.spriteWidth ),
			randY = Math.random() * ( this.game.stage.height - this.spriteHeight );

		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.player, randX, randY );

		// Add sprite to group.
		this.group.addChild( tempSprite );
	}


	this.alpha = 0.5;
	this.alphaStep = 0.02;
	
   
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );

	if( this.alpha <= 0 || this.alpha >= 1 ){
		this.alphaStep *= -1;
	}
	this.alpha += this.alphaStep;


	// Calls the forEach method on 'this.group'. Passing custom parameters in the third parameter.
	this.group.setAll( null, 'alpha', this.alpha );
};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'SetAll', state, gameOptions);


