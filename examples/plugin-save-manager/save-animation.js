var state = new Kiwi.State("Play");

state.preload = function () {
	this.addSpriteSheet(
		"sprite", "./assets/img/anime/griffon.png", 150, 117 );
};

state.create = function () {
	this.text = new Kiwi.GameObjects.Textfield(
		this, "", this.game.stage.width / 2, 10, "#000", 12 );
	this.text.textAlign = "center";
	this.text.alpha = 0;
	this.addChild(this.text);

	this.btn = new Kiwi.HUD.Widget.Button( this.game, "Save Game", 10, 10 );
	this.btn.style.backgroundColor = "#09c";
	this.btn.style.padding = "8px 9px";
	this.btn.style.fontSize = "1.1em";
	this.btn.style.fontFamily = "sans-serif";
	this.btn.style.color = "#fff";
	this.game.huds.defaultHUD.addWidget(this.btn);

	this.spriteOne = new Kiwi.GameObjects.Sprite(
		this, this.textures.sprite, 50, 100, true );
	this.spriteTwo = new Kiwi.GameObjects.Sprite(
		this, this.textures.sprite, 300, 100, true );
	this.spriteThree = new Kiwi.GameObjects.Sprite(
		this, this.textures.sprite, 550, 100, true );

	this.addChild(this.spriteOne);
	this.addChild(this.spriteTwo);
	this.addChild(this.spriteThree);

	// Does the first one exist?
	if ( this.game.saveManager.localStorage.exists( "first" ) ) {
		this.spriteOne.cellIndex =
			this.game.saveManager.localStorage.getData( "first" );
	}

	// Does the second one exist?
	if ( this.game.saveManager.localStorage.exists( "second" ) ) {
		this.spriteTwo.cellIndex =
			this.game.saveManager.localStorage.getData( "second" );
	}

	// Does the third one exist?
	if ( this.game.saveManager.localStorage.exists( "third" ) ) {
		this.spriteThree.cellIndex =
			this.game.saveManager.localStorage.getData( "third" );
	}

	//Add events to each sprite
	this.spriteOne.input.onUp.add( this.increaseOne, this );
	this.spriteTwo.input.onUp.add( this.increaseTwo, this );
	this.spriteThree.input.onUp.add( this.increaseThree, this );
	this.btn.input.onUp.add( this.saveGame, this );
};


state.increaseOne = function () {
	this.spriteOne.cellIndex++;

	if (this.spriteOne.cellIndex > 15 ) {
		this.spriteOne.cellIndex = 0;
	}

	// Add the first sprites cell to localStorage
	this.game.saveManager.localStorage.add(
		"first", this.spriteOne.cellIndex );
};

// Creates a new object and then updates localStorage.
state.increaseTwo = function () {
	this.spriteTwo.cellIndex++;
	if ( this.spriteTwo.cellIndex > 15 ) {
		this.spriteTwo.cellIndex = 0;
	}

	// Add the second sprites cell to localStorage
	this.game.saveManager.localStorage.add(
		"second", this.spriteTwo.cellIndex );
};

state.increaseThree = function () {
	this.spriteThree.cellIndex++;
	if ( this.spriteThree.cellIndex > 15 ) {
		this.spriteThree.cellIndex = 0;
	}

	// Add the third sprites cell to localStorage
	this.game.saveManager.localStorage.add(
		"third", this.spriteThree.cellIndex );
};

state.saveGame = function() {

	// Save the game
	if(this.game.saveManager.localStorage.save()) {
		this.text.text = "Sprite states saved successfully.";
		this.text.alpha = 1;
	} else {
		this.text.text = "Sprite states could not be saved.";
		this.text.alpha = 1;
	}

	this.tween = this.game.tweens.create(this.text);
	this.tween.to(
		{ alpha: 0 }, 2000, Kiwi.Animations.Tweens.Easing.Linear.None);
	this.tween.delay( 2000 );
	this.tween.start();
};


var gameOptions = {
	width: 768,
	height: 512,
	plugins: [ "SaveGame" ]
};


var game = new Kiwi.Game(
		"game-container", "Save and Load Animation", state, gameOptions );
