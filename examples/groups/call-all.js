


var state = new Kiwi.State( 'Play' );

state.preload = function () {
	
	this.addImage( 'sprite', './assets/img/logo/heart.png' );

	this.addSpriteSheet('player', './assets/img/anime-monsters/griffon-sheet.png', 150, 117);

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
		tempSprite.xSpeed = 2;
		tempSprite.animation.add( 'walk', [  01, 02, 03, 04, 06 ], 0.1, true, false );
		tempSprite.bounce = function ( me ) {
			if( this.x >= this.game.stage.width - this.width || this.x <= 0 ){
				this.scaleX *= -1;
				this.xSpeed *= -1;
			}
		}


		// Add sprite to group.
		this.group.addChild( tempSprite );
	}

	// console.dir( this.group.members );
	this.group.callAll( 'animation', 'play', ['walk'] );
	
   
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );


	// Calls the forEach method on 'this.group'. Passing custom parameters in the third parameter.
	this.group.forEach( this, this.updatePosition );
	// console.log( this.group )
	this.group.callAll( null, 'bounce', null );
};


state.updatePosition = function ( sprite, wobble ) {

	sprite.x += sprite.xSpeed;


}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'CallAll', state, gameOptions);


