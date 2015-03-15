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
		var randX = Math.random() * ( 100 ),
			randY = Math.random() * ( 100 ) + 15;

		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.sprite, randX, randY );
		this.group.addChild( tempSprite );

	}


	this.game.input.mouse.onDown.add( this.mouseClicked, this );
}

state.mouseClicked = function () {
	// Everytime the mouse is clicked the first child in the group will be set to the last.
	this.group.setChildIndex( this.group.getChildAt( 0 ), this.group.numChildren() );
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Set Child Index', state, gameOptions);


