


var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addImage('space', './assets/img/solar-system/bg.png');

};

state.create = function () {

	this.space = new Kiwi.GameObjects.Sprite(this, this.textures.space);

	this.textField = new Kiwi.GameObjects.Textfield(this, '');
	this.textField.x = this.game.stage.width / 2;
	this.textField.y = 10;
	this.textField.color = '#FFFFFF';
	this.textField.fontFamily = 'Roboto, sans-serif';
	this.textField.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	this.counter = 0;

	this.addChild(this.space);
	this.addChild(this.textField);

	this.space.input.onUp.add( this.clicked, this );
  
};

state.clicked = function(){
	
	this.counter++;
	this.textField.text = 'You have clicked ' + this.counter + ' times.';

};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'LoadingAnImage', state, gameOptions);


