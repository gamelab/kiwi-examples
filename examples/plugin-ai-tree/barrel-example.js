var Barrel = function( state, x, y ) {
	Kiwi.GameObjects.StaticImage.call(
		this, state, state.textures.barrel, x, y );

	this.health = 3;
	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.acceleration = new Kiwi.Geom.Point( 0, 15 );
	this.physics.velocity = new Kiwi.Geom.Point( 0, 9 );
};
Kiwi.extend( Barrel, Kiwi.GameObjects.StaticImage );

Barrel.prototype.update = function() {
	Kiwi.GameObjects.StaticImage.prototype.update.call( this );
	this.physics.update();

	if ( this.physics.overlaps( this.state.platform1 ) ||
			this.physics.overlaps( this.state.platform2 ) ) {
		this.physics.acceleration.y = 0;
		this.physics.velocity.y = 0;
	}
	if ( this.health <= 0 ) {
		this.state.createExplosion( this );
		this.destroy();
	}
};


var Bullet = function( state, x, y, velocity ) {
	Kiwi.GameObjects.Sprite.call( this, state, state.textures.bullet, x, y );

	this.scaleX = velocity;
	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.velocity.x = velocity * 50;

	this.animation.add( "move", [ 0 ], 0.1, false );
	this.animation.add( "explode", [ 1, 2, 3, 4 ], 0.1, false );
	this.animation.play( "move" );
};
Kiwi.extend( Bullet, Kiwi.GameObjects.Sprite );

Bullet.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );

	this.physics.update();

	if ( this.animation.currentAnimation.name !== "move" ) {
		this.physics.velocity.x = 0;
	}
	if ( this.x < -110 || this.x > 900 ) {
		this.destroy();
	} else if ( this.animation.currentAnimation.currentCell === 4 ) {
		this.destroy();
	}
};


var Explosion = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures.explosion, x - 48, y - 68 );

	this.animation.add( "explode", [0, 1, 2, 3, 4 ], 0.1, false );
	this.animation.play( "explode" );
};
Kiwi.extend(Explosion, Kiwi.GameObjects.Sprite);

Explosion.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );

	if ( this.animation.currentAnimation.currentCell === 4 ) {
		this.destroy();
	}
};


var Platform = function ( state, texture, x, y ) {
	Kiwi.GameObjects.StaticImage.call( this, state, texture, x, y, true );
	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.immovable = true;
};
Kiwi.extend( Platform, Kiwi.GameObjects.StaticImage );

Platform.prototype.update = function() {
	Kiwi.GameObjects.StaticImage.prototype.update.call( this );
	this.physics.update();
};


/**
* The soldier is an artifically intelligent barrel hunter.
* It patrols a route looking for barrels, and if it sees one, it shoots at it.
*
* The soldier AI follows this tree:
*
* AI Root
* - Action Selector
* -- Shoot Sequencer
* --- Barrel Detector
* --- Shoot Action
* -- Navigation Sequencer
* --- Move To Location
*
* This is a very simple AI tree, but it is already very functional.
* It begins with the "Action Selector".
* This calls its first child "Shoot Sequencer".
* The Shoot Sequencer in turn calls its first child "Barrel Detector".
* If there is a barrel in sight, it will return success;
* the Shoot Sequencer will then move on through its sequence to
* the "Shoot Action". This starts shooting at the barrel.
* Now the Shoot Sequencer has reached the end of its children,
* and has not encountered an error. It returns success.
* The Action Selector sees a success, and returns immediately.
* The AI update is over.
*
* If there is no barrel in sight, Barrel Detector returns failure.
* The Shoot Sequencer immediately fails.
* The Action Selector moves on to its next child, the "Navigation Sequencer".
* The Navigation Sequencer calls a "Move To Location" child.
* The Move To Location child causes the soldier to walk towards a waypoint.
* If it reaches the waypoint, it targets the next waypoint.
* If it does not, it marks the Move To Location node as "running",
* and comes back to it next time the Navigation Sequencer is called.
*
* In short, the soldier walks back and forth. If they see a barrel,
* they shoot it. 
* 
* @class Soldier
* @constructor
* @param state {Kiwi.State}
* @param x {number}
* @param y {number}
* @param waypoints {array} Array of [x,y] waypoints to follow
*/

var Soldier = function( state, x, y, waypoints ){

	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures.soldier, x, y, false );

	this.animation.add( "idle", [ 0 ], 0.1, false );
	this.animation.add( "walk", [ 1, 2, 3, 4, 5, 6 ], 0.1, true) ;
	this.animation.add( "crouch", [ 7 ], 0.1, false );
	this.animation.play( "walk" );

	this.shootTimer = 25;
	this.shootNum = 99;

	this.pos = this.x + 66;

	this.ai = this.createAi( waypoints );
	this.components.add( this.ai );
};
Kiwi.extend( Soldier, Kiwi.GameObjects.Sprite );

Soldier.prototype.createAi = function( waypoints ) {
	var i, waypoint,
		actionSelector = new Kiwi.Plugins.AiTree.Selector( {
			name: "Action Selector"
		} ),
		ai = new Kiwi.Plugins.AiTree.Ai( this ),
		barrelDetector =
			new Kiwi.Plugins.BasicPatrolAi.Conditions.DetectBarrel( {
			sprite: this,
			target: this.state.barrelGroup,
			range: 150
		} ),
		navSequencer = new Kiwi.Plugins.AiTree.Sequencer(
			{ name : "Navigation Sequencer" } ),
		shootAction = new Kiwi.Plugins.BasicPatrolAi.Actions.ShootAction( {
			sprite: this
		} ),
		shootSequencer = new Kiwi.Plugins.AiTree.Sequencer(
			{ name: "Shoot Sequencer" } );

	for ( i = 0; i < waypoints.length; i++ ) {
		waypoint = new Kiwi.Plugins.BasicPatrolAi.Actions.MoveToLocation( {
			target: waypoints[ i ],
			sprite: this
		} );
		navSequencer.addChild( waypoint );
	}

	shootSequencer.addChild( barrelDetector );
	shootSequencer.addChild( shootAction );

	actionSelector.addChild( shootSequencer );
	actionSelector.addChild( navSequencer );

	ai.addChild( actionSelector );

	return ai;
};

Soldier.prototype.turn = function() {
	this.scaleX *= -1;
};

Soldier.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );
	if ( this.scaleX === -1 ) {
		this.pos = this.x + 66;
	} else {
		this.pos = this.x + 84;
	}
};


// The main game state.

var state = new Kiwi.State( "state" );

state.create = function() {
	this.platform1 = new Platform( this, this.textures.platform1, 79, 243 );
	this.platform2 = new Platform( this, this.textures.platform2, 0, 418 );

	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures.background, 0, 0 );

	this.barrelGroup = new Kiwi.Group( this );
	this.bulletGroup = new Kiwi.Group( this );

	this.soldier1 = new Soldier( this, 100, 332, [ [ 600, 332], [ 0, 332 ] ] );
	this.soldier2 = new Soldier( this, 100, 156, [ [ 250, 156], [ 30, 156 ] ] );

	this.text = new Kiwi.GameObjects.Textfield( this,
		"Click to drop a barrel.",
		this.game.stage.width / 2, 10, "#000", 12 );

	this.addChild( this.platform1 );
	this.addChild( this.platform2 );
	this.addChild( this.background );
	this.addChild( this.soldier1 );
	this.addChild( this.soldier2 );
	this.addChild( this.barrelGroup );
	this.addChild( this.bulletGroup );
	this.addChild( this.text );

	this.mouse = this.game.input.mouse;


	Kiwi.State.prototype.create.call( this );


	this.text.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	this.mouse.start();
};

state.checkCollisions = function() {
	var i, j, bullet, barrel;
	for ( i = 0 ; i < this.bulletGroup.members.length; i++ ) {
		for ( j = 0; j < this.barrelGroup.members.length; j++ ) {
			bullet = this.bulletGroup.members[ i ];
			barrel = this.barrelGroup.members[ j ];
			if ( bullet.animation.currentAnimation.name === "move" ) {
				if ( bullet.physics.overlaps( barrel ) ) {
					this.bulletGroup.members[ i ].animation.switchTo(
						"explode" ,true );
					barrel.health--;
				}
			}
		}
	}
};

state.createExplosion = function( barrel ) {
	this.addChild( new Explosion( this, barrel.x, barrel.y ) );
};

state.shoot = function( sprite ) {
	if ( sprite.scaleX === 1 ) {
		this.bulletGroup.addChild(
			new Bullet( this, sprite.x + 80, sprite.y + 49, 1 ) );
	} else if ( sprite.scaleX === -1 ) {
		this.bulletGroup.addChild(
			new Bullet( this, sprite.x + 20, sprite.y + 49, -1 ) );
	}
};

state.update = function() {
	Kiwi.State.prototype.update.call(this);

	this.soldier1.ai.update();
	this.soldier2.ai.update();
	this.checkCollisions();

	if ( this.mouse.isDown ) {
		this.barrelGroup.addChild(
			new Barrel( this, this.mouse.x - 18, this.mouse.y - 24 ) );
		this.mouse.reset();
	}
};


var loadingState = new Kiwi.State( "loadingState" );
var preloader = new Kiwi.State( "preloader" );

preloader.preload = function() {
	Kiwi.State.prototype.preload.call( this );

	this.addImage( "loadingImage", "./assets/img/plugins/ai-tree/loadingImage.png", true );
};

preloader.create = function() {
	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "loadingState" );
};

loadingState.preload = function() {
	Kiwi.State.prototype.preload.call( this );

	this.game.stage.color = "#E0EDF1";
	this.logo = new Kiwi.GameObjects.StaticImage( this,
		this.textures.loadingImage, 150, 50 );

	this.addChild(this.logo);

	// ASSETS TO LOAD
	this.addImage( "background", "./assets/img/plugins/ai-tree/background.png" );
	this.addImage( "barrel", "./assets/img/plugins/ai-tree/barrel.png" );
	this.addImage( "platform1", "./assets/img/plugins/ai-tree/platform1.png" );
	this.addImage( "platform2", "./assets/img/plugins/ai-tree/platform2.png" );
	this.addSpriteSheet( "explosion", "./assets/img/plugins/ai-tree/explosion.png", 129, 133) ;
	this.addSpriteSheet( "soldier", "./assets/img/plugins/ai-tree/soldier.png", 150, 88 );
	this.addSpriteSheet( "bullet", "./assets/img/plugins/ai-tree/bullet.png", 32, 32 );
};

loadingState.create = function() {
	Kiwi.State.prototype.create.call( this );

	this.switchToMain();
};

loadingState.switchToMain = function() {
	this.game.states.switchState( "state" );
};


/**
* An AI library that controls barrel-hunting guards.
*
* @module Kiwi
* @submodule Plugins
* @namespace Kiwi.Plugins
*/
Kiwi.Plugins.BasicPatrolAi = {
	name: "BasicPatrolAi",
	version: "1.0.0"
};
Kiwi.PluginManager.register(Kiwi.Plugins.BasicPatrolAi);

/**
* AI nodes that control guard perceptions.
* @module BasicPatrolAi
* @submodule Conditions
*/
Kiwi.Plugins.BasicPatrolAi.Conditions = {};



/**
* Outer AI node. Detects a barrel.
* @class DetectBarrel
* @constructor
* @param params {object} Generic param object
* @param [params.name] {string} Name for the node
* @param sprite {Kiwi.Entity} The entity which is looking for barrels
* @param target {Kiwi.Group} The group which contains barrels
* @param range {number} The range within which barrels are detected
*/
Kiwi.Plugins.BasicPatrolAi.Conditions.DetectBarrel = function( params ) {

	Kiwi.Plugins.AiTree.OuterNode.call( this, params );

	this.sprite = params.sprite;
	this.target = params.target;
	this.range = params.range;
	
	return this;
};
Kiwi.extend( Kiwi.Plugins.BasicPatrolAi.Conditions.DetectBarrel,
	Kiwi.Plugins.AiTree.OuterNode );

/**
* Default node name.
* @property DEFAULT_NODE_NAME
* @type {string}
* @public
* @final
*/
Kiwi.Plugins.BasicPatrolAi.Conditions.DetectBarrel.prototype.DEFAULT_NODE_NAME =
	"Detect Barrel Outer Node";

/**
* Node functionality
* @method _run
* @private
*/
Kiwi.Plugins.BasicPatrolAi.Conditions.DetectBarrel.prototype._run = function() {
	var barrel, distance, i;

	for ( i = 0; i < this.target.members.length; i++ ) {
		barrel = this.target.members[ i ];
		if ( barrel.health > 0 ) {
			if ( Math.abs( barrel.y - this.sprite.y ) < 50 ) {
				distance = barrel.x + 37 - this.sprite.pos;

				// Facing right or left
				if ( this.sprite.scaleX === 1) {
					if ( distance > 0 && distance <= this.range ) {
						this.status = this.STATUS_SUCCESS;
						return;
					}
				} else if ( this.sprite.scaleX === -1) {
					if ( distance < 0 && distance >= -this.range ) {
						this.status = this.STATUS_SUCCESS;
						return;
					}
				}
			}
		}
	}

	this.status = this.STATUS_FAILURE;
};



/**
* AI nodes that control guard actions.
* @module BasicPatrolAi
* @submodule Actions
*/
Kiwi.Plugins.BasicPatrolAi.Actions = {};



/**
* Outer AI node. Moves towards a location. Returns STATUS_RUNNING if still
* approaching the target, and STATUS_SUCCESS upon reaching it.
* @class MoveToLocation
* @constructor
* @param params {object} Generic param object
* @param [params.name] {string} Name for the node
* @param [params.target=[0,0]] {array} X, Y coordinates to seek
* @param params.sprite {Kiwi.Entity} The entity which is moving
* @param [params.proximityThreshold=16] {number} How close to the target the
*	entity gets before it counts as "there"
* @param [params.velocity=2] {number} How fast the entity moves
*/
Kiwi.Plugins.BasicPatrolAi.Actions.MoveToLocation = function( params ) {
	this.target = params.target || [ 0, 0 ];
	this.proximityThreshold = params.proximityThreshold || 16;
	this.velocity = params.velocity || 2;
	this.sprite = params.sprite;

	Kiwi.Plugins.AiTree.OuterNode.call( this, params );

	return this;
};
Kiwi.extend( Kiwi.Plugins.BasicPatrolAi.Actions.MoveToLocation,
	Kiwi.Plugins.AiTree.OuterNode );

/**
* Node functionality
* @method _run
* @private
*/
Kiwi.Plugins.BasicPatrolAi.Actions.MoveToLocation.prototype._run =
		function() {
	var dx, dy,
		distX = this.target[0] - this.sprite.transform.x,
		distY = this.target[1] - this.sprite.transform.y,
		dist = Math.sqrt( distX * distX + distY * distY );

	if ( this.sprite.animation.currentAnimation.name !== "walk" ) {
		this.sprite.animation.switchTo( "walk", true );
	}

	if ( dist < this.proximityThreshold ) {
		this.status = this.STATUS_SUCCESS;
	} else if ( dist !== 0 ) {
		dx = distX / dist;
		dy = distY / dist;
		this.sprite.transform.x += dx * this.velocity;
		this.sprite.transform.y += dy * this.velocity;

		if ( dx < 0 && this.sprite.scaleX === 1 ) {
			this.sprite.turn();
		} else if ( dx >= 0 && this.sprite.scaleX === -1 ) {
			this.sprite.turn();
		}

		this.status = this.STATUS_RUNNING;
	}
};



/**
* Outer AI node. Crouches and shoots. Returns STATUS_RUNNING if still
* approaching the target, and STATUS_SUCCESS upon reaching it.
* @class MoveToLocation
* @constructor
* @param params {object} Generic param object
* @param [params.name] {string} Name for the node
* @param params.sprite {Kiwi.Entity} The entity which is shooting
*/
Kiwi.Plugins.BasicPatrolAi.Actions.ShootAction = function( params ) {
	this.sprite = params.sprite;

	Kiwi.Plugins.AiTree.OuterNode.call( this, params );

	return this;
};
Kiwi.extend( Kiwi.Plugins.BasicPatrolAi.Actions.ShootAction,
	Kiwi.Plugins.AiTree.OuterNode );

/**
* Node functionality
* @method _run
* @private
*/
Kiwi.Plugins.BasicPatrolAi.Actions.ShootAction.prototype._run = function() {
	if ( this.sprite.animation.currentAnimation.name !== "crouch" ) {
		this.sprite.animation.switchTo( "crouch", true );
	}
	if ( this.sprite.shootNum > this.sprite.shootTimer ) {
		this.sprite.state.shoot( this.sprite );
		this.sprite.shootNum = 0;
	} else {
		this.sprite.shootNum++;
	}
	this.status = this.STATUS_SUCCESS;
};

var gameOptions = {},
	MyBarrelGame = {};

MyBarrelGame.game = new Kiwi.Game( 'game-container', "barrelGame", null, gameOptions );
MyBarrelGame.state = state;

MyBarrelGame.game.states.addState( state );
MyBarrelGame.game.states.addState( loadingState );
MyBarrelGame.game.states.addState( preloader, true );
