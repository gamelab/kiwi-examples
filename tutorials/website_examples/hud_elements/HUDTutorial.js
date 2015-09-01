var myGame = new Kiwi.Game();

var myState = new Kiwi.State( "myState" );

myState.preload = function() {

	Kiwi.State.prototype.preload.call( this );
	this.addImage( "grass", "assets/grass.png" );
	this.addImage( "dirt", "assets/dirt.png" );
	this.addSpriteSheet( "characterSprite", "assets/soldier.png", 150, 117 );
	this.addSpriteSheet( "guns", "assets/guns.png", 150, 117 );
	this.addImage( "background", "assets/background.png" );
	this.addImage( "bullet", "assets/bullet.png" );
	this.addSpriteSheet( "audioOnOff", "assets/audioOnOff.png", 60, 60 );
	this.addAudio( "machineGun", "assets/sound/machine-gun.mp3" );
	this.addAudio( "rifle", "assets/sound/rifle.mp3" );
	this.addAudio( "sniper", "assets/sound/sniper.mp3" );
	this.addAudio( "backgroundMusic", "assets/sound/background-music.mp3" );
	this.addImage( "ground", "assets/ground.png" );
	this.addImage( "bomb", "assets/war-bomb.png" );
	this.addAudio( "switchSound", "assets/sound/switch.mp3" );
	this.addAudio( "boomSound", "assets/sound/boom.mp3" );

	this.addSpriteSheet( "explosion", "assets/explosion.png", 129, 133 );
};


myState.create = function(){
	Kiwi.State.prototype.create.call( this );

	// Elements of the game
	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "background" ], 0, 0 );
	this.character = new Soldier( this, 150, 310 );
	this.gun = new Guns( this, this.character.x, this.character.y );
	this.audioToggle = new Kiwi.GameObjects.Sprite(
		this, this.textures[ "audioOnOff" ], 700, 0, true );
	this.bulletGroup = new Kiwi.Group( this );
	this.bombGroup = new Kiwi.Group( this );
	this.explodeGroup= new Kiwi.Group( this );
	this.grassGroup = new Kiwi.Group( this );
	this.mouse = this.game.input.mouse;
	this.platform = new Platform( this, 0, 475);
	this.score = 0;

	// Creating HUD Widgets
	this.playersHealth = new Kiwi.HUD.Widget.Bar(
		this.game, 100, 100, 300, 50, 80, 5 );
	this.playersHealth.bar.style.backgroundColor = "#00eb21";
	this.playersHealth.style.backgroundColor = "#ff0000";

	this.scoreBoard = new Kiwi.HUD.Widget.TextField(
		this.game, "Your score: 0", 10, 30 );
	this.scoreBoard.style.fontFamily = "helvetica";

	this.ammoBar = new Kiwi.HUD.Widget.IconBar(
		this.game, this.textures[ "bullet" ], 30, 30, 10, 10 );

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
	this.reloadKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.R );

	this.oneKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.ONE );
	this.twoKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.TWO );
	this.threeKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.THREE );

	// Character Animations
	this.character.animation.add( "idle", [ 0 ], 0.1, false );
	this.character.animation.add( "walk", [ 1, 2, 3, 4, 5, 6 ], 0.1, true );
	this.character.animation.play( "idle" );
	this.audioToggle.animation.add( "state", [ 0, 1 ], 0.1, false );

	// Adding grass tiles
	for( var i = 0; i < 20; i++ ) {
		this.grassGroup.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "grass" ], i * 48, 475, true ) );
		this.grassGroup.addChild( new Kiwi.GameObjects.Sprite(
			this, this.textures[ "dirt" ], i * 48, 512, true ) );
	}

	// Adding objects to state
	this.addChild( this.platform );
	this.addChild( this.background );
	this.addChild( this.bombGroup );
	this.addChild( this.explodeGroup );
	this.addChild( this.audioToggle );
	this.addChild( this.bulletGroup );
	this.addChild( this.character );
	this.addChild( this.gun );
	this.addChild( this.grassGroup );

	// Adding HUD elements to defaultHUD
	this.game.huds.defaultHUD.addWidget( this.scoreBoard );
	this.game.huds.defaultHUD.addWidget( this.playersHealth );
	this.game.huds.defaultHUD.addWidget( this.ammoBar );
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
	this.playerHealth();
};


myState.checkBounce = function() {
	bombBounce = this.bombGroup.members;
	for ( i = 0; i < bombBounce.length; i++ ) {
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
				this.explodeGroup.addChild(
					new Explosion(
						this, bullets[ i ].x - 60, bullets[ i ].y - 85 ) );
				this.score += 10;
				this.scoreBoard.text = "Your score: " + this.score;
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
	this.character.physics.overlaps( this.platform, true );
};


myState.movement = function() {
	if ( this.leftKey.isDown ) {
		if (this.character.transform.x > 3 ) {
			this.character.transform.x -= 3;
		}
		this.character.scaleX = -1;
		this.gun.scaleX = -1;
		if ( this.character.animation.currentAnimation.name !== "walk" ) {
			this.character.animation.play( "walk" );
		}
	}
	else if ( this.rightKey.isDown ) {

		if (this.character.transform.x < 600) {
			this.character.transform.x += 3;
		}

		this.character.scaleX = 1;
		this.gun.scaleX = 1;
		if ( this.character.animation.currentAnimation.name !== "walk" ) {
			this.character.animation.play( "walk" );
		}
	}
	else {
		this.character.animation.play( "idle" );
	}
	this.gun.x = this.character.x;
	this.gun.y = this.character.y;
};


myState.playerHealth = function() {
	this.playersHealth.update();
	bombsHitPlay = this.bombGroup.members;
	this.playersHealth.x = this.character.x + 25;
	this.playersHealth.y = this.character.y + 10;

	for ( i = 0; i < bombsHitPlay.length; i++ ) {
		if ( this.character.physics.overlaps( bombsHitPlay[ i ] ) ) {
			if ( this.backgroundMusic.isPlaying ) {
				this.boomSound.stop();
				this.boomSound.play();
			}

			this.playersHealth.counter.current -= 10;
			this.explodeGroup.addChild( new Explosion(
				this, bombsHitPlay[ i ].x - 60, bombsHitPlay[ i ].y - 85 ) );
			bombsHitPlay[ i ].destroy();
		}
	}
};


myState.shoot = function() {
	if ( this.reloadKey.isDown ) {
		this.ammoBar.counter.current = 30;
		this.reloadKey.reset();
		if ( this.backgroundMusic.isPlaying ) {
			this.switchSound.stop();
			this.switchSound.play();
		}
	}
	if ( this.mouse.isDown && this.ammoBar.counter.current > 0 ) {
		this.ammoBar.counter.current -= 1;

		// Machine Gun
		if ( this.gun.animation.currentAnimation.name === "machineGun" ) {
			if ( this.character.scaleX === -1 ) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 30, this.character.y + 75,
						200 * this.character.scaleX, 0 ) );
			}
			else if ( this.character.scaleX === 1 ) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x + 110, this.character.y + 75,
						200 * this.character.scaleX, 0 ) );
			}
			if ( this.backgroundMusic.isPlaying ) {
				this.machineGunSound.play();
			}
		}

		// Rifle
		else if(this.gun.animation.currentAnimation.name === "rifle" ) {
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
			this.ammoBar.counter.current -= 2;

			this.mouse.reset();
		}

		// Sniper
		else if ( this.gun.animation.currentAnimation.name === "sniper" ) {
			if ( this.character.scaleX === -1 ) {
				this.bulletGroup.addChild(
					new Bullet( this,
						this.character.x - 5, this.character.y + 72,
						200 * this.character.scaleX, 0 ) );
			} else if ( this.character.scaleX === 1 ) {
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


myState.spawnBomb = function() {
	var s = new Bomb( this, this.game.stage.width, 386 );
	this.bombGroup.addChild( s );
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


myState.toggleMusic = function() {
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


// Classes


var Guns = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "guns" ], x, y, false );
	this.animation.add( "machineGun", [ 0 ], 0.1, false );
	this.animation.add( "rifle", [ 1 ], 0.1, false );
	this.animation.add( "sniper", [ 2 ], 0.1, false );
	this.animation.play( "rifle" );
};
Kiwi.extend( Guns, Kiwi.GameObjects.Sprite );


var Bullet = function( state, x, y, xVelo, yVelo ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "bullet" ], x, y, false );
	this.physics = this.components.add(
		new Kiwi.Components.ArcadePhysics( this, this.box ) );
	this.physics.velocity.x = xVelo;
	this.physics.velocity.y = yVelo;
};
Kiwi.extend( Bullet, Kiwi.GameObjects.Sprite );


Bullet.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call(this );

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
		new Kiwi.Components.ArcadePhysics( this, this.box) );
	this.physics.immovable = true;
};
Kiwi.extend( Platform,Kiwi.GameObjects.Sprite );


Platform.prototype.update = function() {
	Kiwi.GameObjects.Sprite.prototype.update.call( this );
};


var Bomb = function( state, x, y ) {
	Kiwi.GameObjects.Sprite.call(
		this, state, state.textures[ "bomb" ], x, y);

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


var Explosion = function ( state, x, y ) {
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


myGame.states.addState( myState );
myGame.states.switchState( "myState" );
