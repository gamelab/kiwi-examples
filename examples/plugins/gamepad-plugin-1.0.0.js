/**
* The Gamepad plugin brings the features of Gamepad.js to Kiwi.js.
* For more information look here: https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html
* @module Kiwi
* @submodule Plugins
* @class Gamepad
*/

Kiwi.Plugins.Gamepad = {
	/**
    * The name of this plugin.
    * @property name
    * @default "Gamepad"
    * @public
    */
	name:"Gamepad",
	/**
    * The version of this plugin.
    * @property version
    * @default "1.0.0"
    */
	version:"1.0.0",
	minimumKiwiVersion: "1.0.0"
};
Kiwi.PluginManager.register(Kiwi.Plugins.Gamepad);


/**
* Called when the plugin is properly created.
* @method create
* @param game {Kiwi.Game} Game in which the gamepad is used
* @public
* @return Kiwi.Plugins.Gamepad.Manager
*/

/**
*
* @method create
* @param game {Kiwi.Game} The game that is current in the boot stage.
* @private 
*/

Kiwi.Plugins.Gamepad.create = function( game ) {
	var support = Kiwi.Plugins.Gamepad.supportsGamepad();
	if( !support ) {
		console.error ( "Your browser / platform does not support Gamepad Controllers" );
	}
	game.gamepads = new Kiwi.Plugins.Gamepad.Manager( game );
	return game.gamepads;
};


/**
* Returns whether the browser supports gamepads.
* @method supportsGamepad
* @public
* @return Boolean
*/
Kiwi.Plugins.Gamepad.supportsGamepad = function() {
	return "getGamepads" in navigator;
};


/**
* Manages all gamepads in the game.
* @module Kiwi.Plugins
* @submodule Gamepad
* @class Manager
* @constructor
* @param game {Kiwi.Game} Game in which the gamepad is used
*/
Kiwi.Plugins.Gamepad.Manager = function( game ) {
	this.game = game;
	var gamepads = [],
		gamepadLength = navigator.getGamepads().length;

	for (var i = gamepadLength - 1; i >= 0; i--) {
		var tempController = new Kiwi.Plugins.Gamepad.Controller( this, 0.25, 0.25 );
		gamepads.push( tempController );
	}

	this.gamepads = gamepads;

	this.gamepadConnected = new Kiwi.Signal();
	this.gamepadDisconnected = new Kiwi.Signal();

	var self = this;
	window.addEventListener("gamepadconnected", function( event ) {
		// console.log( "connected" );
		self.gamepadConnected.dispatch( event.gamepad );
	});
	window.addEventListener("gamepaddisconnected", function( event ) {
		// console.log( "disconnected" );
		self.gamepadDisconnected.dispatch( event.gamepad);
	});

};


/**
* THis method Updates all gamepads connected to computer.
* @method update
* @private
*/
Kiwi.Plugins.Gamepad.Manager.prototype.update = function( ) {
	var i,
		gamepads = navigator.getGamepads();

	for ( i = 0; i < gamepads.length; i++ ) {
		if ( gamepads[ i ] ) {
			this.gamepads[ i ].checkButtons( gamepads[ i ]);
			this.gamepads[ i ].checkAxes( gamepads[ i ] );
		}
	}
};


/*
* Controls an individual gamepad.
*
* @class Controller
* @constructor
* @param parent {Kiwi.Plugins.Gamepad.Manager} Gamepad manager
* @param [axesThreshold] {Number} Between 0 - 1.
*	This sets the threshold that a thumbstick must exceed
*	before it is considered hit.
* @param [triggerThreshold] {Number} Between 0 - 1.
*	This sets the threshold that a button must exceed
*	before it is considered hit.
*/
Kiwi.Plugins.Gamepad.Controller = function ( parent, axesThreshold, triggerThreshold ) {
	this.parent = parent;
	this.axesThreshold = axesThreshold;
	this.triggerThreshold = triggerThreshold;
	this.createButtons();
	this.createAxes();

	this.threshold = axesThreshold;

	this.buttonOnUp = new Kiwi.Signal();
	this.buttonIsDown = new Kiwi.Signal();
	this.buttonOnDownOnce = new Kiwi.Signal();
	this.justReleased = new Kiwi.Signal();

	this.thumbstickOnUp = new Kiwi.Signal();
	this.thumbstickIsDown = new Kiwi.Signal();
	this.thumbstickOnDownOnce = new Kiwi.Signal();
	// this.justReleased = new Kiwi.Signal();
};


/*
* This method creates all of the buttons that a Controller will use and assigns names.
* @method createButtons
* @private
*/
Kiwi.Plugins.Gamepad.Controller.prototype.createButtons = function() {

	this.button0 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_A");
	this.button1 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_B");
	this.button2 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_X");
	this.button3 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_Y");

	this.button4 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_LEFT_BUMPER");
	this.button5 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_RIGHT_BUMPER");
	this.button6 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_LEFT_TRIGGER", 0.2);
	this.button7 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_RIGHT_TRIGGER", 0.2);

	this.button8 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_BACK");
	this.button9 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_START");

	this.button10 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_LEFT_STICK");
	this.button11 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_RIGHT_STICK");

	this.button12 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_DPAD_UP");
	this.button13 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_DPAD_DOWN");
	this.button14 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_DPAD_LEFT");
	this.button15 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_DPAD_RIGHT");

	// this.button16 = new Kiwi.Plugins.Gamepad.Button( 0, "XBOX_MIDDLE_BUTTON");

	this.rightButtons = [ this.button0, this.button1, this.button2, this.button3 ];
	this.bumpers = [ this.button4, this.button5 ];
	this.trigers = [ this.button6, this.button7 ];
	this.thumbsticks = [ this.button10, this.button11 ];
	this.dpad = [ this.button12, this.button13, this.button14, this.button15 ];
	this.optionButtons = [  this.button8, this.button9,  this.button16 ];

	this.buttons = [ this.button0, this.button1, this.button2, this.button3,
		this.button4, this.button5, this.button6, this.button7,
		this.button8, this.button9, this.button10, this.button11,
		this.button12, this.button13, this.button14, this.button15 ];

};


/*
* Create all of the axes that a Controller will use and assigns names.
* @method createAxes
* @private
*/
Kiwi.Plugins.Gamepad.Controller.prototype.createAxes = function() {
	this.axis0 = new Kiwi.Plugins.Gamepad.Thumbstick( 0, "XBOX_LEFT_HORZ", 0.1);
	this.axis1 = new Kiwi.Plugins.Gamepad.Thumbstick( 0, "XBOX_LEFT_VERT", 0.1);
	this.axis2 = new Kiwi.Plugins.Gamepad.Thumbstick( 0, "XBOX_RIGHT_HORZ", 0.1);
	this.axis3 = new Kiwi.Plugins.Gamepad.Thumbstick( 0, "XBOX_RIGHT_VERT", 0.1);

	this.axes = [ this.axis0, this.axis1, this.axis2, this.axis3 ];
	this.leftAxis = [ this.axis0, this.axis1 ];
	this.rightAxis = [ this.axis2, this.axis3 ];
};


/*
* Check to see if the state of a button has changed and fire the appropriate signal
* @method checkButtons
* @param gamepad {Kiwi.Plugins.Gamepad.Controller} Gamepad to check
* @private
*/
Kiwi.Plugins.Gamepad.Controller.prototype.checkButtons = function( gamepad ) {
	for (var i = this.buttons.length - 1; i >= 0; i--) {
		if ( this.buttons[ i ].pressed ===  gamepad.buttons[ i ].pressed ){
			if ( this.buttons[ i ].pressed === true ){
				this.buttons[ i ].isDown( gamepad.buttons[ i ] );
				this.buttonIsDown.dispatch( this.buttons[ i ] );
			}
		} else if ( this.buttons[ i ].pressed !==  gamepad.buttons[ i ].pressed ) {
			if ( gamepad.buttons[ i ].pressed === true ) {
				this.buttons[ i ].press( gamepad.buttons[ i ] );
				this.buttonIsDown.dispatch( this.buttons[ i ] );
				this.buttonOnDownOnce.dispatch( this.buttons[ i ] );
			} else if ( gamepad.buttons[ i ].pressed === false ) {
				this.buttons[ i ].release();
				this.buttonOnUp.dispatch( this.buttons[ i ] );
			}
		}
	}
};


/*
* Check to see if the state of axes has changed and fire the appropriate signal
* @method checkAxes
* @param gamepad {Kiwi.Plugins.Gamepad.Controller} Gamepad to check
* @private
*/
Kiwi.Plugins.Gamepad.Controller.prototype.checkAxes = function( gamepad ) {
	var i;

	for ( i = this.axes.length - 1; i >= 0; i-- ) {
		if ( Math.abs( this.axes[ i ].value ) > this.threshold &&  Math.abs( gamepad.axes[ i ] ) > this.threshold ) {
			if ( Math.abs( this.axes[ i ].value ) > this.threshold ) {
				////////////////////
				//FIRE IS DOWN SIGNAL
				this.axes[ i ].isDown( gamepad.axes[ i ] );

				this.thumbstickIsDown.dispatch( this.axes[ i ] );

			}
		} else if ( Math.abs( this.axes[ i ].value ) > this.threshold ||  Math.abs( gamepad.axes[ i ] ) > this.threshold ) {
			if ( Math.abs( this.axes[ i ].value ) > this.threshold ) {
				this.axes[ i ].press( gamepad.axes[ i ] );

				this.thumbstickIsDown.dispatch( this.axes[ i ] );
				this.thumbstickOnDownOnce.dispatch( this.axes[ i ] );

			} else if ( Math.abs( this.axes[ i ].value ) < this.threshold ) {
				this.axes[ i ].release();
				this.thumbstickOnUp.dispatch( this.axes[ i ] );
			}

		}
		this.axes[i].value = gamepad.axes[i];

	}
};


/**
* The Button class is used to keep track of each button. Currently it only
* tracks index, value, and the pressed boolean. In future we are hoping to add 
* functionality such as duration and more
* @class Button
* @constructor
* @param index {Number} Index of the button mapped out on the controller
* @param name {String} Name that we give the button, based on the Xbox 360 controller
* @param [threshold] {Number} Between 0 - 1.
*	This sets the threshold that a button must exceed
*	before it is considered hit. Only works for triggers.
*/
Kiwi.Plugins.Gamepad.Button = function ( index, name, threshold ) {
	this.index = index;
	this.name = name;
	this.threshold = threshold || 0;

	this.value = 0;
	this.pressed = false;

	// this.startDown;
	// this.startUp;
	this.pressed = false;
};


/**
* Switches the button to the released state
* @method release
* @private
*/
Kiwi.Plugins.Gamepad.Button.prototype.release = function() {
	this.pressed = false;
	this.value = 0;
};


/**
* Switches the button to the press state
* @method press
* @private
*/
Kiwi.Plugins.Gamepad.Button.prototype.press = function( button ) {
	this.pressed = true;
	this.value = button.value;
};


/**
* Switches the button to the isDown state
* @method isDown
* @private
*/
Kiwi.Plugins.Gamepad.Button.prototype.isDown = function( button ) {
	this.pressed = true;
	this.value = button.value;
};


/**
* The Thumbstick class is used to keep track of each thumbstick. Currently it only
* tracks index and value. In future we are hoping to add functionality such as 
* duration and more
* @class Thumbstick
* @constructor
* @param index {Number} This is the index of the axis mapped out on the controller. 
* @param name {String} The name that we give the button. We have based these off the Xbox 360 controller
* @param [threshold] {Number} Between 0 - 1.
*	This sets the threshold that a button must exceed
*	before it is considered hit. Only works for triggers.
*/
Kiwi.Plugins.Gamepad.Thumbstick = function( index, name, threshold ) {
	this.threshold = threshold;
	this.name = name;
	this.index = index;
	this.threshold = threshold || 0.25;
	this.value = 0;
};


/**
* Switches the Thumbstick to the release state
* @method release
* @private
*/
Kiwi.Plugins.Gamepad.Thumbstick.prototype.release = function () {
	this.value = 0;
};


/**
* Switches the Thumbstick to the press state
* @method press
* @param axis {Number}
* @private
*/
Kiwi.Plugins.Gamepad.Thumbstick.prototype.press = function ( axis ) {
	this.value = axis;
};


/**
* Switches the Thumbstick to the isDown state
* @method isDown
* @param axis {Number}
* @private
*/
Kiwi.Plugins.Gamepad.Thumbstick.prototype.isDown = function ( axis ) {
	this.value = axis;
};
