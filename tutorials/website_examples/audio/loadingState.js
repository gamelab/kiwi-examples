var loadingState = new Kiwi.State( "loadingState" );
var preloader = new Kiwi.State( "preloader" );

// Loading assets
preloader.preload = function(){
	Kiwi.State.prototype.preload.call( this );
	this.addImage( "loadingImage", "loadingImage.png", true );
};

preloader.create = function() {
	Kiwi.State.prototype.create.call( this );
	this.game.states.switchState( "loadingState" );
};

loadingState.preload = function() {
	Kiwi.State.prototype.preload.call( this );

	console.log( this.textures );
	this.game.stage.color = "#E0EDF1";
	this.logo = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "loadingImage" ], 150, 50 );

	this.addChild( this.logo );

	this.logo.alpha = 0;
	this.tweenIn = new Kiwi.Animations.Tween;
	this.tweenIn = this.game.tweens.create( this.logo );
	this.tweenIn.to(
		{ alpha: 1 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);
	this.tweenIn.start();

	// Assets to load
	this.addImage( "grass", "assets/grass.png" );
	this.addImage( "dirt", "assets/dirt.png" );
	this.addSpriteSheet( "characterSprite", "assets/soldier.png", 150, 117 );
	this.addSpriteSheet( "guns", "assets/guns.png", 150, 117 );
	this.addImage( "background", "assets/background.png" );
	this.addImage( "bullet", "assets/bullet.png" );
	this.addSpriteSheet( "audioOnOff", "assets/audioOnOff.png", 60, 60 );
	this.addImage( "ground", "assets/ground.png" );
	this.addImage( "bomb", "assets/war-bomb.png" );

	this.addAudio( "machineGun", "assets/sound/machine-gun.mp3" );
	this.addAudio( "rifle", "assets/sound/rifle.mp3" );
	this.addAudio( "sniper", "assets/sound/sniper.mp3" );
	this.addAudio( "backgroundMusic", "assets/sound/background-music.mp3" );
	this.addAudio( "switchSound", "assets/sound/switch.mp3" );
	this.addAudio( "boomSound", "assets/sound/boom.mp3" );

	this.addSpriteSheet("explosion", "assets/explosion.png", 129, 133 );
};

loadingState.update = function(){
	Kiwi.State.prototype.update.call( this );
};

loadingState.create = function() {
	Kiwi.State.prototype.create.call( this );
	console.log( "inside create of loadingState" );
	this.tweenOut = this.game.tweens.create( this.logo );
	this.tweenOut.to(
		{ alpha: 0 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false );
	this.tweenOut.onComplete( this.switchToMain, this );
	this.tweenOut.start();
};

loadingState.switchToMain = function() {
	this.game.states.switchState( "myState" );
};
