var myGame = new Kiwi.Game();

var myState = new Kiwi.State( "myState" );

var loadingState = new Kiwi.State( "loadingState" );

var preloader = new Kiwi.State( "preloader" );


myState.preload = function() {

	Kiwi.State.prototype.preload.call(this);

};


myState.create = function(){

	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "background" ], 0, 0, true );

	this.character = new Kiwi.GameObjects.Sprite(
		this, this.textures[ "characterSprite" ], 350, 330, true );

	Kiwi.State.prototype.create.call( this );

	this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.A );
	this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.D );
	this.downKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.S );

	this.character.animation.add(
		"idleright", [ 0 ], 0.1, false );
	this.character.animation.add(
		"crouchright", [ 1 ], 0.1, false );
	this.character.animation.add(
		"moveright", [ 2, 3, 4, 5, 6, 7 ], 0.1, true );
	this.character.animation.add(
		"idleleft", [ 8 ], 0.1, false );
	this.character.animation.add(
		"crouchleft", [ 9 ], 0.1, false );
	this.character.animation.add(
		"moveleft", [ 15, 14, 13, 12, 11, 10 ], 0.1, true );

	this.facing = "right";
	this.character.animation.play( "idleright" );

	this.addChild(this.background);
	this.addChild(this.character);
};


myState.update = function() {

	Kiwi.State.prototype.update.call( this );

	if (this.downKey.isDown) {
		if ( this.character.animation.currentAnimation.name !==
				( "crouch" + this.facing ) ) {
			this.character.animation.play( "crouch" + this.facing );
		}

	} else if ( this.leftKey.isDown ) {
		this.facing = "left";

		if ( this.character.transform.x > 3 ) {
			this.character.transform.x-=3;
		}

		if ( this.character.animation.currentAnimation.name !==
				"moveleft" ) {
			this.character.animation.play( "moveleft" );
		}

	} else if ( this.rightKey.isDown ) {
		this.facing = "right";

		if ( this.character.transform.x < 600 ) {
			this.character.transform.x += 3;
		}

		if ( this.character.animation.currentAnimation.name !==
			"moveright" ) {
			this.character.animation.play("moveright");
		}

	} else if (this.character.animation.currentAnimation.name !==
			"idle" + this.facing) {
		this.character.animation.play( "idle" + this.facing );
	}
};


// Loading assets
preloader.preload = function() {

	Kiwi.State.prototype.preload.call( this );

	this.addImage( "loadingImage", "loadingImage.png", true );
};


preloader.create = function() {

	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "loadingState" );
};


loadingState.preload = function() {

	Kiwi.State.prototype.preload.call( this );

	this.game.states.rebuildLibraries();

	this.game.stage.color = "#E0EDF1";

	this.logo = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "loadingImage" ], 150, 50 );

	this.addChild(this.logo);

	this.logo.alpha = 0;

	this.tweenIn = this.game.tweens.create( this.logo );

	this.tweenIn.to(
		{ alpha: 1 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false );

	this.tweenIn.start();

	// Assets to load
	this.addSpriteSheet( "characterSprite", "character.png", 150, 117 );
	this.addImage( "background", "jungle.png" );
};


loadingState.update = function(){

	Kiwi.State.prototype.update.call(this);

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


myGame.states.addState(myState);
myGame.states.addState(loadingState);
myGame.states.addState(preloader);

myGame.states.switchState("preloader");
