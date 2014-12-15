


var state = new Kiwi.State( 'Play' );

state.preload = function () {
    
    this.addSpriteSheet( 'sprite', './assets/img/topdown-characters/terminator-topdown.png', 150, 117 );
    this.addSpriteSheet( 'spartan', './assets/img/topdown-characters/spartan-topdown.png', 150, 117 );

};

state.create = function () {

	this.group = new Kiwi.Group( this );
	this.addChild( this.group );

	this.spriteWidth = 150;
	this.spriteHeight = 117;

	for ( var i = 0; i < 10; i ++ ){
		var x = i * 20 + 200,
			y = 200;

		var tempSprite = new Kiwi.GameObjects.Sprite( this, this.textures.sprite, x, y );

		this.group.addChild( tempSprite );

	}

	var afterSprite = new Kiwi.GameObjects.Sprite( this, this.textures.spartan, 290, 250 );

	this.group.addChildAfter( afterSprite, this.group.getChildAt( this.group.numChildren() - 1 ) );
  
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'AddingSpritesAfter', state, gameOptions);


