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

	this.addImage('XBOX_A', './assets/img/plugins/gamepad/Xbox360/faceButton0.png');
	this.addImage('XBOX_B', './assets/img/plugins/gamepad/Xbox360/faceButton1.png');
	this.addImage('XBOX_X', './assets/img/plugins/gamepad/Xbox360/faceButton2.png');
	this.addImage('XBOX_Y', './assets/img/plugins/gamepad/Xbox360/faceButton3.png');

	this.addImage('XBOX_DPAD', './assets/img/plugins/gamepad/Xbox360/dpad.png');
	this.addImage('XBOX_DPAD_DOWN', './assets/img/plugins/gamepad/Xbox360/dpadDown.png');
	this.addImage('XBOX_DPAD_LEFT', './assets/img/plugins/gamepad/Xbox360/dpadLeft.png');
	this.addImage('XBOX_DPAD_RIGHT', './assets/img/plugins/gamepad/Xbox360/dpadRight.png');
	this.addImage('XBOX_DPAD_UP', './assets/img/plugins/gamepad/Xbox360/dpadUp.png');
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

	this.xbox_a = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_A, 550, 200 + 50 );
	this.xbox_b = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_B, 550 + 50, 200 );
	this.xbox_x = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_X, 550 - 50, 200 );
	this.xbox_y = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_Y, 550, 200 - 50 );

	this.xbox_dpad = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_DPAD, 150, 200 );
	this.xbox_dpad_left = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_DPAD_LEFT, 150, 200 );
	this.xbox_dpad_right = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_DPAD_RIGHT, 150, 200 );
	this.xbox_dpad_up = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_DPAD_UP, 150, 200 );
	this.xbox_dpad_down = new Kiwi.GameObjects.Sprite( this, this.textures.XBOX_DPAD_DOWN, 150, 200 );

	this.xbox_dpad.scaleX = 2;
	this.xbox_dpad.scaleY = 2;
	this.xbox_dpad_left.scaleX = 2;
	this.xbox_dpad_left.scaleY = 2;
	this.xbox_dpad_right.scaleX = 2;
	this.xbox_dpad_right.scaleY = 2;
	this.xbox_dpad_up.scaleX = 2;
	this.xbox_dpad_up.scaleY = 2;
	this.xbox_dpad_down.scaleX = 2;
	this.xbox_dpad_down.scaleY = 2;

	this.game.gamepads.gamepads[0].buttonOnDownOnce.add( this.buttonOnDownOnce, this );
	this.game.gamepads.gamepads[0].buttonOnUp.add( this.buttonOnUp, this );

	//Add the GameObjects to the stage
	this.addChild(this.xbox_a);
	this.addChild(this.xbox_b);
	this.addChild(this.xbox_x);
	this.addChild(this.xbox_y);

	this.addChild(this.xbox_dpad);
	this.addChild(this.xbox_dpad_down);
	this.addChild(this.xbox_dpad_up);
	this.addChild(this.xbox_dpad_left);
	this.addChild(this.xbox_dpad_right);

	this.addChild(this.name);
  
}

GamepadPlugin.Play.buttonOnDownOnce = function( button ){
	// console.log("DOWN:", button.name );

	switch ( button.name ) {
		case "XBOX_A":
			// Code
			this.xbox_a.alpha = this.downAlpha;
			break;
		case "XBOX_B":
			// Code
			this.xbox_b.alpha = this.downAlpha;
			break;
		case "XBOX_X":
			// Code
			this.xbox_x.alpha = this.downAlpha;
			break;
		case "XBOX_Y":
			// Code
			this.xbox_y.alpha = this.downAlpha;
			break;
		case "XBOX_DPAD_LEFT":
			// Code
			this.xbox_dpad_left.alpha = this.downAlpha;
			break;
		case "XBOX_DPAD_RIGHT":
			// Code
			this.xbox_dpad_right.alpha = this.downAlpha;
			break;
		case "XBOX_DPAD_UP":
			// Code
			this.xbox_dpad_up.alpha = this.downAlpha;
			break;
		case "XBOX_DPAD_DOWN":
			// Code
			this.xbox_dpad_down.alpha = this.downAlpha;
			break;
		default:
			// Code
	}

}

GamepadPlugin.Play.buttonOnUp = function( button ){
	// console.log("UP:  ", button.name);

	switch ( button.name ) {
		case "XBOX_A":
			// Code
			this.xbox_a.alpha = this.upAlpha;
			break;
		case "XBOX_B":
			// Code
			this.xbox_b.alpha = this.upAlpha;
			break;
		case "XBOX_X":
			// Code
			this.xbox_x.alpha = this.upAlpha;
			break;
		case "XBOX_Y":
			// Code
			this.xbox_y.alpha = this.upAlpha;
			break;
		case "XBOX_DPAD_LEFT":
			// Code
			this.xbox_dpad_left.alpha = this.upAlpha;
			break;
		case "XBOX_DPAD_RIGHT":
			// Code
			this.xbox_dpad_right.alpha = this.upAlpha;
			break;
		case "XBOX_DPAD_UP":
			// Code
			this.xbox_dpad_up.alpha = this.upAlpha;
			break;
		case "XBOX_DPAD_DOWN":
			// Code
			this.xbox_dpad_down.alpha = this.upAlpha;
			break;
		default:
			// Code
	}

}





	var gameOptions = {
		renderer: Kiwi.RENDERER_WEBGL, 
		width: 800,
		height: 500,
		plugins: ['Gamepad']
	}

	var game = new Kiwi.Game( "game-container", 'GamepadPlugin', null, gameOptions);
	this.game.stage.color = '061029';

	//Add all the States we are going to use.
	game.states.addState(GamepadPlugin.Play);

	game.states.switchState("Play");