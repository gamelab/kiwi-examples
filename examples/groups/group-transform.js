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

	this.group.y = this.game.stage.height * 0.5;
	this.speed = 5;
   
}

state.update = function() {

	Kiwi.State.prototype.update.call( this );

	if(this.group.x < 0 || this.group.x > this.game.stage.width ){
		this.speed *= -1;
	}

	// Uses the transform component of a group to move it around on the state.
	this.group.x += this.speed;
	this.group.rotation += Math.PI * 0.005;

}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Group Transform', state, gameOptions);


