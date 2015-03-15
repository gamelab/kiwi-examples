var state = new Kiwi.State('Play');

state.preload = function () {
	this.addImage( 'earth', './assets/img/solar-system/earth.png' );
}

state.create = function () {
	this.group = new Kiwi.Group ( this );
	this.addChild( this.group );

	this.earth = new Kiwi.GameObjects.Sprite( this, this.textures.earth, 0, 0 );
	this.group.addChild( this.earth );

	this.text = new Kiwi.GameObjects.Textfield( this, "Earth!", 55, 0, "#FF0000", 16, 'normal', 'Impact' );
	this.text.textAlign = 'center';

	// Adds child to the same group as the sprite.
	this.group.addChild( this.text );


	this.step = 2;

	this.group.y = 200;

	this.group.anchorPointX = this.earth.width * 0.5;
	this.group.anchorPointY = this.earth.height * 0.5;
  
};


state.update = function () {
	Kiwi.State.prototype.update.call( this );


	// Updating the transform of the group will change the transform of the text and sprite.
	if( this.group.x > game.stage.width ){
		this.group.x = -110;
	}
	this.group.x += this.step;

	this.group.rotation += 0.01
};



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Text in a Group', state, gameOptions);


