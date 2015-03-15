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
   
};


state.mouseClicked = function () {
	var myArray = [];

	// Use the getAllChildren method of the group to put the children of that group in an array.
	this.group.getAllChildren( false, myArray );

	for (var i = myArray.length - 1; i >= 0; i--) {
		// Rotates all members of the group.
		myArray[i].rotation += Math.PI * 0.25;
	}
	
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Get All Children', state, gameOptions);


