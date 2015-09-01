var myGame = new Kiwi.Game();

var myState = new Kiwi.State( "myState" );

myState.create = function() {
	Kiwi.State.prototype.create.call( this );

	// Elements of the game
	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "background" ], 0, 0 );
	this.character = new Soldier( this, 150, 310 );
	this.gun = new Guns( this, this.character.x, this.character.y );
	this.audioToggle = new Kiwi.GameObjects.Sprite(
		this, this.textures[ "audioOnOff" ], 30, 20, true );
	this.bulletGroup = new Kiwi.Group( this );
	this.bombGroup = new Kiwi.Group( this );
	this.explodeGroup= new Kiwi.Group( this );
	this.grassGroup = new Kiwi.Group( this );
	this.mouse = this.game.input.mouse;
	this.platform = new Platform( this, 0, 475 );

	// Timer event to spawn bombs
	this.timer = this.game.time.clock.createTimer(
		"spawnTroop", 1.5, -1, true );
	this.timerEvent = this.timer.createTimerEvent(
		Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnBomb, this );

	// Audio objects
	this.machineGunSound = new Kiwi.Sound.Audio(
		this.game, "machineGun", 1, false );
	this.rifleSound = new Kiwi.Sound.Audio(
		this.game, "rifle", 1, false );
	this.sniperSound = new Kiwi.Sound.Audio(
		this.game, "sniper", 1, false );
	this.switchSound = new Kiwi.Sound.Audio(
		this.game, "switchSound", 1, false );
	this.boomSound = new Kiwi.Sound.Audio(
		this.game, "boomSound", 1, false );

	this.backgroundMusic = new Kiwi.Sound.Audio(
		this.game, "backgroundMusic", 0.3, true );
	this.backgroundMusic.play();

	// Controls
	this.leftKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.A );
	this.rightKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.D );

	this.oneKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.ONE );
	this.twoKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.TWO );
	this.threeKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.THREE );

	// Character Animations
	this.character.animation.add( "idle", [ 0 ], 0.1, false );
	this.character.animation.add( "walk", [ 1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.character.animation.play( "idle");
	this.audioToggle.animation.add( "state", [ 0, 1 ], 0.1, false );

	// Adding grass tiles
	for ( var i = 0; i < 20; i++ ){
		this.grassGroup.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "grass" ], i * 48, 475, true ) );
		this.grassGroup.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "dirt" ], i * 48, 512, true ) );

	}
	this.addChild( this.platform );
	this.addChild( this.background );
	this.addChild( this.bombGroup );
	this.addChild( this.explodeGroup );
	this.addChild( this.audioToggle );
	this.addChild( this.bulletGroup );
	this.addChild( this.character );
	this.addChild( this.gun );

	this.addChild( this.grassGroup );
};

myState.update = function() {
	Kiwi.State.prototype.update.call( this );
	this.movement();
	this.switchGun();
	this.toggleMusic();
	this.shoot();
	this.checkPlatform();
	this.checkCollisions();
	this.checkBounce();
};

myState.checkBounce = function() {
	bombBounce = this.bombGroup.members;
	for(i = 0; i < bombBounce.length; i++){
		if ( bombBounce[ i ].physics.overlaps( this.platform, true ) ) {
			bombBounce[ i ].bounce();
		}
	}
};

myState.checkCollisions = function() {
	var i, j,
		bullets = this.bulletGroup.members,
		bombs = this.bombGroup.members;
	for ( i = 0; i < bullets.length; i++ ) {
		for ( j = 0; j < bombs.length; j++ ) {
			if ( bullets[ i ].physics.overlaps( bombs[ j ] ) ) {
				if ( this.backgroundMusic.isPlaying ) {
					this.boomSound.stop();
					this.boomSound.play();
				}
				this.explodeGroup.addChild( new Explosion(
					this, bullets[ i ].x - 60, bullets[ i ].y - 85 ) );
				bombs[ j ].destroy();
				bullets[ i ].destroy();
				break;
			}
			if ( bombs[ j ].x < -200 ) {
				bombs[ j ].destroy();
				break;
			}
		}
	}
};

myState.checkPlatform = function() {
	this.character.physics.overlaps( this.platform,true );
};

myState.spawnBomb = function() {
	var s = new Bomb( this, this.game.stage.width-100, 386 );
	this.bombGroup.addChild( s );
};

myState.toggleMusic = function(){
	if ( this.mouse.isDown &&
		this.audioToggle.box.bounds.containsPoint(
			new Kiwi.Geom.Point( this.mouse.x, this.mouse.y ) ) ) {
		this.audioToggle.animation.nextFrame();
		if ( this.backgroundMusic.isPlaying ) {
			this.backgroundMusic.stop();
		} else {
			this.backgroundMusic.play();
		}
		this.mouse.reset();
	}
};

myState.shoot = function() {
	if ( this.mouse.isDown ) {
		if ( this.gun.animation.currentAnimation.name === "machineGun") {
			if ( this.character.scaleX === -1) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 30, this.character.y + 75,
						200 * this.character.scaleX, 0 ) );
			} else if ( this.character.scaleX === 1 ) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 110, this.character.y + 75,
						200 * this.character.scaleX, 0 ) );
			}
			if ( this.backgroundMusic.isPlaying ) {
				this.machineGunSound.play();
			}
		} else if ( this.gun.animation.currentAnimation.name === "rifle" ) {
			if ( this.character.scaleX === -1 ) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 20, this.character.y + 80,
						200 * this.character.scaleX, 0 ) );
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 20, this.character.y + 80,
						180 * this.character.scaleX, 25 ) );
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 20, this.character.y + 80,
						180 * this.character.scaleX, -25 ) );
			} else if ( this.character.scaleX === 1 ) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 120, this.character.y + 80,
						200 * this.character.scaleX, 0 ) );
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 120, this.character.y + 80,
						180 * this.character.scaleX, 25 ) );
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 120, this.character.y + 80,
						180 * this.character.scaleX, -25 ) );
			}
			if ( this.backgroundMusic.isPlaying ) {
				this.rifleSound.stop();
				this.rifleSound.play();
			}
			this.mouse.reset();

		} else if ( this.gun.animation.currentAnimation.name === "sniper") {
			if ( this.character.scaleX === -1 ) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x - 5 , this.character.y + 72,
						200 * this.character.scaleX, 0 ) );
			} else if (this.character.scaleX === 1) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 145, this.character.y + 72,
						200 * this.character.scaleX, 0 ) );
			}
			this.mouse.reset();
			if ( this.backgroundMusic.isPlaying ) {
				this.sniperSound.stop();
				this.sniperSound.play();
			}
		}
	}
};


myState.switchGun = function() {
	if ( this.oneKey.isDown ) {
		this.gun.animation.play( "rifle" );
		if ( this.backgroundMusic.isPlaying ) {
			this.switchSound.stop();
			this.switchSound.play();
		}
		this.oneKey.reset();
	}
	if ( this.twoKey.isDown ) {
		this.gun.animation.play( "sniper" );
		if ( this.backgroundMusic.isPlaying ) {
			this.switchSound.stop();
			this.switchSound.play();
		}
		this.twoKey.reset();
	}
	if ( this.threeKey.isDown ) {
		this.gun.animation.play( "machineGun" );
		if ( this.backgroundMusic.isPlaying ) {
			this.switchSound.stop();
			this.switchSound.play();
		}
		this.threeKey.reset();
	}
};


myState.movement = function() {
	if ( this.leftKey.isDown ) {
		if (this.character.transform.x > 3) {
			this.character.transform.x -= 3;
		}
		this.character.scaleX = -1;
		this.gun.scaleX = -1;
		if ( this.character.animation.currentAnimation.name !== "walk" ) {
			this.character.animation.switchTo( "walk", true );
		}
	} else if ( this.rightKey.isDown ) {

		if ( this.character.transform.x < 600 ) {
			this.character.transform.x += 3;
		}

		this.character.scaleX = 1;
		this.gun.scaleX = 1;
		if ( this.character.animation.currentAnimation.name !== "walk") {
			this.character.animation.switchTo( "walk", true );
		}
	}
	else {
		this.character.animation.play( "idle" );
	}
	this.gun.x = this.character.x;
	this.gun.y = this.character.y;
};

// Classes

var Guns = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "guns" ], x, y, false );
	this.animation.add( "machineGun", [ 0 ], 0.1, false );
	this.animation.add( "rifle", [ 1 ], 0.1, false );
	this.animation.add( "sniper", [ 2 ], 0.1, false );
	this.animation.play( "rifle" );
	Guns.prototype.update = function() {
		Kiwi.GameObjects.Sprite.prototype.update.call( this );
	}
};
Kiwi.extend( Guns,Kiwi.GameObjects.Sprite );


var Bullet = function( state, x, y, xVelo, yVelo ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "bullet" ], x, y, false );
	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.velocity.x = xVelo;
	this.physics.velocity.y = yVelo;
};
Kiwi.extend( Bullet, Kiwi.GameObjects.Sprite );

Bullet.prototype.update = function(){
	Kiwi.GameObjects.Sprite.prototype.update.call(this);

	if (this.x > myGame.stage.width || this.x < 0 ) {
		this.destroy();
	}
};


var Soldier = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "characterSprite" ], x, y );

	this.animation.add( "walk", [ 1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.animation.play( "walk" );

	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.acceleration.y = 5;
};
Kiwi.extend( Soldier, Kiwi.GameObjects.Sprite );


var Platform = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "ground" ], x, y, true );
	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.immovable = true;
};
Kiwi.extend( Platform, Kiwi.GameObjects.Sprite );


var Bomb = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "bomb" ], x, y );
	this.box.hitbox = new Kiwi.Geom.Rectangle( 20, 20, 25, 25 );
	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.acceleration.y = 4;
	this.physics.velocity.x = -12;
};
Kiwi.extend( Bomb, Kiwi.GameObjects.Sprite );

Bomb.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );

	this.rotation -= 0.05;
};

Bomb.prototype.bounce = function() {
	this.physics.velocity.y = -22;
};


var Explosion = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "explosion" ], x, y );
	this.animation.add( "explode", [ 0, 1, 2, 3, 4 ], 0.1, false );
	this.animation.play( "explode" );
};
Kiwi.extend( Explosion, Kiwi.GameObjects.Sprite );

Explosion.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );

	if ( this.animation.currentCell === 4 ) {
		this.destroy();
	}
};

myGame.states.addState(myState);
myGame.states.addState(loadingState);
myGame.states.addState(preloader, true);
