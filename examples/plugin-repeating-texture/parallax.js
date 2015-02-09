var myState = new Kiwi.State('myState');

myState.preload = function() {
	//The images we are going to load in.
	this.addImage('background', './assets/img/plugins/repeating-texture/grass/background.png');
	this.addImage('foreground', './assets/img/plugins/repeating-texture/grass/foreground.png');
	this.addImage('middle', './assets/img/plugins/repeating-texture/grass/middle.png');
}

myState.create = function() {
	
	this.game.stage.resize(768, 512);

	this.bg = new Kiwi.Plugins.GameObjects.RepeatingTexture(this, this.textures.background, 0, 0);

	//Set the width of the area that the image will take up.
	this.bg.width = this.game.stage.width;
	this.bg.height = this.game.stage.height;
	
	//You can set the cellOffset. You modify these properties 'on' the fly to maintain your 'paralax' effect
	this.bg.cellOffsetX = 0;
	this.bg.cellOffsetY = 0;

	this.addChild(this.bg);

	this.mg = new Kiwi.Plugins.GameObjects.RepeatingTexture(this, this.textures.middle, 0, 0);

	//Set the width of the area that the image will take up.
	this.mg.width = this.game.stage.width;
	this.mg.height = this.game.stage.height;

	//Stop the background from unneed rendering on an axis. Also is a repeatX
	this.mg.repeatY = false;

	//Offset moves the image down when rendering, useful if 'locked' via a camera
	this.mg.offsetX = 0;	
	this.mg.offsetY = 182;	
	this.addChild(this.mg);


	this.fg = new Kiwi.Plugins.GameObjects.RepeatingTexture(this, this.textures.foreground, 0, 0);

	//Set the width of the area that the image will take up.
	this.fg.width = this.game.stage.width;
	this.fg.height = this.game.stage.height;

	//Stop the background from unneed rendering on an axis. Also is a repeatX
	this.fg.repeatY = false;

	//Offset moves the image down when rendering, useful if 'locked' via a camera
	this.fg.offsetX = 0;
	this.fg.offsetY = 210;
	this.addChild(this.fg);

}

myState.update = function() {

	Kiwi.State.prototype.update.call( this );

	this.bg.cellOffsetX += 0;
	this.mg.cellOffsetX += 2;
	this.fg.cellOffsetX += 3;

}

var game = new Kiwi.Game( "game-container", 'Paralax', myState, { plugins: ['RepeatingTexture'], renderer: Kiwi.RENDERER_WEBGL } );

