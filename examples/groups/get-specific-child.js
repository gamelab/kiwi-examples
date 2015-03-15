var state = new Kiwi.State( 'Play' );

state.preload = function () {
	this.addSpriteSheet( 'sprite', './assets/img/topdown/terminator.png', 150, 117 );
}

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

	this.game.input.mouse.onDown.add( this.mouseClicked, this );
}


state.mouseClicked = function () {
	var myNumber = Math.floor( Math.random() * 10 );

	// Gets a child from the group at a specific index.
	var child = this.group.getChildAt( myNumber );
	child.rotation += Math.PI * 0.25;
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Get Specific Child', state, gameOptions);


