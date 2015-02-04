var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL,/*
	deviceTarget: Kiwi.TARGET_COCOON,
	scaleType: Kiwi.Stage.SCALE_FIT*/ //,
	width: 400,
	height: 300
}

var game = new Kiwi.Game('game-container', "game", null, gameOptions);

var loader = new KiwiLoadingScreen('loader', 'state', './assets/img/plugins/uber-shader/img/loading/');

loader.preload = function () {
    KiwiLoadingScreen.prototype.preload.call(this);

    /**
    * Load assets
    **/
    this.addImage( 'background', './assets/img/plugins/uber-shader/mydesk_blur.png' );

    this.addImage( 'black', './assets/img/plugins/uber-shader/black.png' );
    this.addImage( 'reflectionMap', './assets/img/plugins/uber-shader/SphereMap_mydesk.png' );
    this.addImage( 'irradianceMap', './assets/img/plugins/uber-shader/SphereMap_mydesk_irradiance.png' );

    // Load multitexture assets
    this.addImage( 'handDiff', './assets/img/plugins/uber-shader/ZachHandYellow_diff.png' );
    this.addImage( 'handNorm', './assets/img/plugins/uber-shader/ZachHand1_normSharp.png' );
    this.addImage( 'handSpec', './assets/img/plugins/uber-shader/ZachHandPlastic_spec.png' );
    this.addImage( 'handSpecMetal', './assets/img/plugins/uber-shader/ZachHandMetal_spec.png' );
    this.addImage( 'handEmit', './assets/img/plugins/uber-shader/ZachHand1_emit.png' );
    this.addImage( 'handTint', './assets/img/plugins/uber-shader/ZachHand1_tint.png' );

};

game.states.addState( loader );


var state = new Kiwi.State('state');

state.preload = function()
{
	Kiwi.State.prototype.preload.call(this);
}

state.create = function()
{
	Kiwi.State.prototype.create.call(this);
	
	this.background = new Kiwi.GameObjects.StaticImage( this, this.textures['background'], 0,0 );
    this.background.anchorPointX = 0;
    this.background.anchorPointY = 0;
    this.background.scale = 2;
	this.text = new Kiwi.GameObjects.Textfield(this, 'Move Pointer To Illuminate', this.game.stage.width * 0.3, 10, '#fff', 12);
	this.text.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;
	
	this.addChild( this.background );
	this.addChild( this.text );

	// Create multitextures
	var multiTextures = [
		this.textures.handDiff.image,
		this.textures.handNorm.image,
		this.textures.handSpec.image,
		this.textures.black.image,
		this.textures.black.image,
        this.textures.irradianceMap.image,
        this.textures.reflectionMap.image
	];
	var handMTA = new Kiwi.Textures.MultiTextureAtlas("handMTA", Kiwi.Textures.MultiTextureAtlas.SINGLE_IMAGE, this.textures.handDiff.cells, multiTextures, null);
    this.textureLibrary.add( handMTA );

    // Create lit hand
    this.hand = new Kiwi.GameObjects.StaticImage( this, this.textures['handMTA'], -16, 50 );
    this.hand.glRenderer = this.game.renderer.requestSharedRenderer( "UberShaderRenderer" );
    this.hand.glRenderer.game = this.game;
    this.hand.glRenderer.gamma = 1.0;
    this.addChild( this.hand );

    // Hand 1 nail tints
    var nailTints = [
        [ 200/256, 163/256, 172/256, 0.2 ], // Natural
        [ 233/256, 133/256, 158/256, 0.5 ], // Rose
        [ 245/256, 72/256, 63/256, 0.8 ],   // Brick
        [ 30/256, 6/256, 5/256, 0.0 ] ,     // Black
        [ 24/256, 107/256, 219/256, 1.0 ]   // Sky
    ];
    this.hand.uberTints = {
        tint1: nailTints[ Math.floor(Math.random() * nailTints.length) ],
        tint2: nailTints[ Math.floor(Math.random() * nailTints.length) ],
        tint3: nailTints[ Math.floor(Math.random() * nailTints.length) ]
    };

    // Create another hand
    multiTextures = [
        this.textures.handDiff.image,
        this.textures.handNorm.image,
        this.textures.handSpecMetal.image,
        this.textures.black.image,
        this.textures.black.image,
        this.textures.irradianceMap.image,
        this.textures.reflectionMap.image
    ];
    var hand2MTA = new Kiwi.Textures.MultiTextureAtlas("hand2MTA", Kiwi.Textures.MultiTextureAtlas.SINGLE_IMAGE, this.textures.handDiff.cells, multiTextures, null);
    this.textureLibrary.add( hand2MTA );
    this.hand2 = new Kiwi.GameObjects.StaticImage( this, this.textures['handDiff'], 160, -16 );
    this.hand2.rotation = Math.PI;
    // Reassign multitexture
    this.hand2.atlas = hand2MTA;
    this.hand2.glRenderer = this.game.renderer.requestSharedRenderer( "UberShaderRenderer" );
    this.addChild( this.hand2 );
    this.hand2.uberTints = {
        tint1: nailTints[ Math.floor(Math.random() * nailTints.length) ],
        tint2: nailTints[ Math.floor(Math.random() * nailTints.length) ],
        tint3: nailTints[ Math.floor(Math.random() * nailTints.length) ]
    };


    // Setup lights
    var lights = this.hand.glRenderer.lights;
    for( var i = 0;  i < lights.length;  i++ ) {
    	lights[i].lightPosition = [Math.random() * this.game.stage.width, Math.random() * this.game.stage.height, Math.random() * this.game.stage.height];
    	lights[i].lightColor = [Math.random(), Math.random(), Math.random()];
    	lights[i].lightIntensity = 00;
    }
    // Blue Light
    lights[0].lightColor = [1.0,1.0,1.0];
    lights[0].lightIntensity = 100;
    // lights[0].lightFalloff = 0.0;
    // Red Light
    lights[1].lightColor = [1.0,1.0,1.0];
    lights[1].lightIntensity = 100;
    // lights[1].lightFalloff = 0.0;
    // Night light
    lights[2].lightColor = [0.25,0.25,1.0];
    lights[2].lightIntensity = 00;
    // Torch light
    lights[3].lightColor = [1.0,0.5,0.25];
    lights[3].lightIntensity = 00;
    // Mouselight
    lights[4].lightColor = [1.0, 1.0, 1.0];
    lights[4].lightIntensity = 100;

	lights[0].lightPosition = [this.game.stage.width * 0.5, this.game.stage.height * -3, 100];
	lights[1].lightPosition = [this.game.stage.width * 0.5, this.game.stage.height * 4, 300];
	lights[2].lightPosition = [-this.game.stage.width * 0.5, this.game.stage.height * 0.5, 00];
	lights[3].lightPosition = [this.game.stage.width * 1.5, this.game.stage.height * 0.5, 100];

    // Lighting group
    this.lightTestGroup = new Kiwi.Group( this );
    this.lightTestGroup.addChild( this.hand );
    this.lightTestGroup.addChild( this.hand2 );
    this.lightTestGroup.anchorPointX = 0;
    this.lightTestGroup.anchorPointY = 0;
    this.addChild( this.lightTestGroup );

    // Background darken
    this.game.stage.color = "000000";
}

state.update = function()
{
	Kiwi.State.prototype.update.call( this );

    this.hand.rotation = Math.sin(this.game.idealFrame * 0.01) * 0.1;
    this.hand2.rotation = Math.sin(this.game.idealFrame * 0.013) * 0.1 + Math.PI;

    // Acquire pointer
    var np = new Kiwi.Geom.Point( this.game.input.position.x, this.game.input.position.y );
    this.hand.glRenderer.lights[4].lightPosition = [ np.x, np.y, 150 ];
    this.hand.glRenderer.lights[0].lightPosition = [ np.x + 250, np.y, 100 ];
    this.hand.glRenderer.lights[1].lightPosition = [ np.x - 250, np.y, 100 ];
}

game.states.addState( state );
game.states.switchState( 'loader' );