var myState = new Kiwi.State('myState');

	myState.preload = function() {
		//The images we are going to load in.
		this.addImage('bg', './assets/img/plugins/repeating-texture/stars/bg.png');
		this.addImage('mg', './assets/img/plugins/repeating-texture/stars/mg.png');
		this.addImage('fg', './assets/img/plugins/repeating-texture/stars/fg.png');
	}

	myState.create = function() {
		
		//Rescale the stage
		this.game.stage.resize(768, 512);

		//Create the backgrounds
		this.bg = new Kiwi.Plugins.GameObjects.RepeatingTexture(this, this.textures.bg, 0, 0);
		this.mg = new Kiwi.Plugins.GameObjects.RepeatingTexture(this, this.textures.mg, 0, 0);
		this.fg = new Kiwi.Plugins.GameObjects.RepeatingTexture(this, this.textures.fg, 0, 0);


		//'Lock' the backgrounds to the default camera. The width/height of them will be the same as the cameras.
		this.bg.camera = this.game.cameras.defaultCamera;
		this.mg.camera = this.game.cameras.defaultCamera;
		this.fg.camera = this.game.cameras.defaultCamera;


		//Add to the stage
		this.addChild(this.bg);
		this.addChild(this.mg);
		this.addChild(this.fg);

	}

	myState.update = function() {

		Kiwi.State.prototype.update.call( this );

		this.mg.cellOffsetX = this.game.input.mouse.x / 2;
		this.mg.cellOffsetY = this.game.input.mouse.y / 2;

		this.fg.cellOffsetX = this.game.input.mouse.x ;
		this.fg.cellOffsetY = this.game.input.mouse.y ;

	}


	var game = new Kiwi.Game( "game-container",'Stars', myState, { plugins: ['RepeatingTexture'] } );