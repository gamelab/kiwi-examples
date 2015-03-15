var state = new Kiwi.State( 'Play' );

state.preload = function () {
	this.addSpriteSheet( 'sprite', './assets/img/topdown/terminator.png', 150, 117 );
}

state.create = function () {

	// Create a new Kiwi.Group.
	this.group = new Kiwi.Group( this );

	// Add the group to the state.
	this.addChild( this.group );

	// Parameters created used to place sprites on stage.
	this.spriteWidth = 150;
	this.spriteHeight = 117;

	for ( var i = 0; i < 10; i ++ ){
		var randX = Math.random() * ( this.game.stage.width - this.spriteWidth ),
			randY = Math.random() * ( this.game.stage.height - this.spriteHeight );

		// Create a new sprite that will be added to the group.
		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.sprite, randX, randY );

		// Add the sprite to the group.
		this.group.addChild( tempSprite );

	}
   
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Adding Sprites to Group', state, gameOptions);


