


var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addImage('space', './assets/img/solar-system/bg.png');
    this.addImage('earth', './assets/img/solar-system/earth.png');

};

state.create = function () {

	this.space = new Kiwi.GameObjects.Sprite(this, this.textures.space);
	this.addChild( this.space );

	this.earth = new Kiwi.GameObjects.Sprite(this, this.textures.earth, 0, 200);
	this.addChild( this.earth );
  
};

state.update = function(){
	
	Kiwi.State.prototype.update.call( this );

	this.earth.x += 5;

	if( this.earth.x > this.game.stage.width ) {
		this.earth.x = -this.earth.width;
	}

};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'LoadingAnImage', state, gameOptions);


