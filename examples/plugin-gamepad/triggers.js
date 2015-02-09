var GamepadPlugin = GamepadPlugin || {};

GamepadPlugin.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/
GamepadPlugin.Play.preload = function () {
	this.addImage('kiwiName', './assets/img/plugins/gamepad/kiwijs-name.png');

	this.addImage('white', './assets/img/plugins/gamepad/white.png');
	this.addImage('blue', './assets/img/plugins/gamepad/blue.png');
}


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
GamepadPlugin.Play.create = function () {

	/*
	* Replace with your own game creation code here...
	*/
	this.downAlpha = 0.5;
	this.upAlpha = 1;
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);

	this.triggerLeft = new Kiwi.GameObjects.Sprite( this, this.textures.white, 250, 100 );
	this.triggerRight = new Kiwi.GameObjects.Sprite( this, this.textures.white, 500, 100 );

	this.triggerLeft.anchorPointY = this.triggerLeft.height;
	this.triggerRight.anchorPointY = this.triggerRight.height;

	this.game.gamepads.gamepads[0].buttonIsDown.add( this.buttonIsDown, this );
	this.game.gamepads.gamepads[0].buttonOnUp.add( this.buttonOnUp, this );

	//Add the GameObjects to the stage
	this.addChild(this.triggerLeft);
	this.addChild(this.triggerRight);

	this.addChild(this.name);
  
}

GamepadPlugin.Play.buttonIsDown = function( button ){
	// console.log("DOWN:", button.name, button.value );

	switch ( button.name ) {
		case "XBOX_LEFT_TRIGGER":
			// Code
			this.triggerLeft.scaleY = 1.1 - button.value;
			break;
		case "XBOX_RIGHT_TRIGGER":
			// Code
			this.triggerRight.scaleY = 1.1 - button.value;
			break;
		default:
			// Code
	}

}
GamepadPlugin.Play.buttonOnUp = function( button ){
	// console.log("UP:  ", button.name);

	switch ( button.name ) {
		case "XBOX_LEFT_TRIGGER":
			// Code
			this.triggerLeft.scaleY = 1;
			break;
		case "XBOX_RIGHT_TRIGGER":
			// Code
			this.triggerRight.scaleY = 1;
			break;
		default:
			// Code
	}

}



var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 600,
	plugins: ['Gamepad']
}

var game = new Kiwi.Game( "game-container", 'GamepadPlugin', null, gameOptions );
this.game.stage.color = '061029';

//Add all the States we are going to use.
game.states.addState(GamepadPlugin.Play);

game.states.switchState("Play");