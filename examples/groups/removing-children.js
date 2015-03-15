var state = new Kiwi.State( 'Play' );

state.preload = function () {
	this.addSpriteSheet( 'sprite', './assets/img/topdown/terminator.png', 150, 117 );
}

state.create = function () {

	this.group = new Kiwi.Group( this );
	this.addChild( this.group );

	this.spriteWidth = 150;
	this.spriteHeight = 117;
	var spriteNumber = 10;

	for ( var i = 0; i < spriteNumber; i ++ ){
		var randX = Math.random() * ( this.game.stage.width - this.spriteWidth ),
			randY = Math.random() * ( this.game.stage.height - this.spriteHeight );

		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.sprite, randX, randY );
		this.group.addChild( tempSprite );

	}

	this.numberText = new Kiwi.GameObjects.Textfield( this, "Number of Sprites: " + spriteNumber.toString(), 15, 15, '#000', 20 );
	this.addChild( this.numberText );

	this.game.input.mouse.onDown.add( this.mouseClicked, this );
}

state.mouseClicked = function () {

	// Everytime the mouse has been clicked it will remove the first child of the Group.
	this.group.removeChild( this.group.getChildAt( 0 ), true );
	this.group.removeChildAt( 0 );
	this.group.removeChildren( 0, this.group.numChildren(), true );

	this.numberText.text = "Number of Sprites: " + this.group.numChildren();
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Removing Children', state, gameOptions);


