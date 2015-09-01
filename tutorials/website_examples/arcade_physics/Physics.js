var myGame = new Kiwi.Game();
var myState = new Kiwi.State( "myState" );

myState.preload = function() {
	Kiwi.State.prototype.preload.call( this );

	// Environment Assets
	this.addImage( "ground", "assets/ground.png" );
	this.addImage( "grass", "assets/ground-tiles/grass.png" );
	this.addImage( "dirt", "assets/ground-tiles/dirt.png" );
	this.addImage( "bg1", "assets/bg-layers/1.png" );
	this.addImage( "bg2", "assets/bg-layers/2.png" );
	this.addImage( "bg3", "assets/bg-layers/3.png" );
	this.addImage( "bg4", "assets/bg-layers/4.png" );
	this.addImage( "bg5", "assets/bg-layers/5.png" );
	this.addImage( "bg6", "assets/bg-layers/6.png" );
	this.addImage( "bg7", "assets/bg-layers/7.png" );

	// SpriteSheet and Objects
	this.addSpriteSheet( "plane", "assets/plane/plane.png", 166, 83 );
	this.addSpriteSheet( "bombDoor", "assets/plane/bomb-door.png", 68, 22 );
	this.addSpriteSheet( "soldier1", "assets/german-soldier.png", 150, 117 );
	this.addSpriteSheet( "explosion", "assets/explosion.png", 129, 133 );
	this.addSpriteSheet( "tank", "assets/german-tank.png", 150, 117 );

	this.addImage( "bomb", "assets/bomb.png" );
};

myState.create = function() {
	var i;

	this.game.input.onUp.add( this.dropBomb,this );

	this.ground = new Platform( this, 0, 505 );

	this.bombGroup = new Kiwi.Group( this );

	// Parallax Environment Groups
	this.grassGroup = new Kiwi.Group( this );
	this.bg1 = new Kiwi.Group( this );
	this.bg2 = new Kiwi.Group( this );
	this.bg3 = new Kiwi.Group( this );
	this.bg4 = new Kiwi.Group( this );
	this.bg5 = new Kiwi.Group( this );
	this.bg6 = new Kiwi.Group( this );
	this.bg7 = new Kiwi.Group( this );

	this.bombDropped = false;

	this.enemyGroup = new Kiwi.Group( this );
	this.explodeGroup = new Kiwi.Group( this );

	// Plane and Bomb Door
	this.plane = new Kiwi.GameObjects.Sprite(
		this,this.textures[ "plane" ], 250, 20 );
	this.bombDoor = new Kiwi.GameObjects.Sprite(
		this,this.textures[ "bombDoor" ], 250, 80 );

	this.plane.animation.add(
		"fly", [ 0, 1, 2 ], 0.1, true );
	this.plane.animation.play(
		"fly" );

	this.bombDoor.animation.add(
		"closed", [ 0 ], 0.1, false );
	this.bombDoor.animation.add(
		"open",[ 0, 1, 2, 2, 2, 2, 1, 0 ], 0.1, false );
	this.bombDoor.animation.play( "closed" );

	// Timers for enemy spawns
	this.timer = this.game.time.clock.createTimer(
		"spawnTroop", 3, -1, true );
	this.timerEvent = this.timer.createTimerEvent(
		Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnSoldier, this );

	this.tankTimer = this.game.time.clock.createTimer(
		"tankTimer", 8, -1, true );
	this.tankTimer.createTimerEvent(
		Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnTank, this );

	// Creating parallax background assets  
	for ( i = 0; i < 20; i++ ) {
		this.grassGroup.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "grass" ], i * 48, 504, true ) );
		this.grassGroup.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "dirt" ], i * 48, 552, true ) );
	}
	for ( i = 0; i < 4; i++ ) {
		this.bg7.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "bg7" ], i * 434, 0, true ) );
	}
	for ( i = 0; i < 5; i++ ) {
		this.bg6.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "bg6" ], i * 346, 185, true ) );
	}
	for ( i = 0; i < 10; i++ ) {
		this.bg5.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "bg5" ], i * 96, 253, true ) );
		this.bg4.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "bg4" ], i * 96, 279, true ) );
	}
	for ( i = 0; i < 3; i++ ) {
		this.bg3.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "bg3" ], i * 460, 305, true ) );
		this.bg2.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "bg2" ], i * 460, 335, true ) );
		this.bg1.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "bg1" ], i * 460, 381, true ) );
	}

	//Background
	this.addChild( this.ground );
	this.addChild( this.bg7 );
	this.addChild( this.bg6 );
	this.addChild( this.bg5 );
	this.addChild( this.bg4 );
	this.addChild( this.bg3 );
	this.addChild( this.bg2 );
	this.addChild( this.bg1 );

	// Bomber
	this.addChild( this.bombGroup );
	this.addChild( this.enemyGroup );
	this.addChild( this.plane );
	this.addChild( this.bombDoor );
	this.addChild( this.explodeGroup );

	// Foreground
	this.addChild( this.grassGroup );
};

myState.update = function() {
	Kiwi.State.prototype.update.call( this );
	
	this.plane.x = this.game.input.mouse.x - 40;
	this.bombDoor.x = this.plane.x + 50;

	this.updateParallax();
	this.checkEnemies();

	// Makes sure only one bomb is dropped
	if ( this.bombDoor.animation.frameIndex === 2 && this.bombDropped ) {
		this.bombDoor.animation.nextFrame();
		this.bombGroup.addChild( new Bomb( this, this.plane.x + 65, 70 ) );
		this.bombDropped = false;
	}
};

myState.dropBomb = function() {
	this.bombDropped = true;
	this.bombDoor.animation.play( "open" );
};

myState.checkEnemies = function() {
	var i, j,
		bombs = this.bombGroup.members,
		enemies = this.enemyGroup.members;

	for ( i = 0; i < bombs.length; i ++) {
		if ( bombs[ i ].physics.overlaps( this.ground, true ) ) {

			// Collides with ground
			this.explodeGroup.addChild(
				new Explosion( this, bombs[ i ].x - 30, bombs[ i ].y - 55 ) );
			bombs[ i ].destroy();
			break;
		}
		for ( j = 0; j < enemies.length; j++ ) {

			// Collides with enemy
			if ( bombs[ i ].physics.overlaps( enemies[ j ] ) ) {
				enemies[ j ].health--;
				this.explodeGroup.addChild(
					new Explosion( this, bombs[ i ].x - 30, bombs[ i ].y ) );
				bombs[ i ].destroy();
				break;
			}
			if ( enemies[ j ].x < -200 ) {
				enemies[ j ].destroy();
				break;
			}
		}
	}
};

myState.spawnSoldier = function() {
	var s = new EnemySoldier( this, this.game.stage.width + 50, 386 );
	this.enemyGroup.addChild( s );
};

myState.spawnTank = function() {
	var t = new EnemyTank( this, this.game.stage.width + 50, 386 );
	this.enemyGroup.addChild( t );
};

myState.updateParallax = function() {
	var i;

	//Ground
	for ( i =0; i < this.grassGroup.members.length; i++ ) {
		this.grassGroup.members[ i ].transform.x -= 1;
		if ( this.grassGroup.members[ i ].transform.worldX <= -48 ) {
			this.grassGroup.members[ i ].transform.x = 48 * 19;
		}
	}

	//bg1
	for ( i =0; i < this.bg1.members.length; i++ ) {
		this.bg1.members[ i ].transform.x -= 1;
		if ( this.bg1.members[ i ].transform.worldX <= -460 ) {
			this.bg1.members[ i ].transform.x =
				460 * ( this.bg1.members.length - 1) ;
		}
	}

	//bg2
	for ( i =0; i < this.bg2.members.length; i++ ) {
		this.bg2.members[ i ].transform.x -= 0.5;
		if ( this.bg2.members[ i ].transform.worldX <= -460 ) {
			this.bg2.members[ i ].transform.x =
				460 * ( this.bg2.members.length - 1 );
		}
	}

	//bg3
	for ( i =0; i < this.bg3.members.length; i++ ) {
		this.bg3.members[ i ].transform.x -= 0.3;
		if ( this.bg3.members[ i ].transform.worldX <= -460 ) {
			this.bg3.members[ i ].transform.x =
				460 * ( this.bg3.members.length - 1 );
		}
	}

	//bg4
	for ( i =0; i < this.bg4.members.length; i++ ) {
		this.bg4.members[ i ].transform.x -= 0.2;
		if ( this.bg4.members[ i ].transform.worldX <= -96) {
			this.bg4.members[ i ].transform.x =
				96 * ( this.bg4.members.length - 1 );
		}
	}

	//bg5
	for ( i =0; i < this.bg4.members.length; i++ ) {
		this.bg5.members[ i ].transform.x -= 0.1;
		if ( this.bg5.members[ i ].transform.worldX <= -96 ) {
			this.bg5.members[ i ].transform.x =
				96 * ( this.bg5.members.length - 1 );
		}
	}

	//bg7
	for ( i =0; i < this.bg7.members.length; i++ ) {
		this.bg7.members[ i ].transform.x -= 0.25;
		if ( this.bg7.members[ i ].transform.worldX <= -434 ) {
			this.bg7.members[ i ].transform.x =
				434 * ( this.bg7.members.length - 1 );
		}
	}
};


// Classes

var Bomb = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "bomb" ], x, y, true );
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics(
		this, this.box) );

	this.physics.acceleration = new Kiwi.Geom.Point( 0, 15 );
	this.physics.velocity = new Kiwi.Geom.Point( 0, 9 );
};
Kiwi.extend( Bomb, Kiwi.GameObjects.Sprite );


var Platform = function ( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "ground" ], x, y, true );
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics(
		this, this.box) );
	this.physics.immovable = true;
};
Kiwi.extend( Platform, Kiwi.GameObjects.Sprite );


var EnemySoldier = function ( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "soldier1" ], x, y );

	this.animation.add( "walk", [ 1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.animation.play( "walk" );

	this.box.hitbox = new Kiwi.Geom.Rectangle( 50, 34, 50, 84 );
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics(
		this, this.box ) );
	this.health = 1;
	this.scaleX = -1;
}
Kiwi.extend( EnemySoldier, Kiwi.GameObjects.Sprite );

EnemySoldier.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );

	this.x -= 3;

	if ( this.health <= 0 ) {
		this.destroy();
	}
};


var EnemyTank = function ( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "tank" ], x, y );

	this.box.hitbox = new Kiwi.Geom.Rectangle( 20, 20, 110, 100 );
	this.physics = this.components.add( new Kiwi.Components.ArcadePhysics(
		this, this.box) );

	this.health = 2;
	this.scaleX = -1;
	this.animation.add( "walk", [ 1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.animation.play( "walk" );
};
Kiwi.extend( EnemyTank, Kiwi.GameObjects.Sprite );

EnemyTank.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );

	this.x -= 2;
	if ( this.health <= 0 ) {
		this.destroy();
	}
};


var Explosion = function ( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "explosion" ], x, y );
	this.animation.add( "explode", [ 0, 1, 2, 3, 4 ], 0.1, false );
	this.animation.play( "explode" );
};
Kiwi.extend( Explosion, Kiwi.GameObjects.Sprite );

Explosion.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );

	this.x -= 2;
	if ( this.animation.currentCell === 4) {
		this.destroy();
	}
};


myGame.states.addState( myState );
myGame.states.switchState( "myState" );
