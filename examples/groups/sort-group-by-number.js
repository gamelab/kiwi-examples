


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



	/////////////////////////////////////
	// FOR KIWI JS TEAM // SORY BY STRING

	// var byName = arrayOfObjects.slice(0);
	// byName.sort(function(a,b) {
	//     var x = a.name.toLowerCase();
	//     var y = b.name.toLowerCase();
	//     return x < y ? -1 : x > y ? 1 : 0;
	// });

	// console.log('by name:');
	// console.log(byName);

	/////////////////////
	/////////////////////


   
};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'SortGroupByNumber', state, gameOptions);


