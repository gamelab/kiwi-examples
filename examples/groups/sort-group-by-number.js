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

	sortByNumber = function ( arr, prop, ascend ) {
		// arr.splice(0);
		console.log( arr );
		arr.sort( function ( a, b ) { 
			if ( ascend ) {
				return a[prop] - b[prop];
			} else {
				return b[prop] - a[prop];
			}
		});
		return arr;
	};

	console.log( this.group.members, "Members" );
	this.group.members = sortByNumber( this.group.members, 'y', true );
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Sort Group By Number', state, gameOptions);


