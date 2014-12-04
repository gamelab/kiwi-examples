


var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addImage('rocket', './assets/logo/bomb.png');

};

state.create = function () {

	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.rocket, 10, 10);
	this.addChild(this.name);
  
};


var gameOptions = {
	width: 400,
	height: 200
};

var game = new Kiwi.Game('game-container', 'LoadingAnImage', state, gameOptions);


