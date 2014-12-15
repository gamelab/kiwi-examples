


var state = new Kiwi.State( 'Play' );

state.preload = function () {
	
	this.addSpriteSheet( 'sprite', './assets/img/topdown-characters/terminator-topdown.png', 150, 117 );

};

state.create = function () {

	this.group = new Kiwi.Group( this );
	this.addChild( this.group );

	this.spriteWidth = 150;
	this.spriteHeight = 117;

	for ( var i = 0; i < 10; i ++ ){
		var randX = Math.random() * ( this.game.stage.width - this.spriteWidth ),
			randY = Math.random() * ( this.game.stage.height - this.spriteHeight );

		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.sprite, randX, randY );

		this.group.addChild( tempSprite );

	}
   
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'AddingSpritesToGroup', state, gameOptions);


