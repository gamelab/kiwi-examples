


var state = new Kiwi.State( 'Play' );

state.preload = function () {
	
	this.addSpriteSheet( 'sprite', './assets/img/topdown-characters/terminator-topdown.png', 150, 117 );

};

state.create = function () {

	this.group = new Kiwi.Group( this );
	this.addChild( this.group );

	this.spriteWidth = 150;
	this.spriteHeight = 117;

	for ( var i = 0; i < 2; i ++ ){
		var randX = Math.random() * ( 50 ),
			randY = Math.random() * ( 50 ) + 15;

		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.sprite, randX, randY );

		this.group.addChild( tempSprite );

	}


	this.game.input.mouse.onDown.add( this.mouseClicked, this );
   
};

state.mouseClicked = function () {

	this.group.swapChildren( this.group.getChildAt( 0 ), this.group.getChildAt( 1 ) );
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'SwappingChildren', state, gameOptions);


