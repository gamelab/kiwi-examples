var state = new Kiwi.State( 'Play' );

state.preload = function () {
	
	this.addSpriteSheet( 'apocalypse', './assets/img/topdown/apocalypse.png', 150, 117 );
	this.addSpriteSheet( 'terminator', './assets/img/topdown/terminator.png', 150, 117 );
	this.addSpriteSheet( 'desertStorm', './assets/img/topdown/desert-storm.png', 150, 117 );
	this.addSpriteSheet( 'skeleton', './assets/img/topdown/skeleton.png', 150, 117 );
	this.addSpriteSheet( 'spartan', './assets/img/topdown/spartan.png', 150, 117 );

	this.addSpriteSheet( 'griffon', './assets/img/anime/griffon.png', 150, 117 );
	this.addSpriteSheet( 'snake', './assets/img/anime/snake.png', 150, 117 );
	this.addSpriteSheet( 'squid', './assets/img/anime/squid.png', 150, 117 );

	this.addSpriteSheet( 'catgirl', './assets/img/anime/catgirl.png', 150, 117 );
	this.addSpriteSheet( 'punk', './assets/img/anime/punk.png', 150, 117 );
	this.addSpriteSheet( 'princess', './assets/img/anime/princess.png', 150, 117 );

	this.addImage( 'blueButton', './assets/img/buttons/blue.png' );
	this.addImage( 'greenButton', './assets/img/buttons/green.png' );
	this.addImage( 'orangeButton', './assets/img/buttons/orange.png' );
	this.addImage( 'pinkButton', './assets/img/buttons/pink.png' );
	this.addImage( 'redButton', './assets/img/buttons/red.png' );
	this.addImage( 'yellowButton', './assets/img/buttons/yellow.png' );

}

state.create = function () {

	this.group = new Kiwi.Group( this );
	this.addChild( this.group );

	this.spriteWidth = 150;
	this.spriteHeight = 117;

	this.addButtons();

	// Each sprite that is added to the group is given multiple tags of the colors that exist on their texture atlas. 

	var apocalypse = new Kiwi.GameObjects.Sprite( this, this.textures.apocalypse, 50, 50 );
	apocalypse.addTag( 'green' );
	apocalypse.addTag( 'red' );
	apocalypse.addTag( 'yellow' );
	this.group.addChild( apocalypse );

	var terminator = new Kiwi.GameObjects.Sprite( this, this.textures.terminator, 200, 50 );
	terminator.addTag( 'red' );
	this.group.addChild( terminator );

	var desert = new Kiwi.GameObjects.Sprite( this, this.textures.desertStorm, 350, 50 );
	desert.addTag( 'yellow' );
	this.group.addChild( desert );

	var skeleton = new Kiwi.GameObjects.Sprite( this, this.textures.skeleton, 500, 50 );
	this.group.addChild( skeleton );

	var spartan = new Kiwi.GameObjects.Sprite( this, this.textures.spartan, 650, 50 );
	spartan.addTag( 'yellow' );
	spartan.addTag( 'red' );
	this.group.addChild( spartan );

	var griffon = new Kiwi.GameObjects.Sprite( this, this.textures.griffon, 50, 200 );
	griffon.addTag( 'yellow' );
	griffon.addTag( 'orange' );
	this.group.addChild( griffon );

	var snake = new Kiwi.GameObjects.Sprite( this, this.textures.snake, 200, 200 );
	snake.addTag( 'red' );
	snake.addTag( 'orange' );
	this.group.addChild( snake );

	var squid = new Kiwi.GameObjects.Sprite( this, this.textures.squid, 350, 200 );
	squid.addTag( 'blue' );
	squid.addTag( 'yellow' );
	this.group.addChild( squid );

	var catgirl = new Kiwi.GameObjects.Sprite( this, this.textures.catgirl, 500, 200 );
	catgirl.addTag( 'red' );
	catgirl.addTag( 'orange' );
	this.group.addChild( catgirl );

	var princess = new Kiwi.GameObjects.Sprite( this, this.textures.princess, 650, 200 );
	princess.addTag( 'blue' );
	princess.addTag( 'yellow' );
	this.group.addChild( princess );

	var punk = new Kiwi.GameObjects.Sprite( this, this.textures.punk, 50, 350 );
	punk.addTag( 'pink' );
	this.group.addChild( punk );

}

state.addButtons = function () {
	var button;

	button = new Button( this, 5, 50, 'blue' );
	this.addChild( button );

	button = new Button( this, 5, 100, 'green' );
	this.addChild( button );

	button = new Button( this, 5, 150, 'orange' );
	this.addChild( button );

	button = new Button( this, 5, 200, 'pink' );
	this.addChild( button );

	button = new Button( this, 5, 250, 'red' );
	this.addChild( button );

	button = new Button( this, 5, 300, 'yellow' );
	this.addChild( button );

}


var Button = function ( state, x, y, color ) {
	this.state = state;

	// When a button is clicked all of the sprites with the tag of the tag of
	// the color of the button are toggled between visible and not.
	Kiwi.GameObjects.Sprite.call(this, this.state, this.state.textures[ color + "Button" ], x, y);

	this.color = color;
	this.colorVisible = true;
	this.input.onDown.add( this.toggleColor, this );

}

Kiwi.extend(Button, Kiwi.GameObjects.Sprite);

Button.prototype.toggleColor = function() {
	var sprites = this.state.group.getChildrenByTag( this.color );

	this.colorVisible = !this.colorVisible;

	for (var i = sprites.length - 1; i >= 0; i--) {
		sprites[i].visible = this.colorVisible;
	}
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Using Tags', state, gameOptions);
