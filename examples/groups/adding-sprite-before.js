


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

	var beforeSprite = new Kiwi.GameObjects.Sprite( this, this.textures.spartan, 290, 160 );

	this.group.addChildAfter( beforeSprite, this.group.getChildAt( 0 ) );
  
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'AddingSpritesBefore', state, gameOptions);


