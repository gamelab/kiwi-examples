var outsideState = new Kiwi.State( "OutsideState" );

outsideState.create = function(){
	Kiwi.State.prototype.create.call(this);

	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "outside" ], 0, 0 );

	this.character = new Kiwi.GameObjects.Sprite(
		this, this.textures[ "characterSprite" ], 319, 232 );

	this.leftKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.A );
	this.rightKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.D );
	this.downKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.S );
	this.stateKey = this.game.input.keyboard.addKey(
		Kiwi.Input.Keycodes.ENTER );

	this.character.animation.add(
		"idleright", [ 0 ], 0.1, false );
	this.character.animation.add(
		"crouchright", [1], 0.1, false );
	this.character.animation.add(
		"moveright", [ 2, 3, 4, 5, 6, 7 ], 0.1, true );
	this.character.animation.add(
		"idleleft", [ 8 ], 0.1, false );
	this.character.animation.add(
		"crouchleft", [ 9 ], 0.1, false );
	this.character.animation.add(
		"moveleft", [ 10, 11, 12, 13, 14, 15 ], 0.1, true );

	this.facing = "left";

	this.character.animation.play( "idleleft" );

	this.addChild( this.background );
	this.addChild( this.character );
};


outsideState.update = function(){
	Kiwi.State.prototype.update.call( this );

	if ( this.stateKey.isDown &&
		this.character.transform.x > 300 &&
		this.character.transform.x < 365 ) {

		this.game.states.switchState( "InteriorState" );
	}

	if ( this.downKey.isDown ) {

		if ( this.character.animation.currentAnimation.name !==
				( "crouch" + this.facing ) ) {
			this.character.animation.play( "crouch" + this.facing );
		}
	}
	else if ( this.leftKey.isDown ) {

		this.facing = "left";
		if ( this.character.transform.x > 3 ) {
			this.character.transform.x -= 3;
		}
		if ( this.character.animation.currentAnimation.name !== "moveleft" ) {
			this.character.animation.play( "moveleft" );
		}
	}
	else if ( this.rightKey.isDown ) {

		this.facing = "right";
		if ( this.character.transform.x < 600 ) {
			this.character.transform.x += 3;
		}
		if ( this.character.animation.currentAnimation.name !== "moveright" ) {
			this.character.animation.play( "moveright" );
		}
	}
	else {
		if ( this.character.animation.currentAnimation.name !==
				"idle" + this.facing ) {
			this.character.animation.play( "idle" + this.facing );
		}
	}
};
