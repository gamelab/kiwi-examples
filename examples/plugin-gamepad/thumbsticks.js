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

	this.addImage('rocket', './assets/img/plugins/gamepad/kiwi-logo/rocket.png');
}


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
GamepadPlugin.Play.create = function () {

	/*
	* Replace with your own game creation code here...
	*/
	this.speed = 8;
	this.rotSpeed = 0.25;
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);

	this.sprite = new Kiwi.GameObjects.Sprite( this, this.textures.rocket, 250, 100 );

	this.game.gamepads.gamepads[0].thumbstickIsDown.add( this.thumbstickIsDown, this );

	//Add the GameObjects to the stage
	this.addChild(this.sprite);

	this.addChild(this.name);
  
}

GamepadPlugin.Play.thumbstickIsDown = function( stick ){
	// console.log("DOWN:", stick.name, stick.value );

	switch ( stick.name ) {
		case "XBOX_LEFT_HORZ":
			// Code
			this.sprite.x += this.speed * Math.pow( stick.value, 3 );
			break;
		case "XBOX_LEFT_VERT":
			// Code
			this.sprite.y += this.speed * Math.pow( stick.value, 9 );
			break;
		case "XBOX_RIGHT_HORZ":
			// Code
			this.sprite.rotation += this.rotSpeed * Math.pow( stick.value, 9 );
			break;
		case "XBOX_RIGHT_VERT":
			// Code
			this.sprite.alpha = 1 - Math.abs( stick.value ) ;
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

var game = new Kiwi.Game( "game-container", 'GamepadPlugin', null, gameOptions);
this.game.stage.color = '061029';

//Add all the States we are going to use.
game.states.addState(GamepadPlugin.Play);

game.states.switchState("Play");