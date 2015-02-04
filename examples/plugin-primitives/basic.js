var state = new Kiwi.State('Play');

state.preload = function () {
	Kiwi.State.prototype.preload.call(this);
};

state.create = function () {
	var blobFloaterAng, blobFloaterDist, blobGlowRenderer,
		i, params, vignetteStep,
		xStart = 120,
		xStep = 80;

	this.foregroundObjects = [];

	// Demo triangles
	params = {
		state: this,
		points: [ [ 25, 0 ], [ 50, 60 ], [ 0, 60 ] ],
		x: xStart,
		y: 80,
		color: [ 1.0, 0.2, 0.1 ]
	};
	this.triangleStroke = new Kiwi.Plugins.Primitives.Triangle( params );

	params.drawStroke = false;
	params.x += xStep;
	params.color = [ 1.0, 0.3, 0.1 ];
	this.triangleNoStroke = new Kiwi.Plugins.Primitives.Triangle( params );

	params.drawStroke = true;
	params.drawFill = false;
	params.x += xStep;
	this.triangleNoFill = new Kiwi.Plugins.Primitives.Triangle( params );

	// Demo rectangles
	params = {
		state: this,
		width: 50,
		height: 60,
		x: xStart,
		y: 180,
		color: [ 1.0, 0.4, 0.1 ]
	};
	this.rectangleStroke = new Kiwi.Plugins.Primitives.Rectangle( params );

	params.drawStroke = false;
	params.x += xStep;
	params.color = [ 1.0, 0.5, 0.1 ];
	this.rectangleNoStroke = new Kiwi.Plugins.Primitives.Rectangle( params );

	params.drawStroke = true;
	params.drawFill = false;
	params.x += xStep;
	this.rectangleNoFill = new Kiwi.Plugins.Primitives.Rectangle( params );

	// Demo ellipses
	params = {
		state: this,
		width: 50,
		height: 40,
		x: xStart,
		y: 280,
		color: [ 1.0, 0.6, 0.1 ]
	};
	this.ellipseStroke = new Kiwi.Plugins.Primitives.Ellipse( params );

	params.drawStroke = false;
	params.x += xStep;
	params.color = [ 1.0, 0.7, 0.1 ];
	this.ellipseNoStroke = new Kiwi.Plugins.Primitives.Ellipse( params );

	params.drawStroke = true;
	params.drawFill = false;
	params.x += xStep;
	this.ellipseNoFill = new Kiwi.Plugins.Primitives.Ellipse( params );

	// Demo stars
	params = {
		state: this,
		radius: 16,
		segments: 5,
		x: xStart,
		y: 380,
		color: [ 1.0, 0.8, 0.1 ]
	};
	this.starStroke = new Kiwi.Plugins.Primitives.Star( params );

	params.drawStroke = false;
	params.x += xStep;
	params.color = [ 1.0, 0.9, 0.1 ];
	this.starNoStroke = new Kiwi.Plugins.Primitives.Star( params );

	params.drawStroke = true;
	params.drawFill = false;
	params.x += xStep;
	this.starNoFill = new Kiwi.Plugins.Primitives.Star( params );

	// Demo lines
	params = {
		state: this,
		x: xStart,
		y: 480,
		strokeColor: [ 0.3, 1.0, 0.1 ],
		strokeWidth: 3,
		points: [ [ xStep * 2.8, 0 ] ]
	};
	for ( i = 0; i < xStep * 2.8; i += 4 ) {
		params.points.push( [
			i,
			16 * Math.sin( i * 0.1 )
		]);
	}
	this.line = new Kiwi.Plugins.Primitives.Line( params );

	// Background vignette
	this.vignette = new Kiwi.Group( this );
	vignetteStep = 16;
	for ( i = 0; i < 4; i++ ) {
		params = {
			state: this,
			width: this.game.stage.width - 2 * vignetteStep * i,
			height: this.game.stage.height - 2 * vignetteStep * i,
			x: vignetteStep * i,
			y: vignetteStep * i,
			drawStroke: false,
			color: [ 1.0, 0.6, 0.8 ],
			alpha: 0.2
		};
		this.vignette.addChild(
			new Kiwi.Plugins.Primitives.Rectangle( params ) );
	}

	// The Blob
	this.blobGroup = new Kiwi.Group( this );
	this.blobGroup.x = 550;
	this.blobGroup.y = 250;

	// Blob cytoplasm
	this.blobCytoplasmGroup = new Kiwi.Group( this );
	params = {
		state: this,
		x: 0,
		y: 0,
		centerOnTransform: true,
		color: [ 0.1, 0.3, 1.0 ],
		strokeColor: [ 0.1, 1, 0.8 ],
		strokeWidth: 8,
		radius: 64,
		alpha: 0.1
	};
	this.blobCytoplasmGroup.addChild(
		new Kiwi.Plugins.Primitives.Ellipse( params ) );

	// Blob membrane
	params.drawFill = false;
	for ( i = 0; i < 3; i++ ) {
		params.strokeWidth -= 2;
		this.blobCytoplasmGroup.addChild(
			new Kiwi.Plugins.Primitives.Ellipse( params ) );
	}

	// Blob cyto-reliant floaters
	params = {
		state: this,
		centerOnTransform: true,
		color: [ 0.1, 1, 0.8 ],
		strokeColor: [ 0.1, 1, 0.8 ],
		alpha: 0.1
	};
	for ( i = 0; i < 16; i++ ) {
		params.radius = Math.random() * 8;
		blobFloaterAng = Math.random() * Math.PI * 2;
		blobFloaterDist = Math.pow( Math.random(), 1 ) * 58;
		params.x = blobFloaterDist * Math.cos( blobFloaterAng );
		params.y = blobFloaterDist * Math.sin( blobFloaterAng );
		params.drawStroke = Math.random() < 0.3;
		params.drawFill = !params.drawStroke;
		this.blobCytoplasmGroup.addChild(
			new Kiwi.Plugins.Primitives.Ellipse( params ) );
	}

	// Blob independent floaters
	this.blobFloaterGroup = new Kiwi.Group( this );
	for ( i = 0; i < 16; i++ ) {
		params.radius = Math.random() * 8;
		blobFloaterAng = Math.random() * Math.PI * 2;
		blobFloaterDist = Math.pow( Math.random(), 1 ) * 58;
		params.x = blobFloaterDist * Math.cos( blobFloaterAng );
		params.y = blobFloaterDist * Math.sin( blobFloaterAng );
		params.drawStroke = Math.random() < 0.3;
		params.drawFill = !params.drawStroke;
		this.blobFloaterGroup.addChild(
			new Kiwi.Plugins.Primitives.Ellipse( params ) );
	}

	// Blob core
	this.blobCoreGroup = new Kiwi.Group( this );
	this.blobCoreGroup.x = 20;
	this.blobCoreGroup.y = -10;
	params = {
		state: this,
		x: 0,
		y: 0,
		centerOnTransform: true,
		color: [ 1.0, 0.1, 0.3 ],
		drawStroke: false,
		radius: 32,
		alpha: 0.1
	};
	for ( i = 0; i < 8; i++ ) {
		this.blobCoreGroup.addChild(
			new Kiwi.Plugins.Primitives.Ellipse( params ) );
		params.radius -= 2;
	}

	// Blob core glow
	this.game.renderer.addSharedRendererClone(
		"PrimitiveRenderer", "PrimitiveGlowRenderer");
	blobGlowRenderer = this.game.renderer.requestSharedRenderer(
		"PrimitiveGlowRenderer" );
	blobGlowRenderer.blendMode.setMode( "ADD" );
	this.blobCoreGlowGroup = new Kiwi.Group( this );
	this.blobCoreGlowGroup.x = 20;
	this.blobCoreGlowGroup.y = -10;
	params = {
		state: this,
		x: 0,
		y: 0,
		centerOnTransform: true,
		color: [ 1.0, 0.1, 0.3 ],
		drawStroke: false,
		radius: 32,
		alpha: 0.1
	};
	for ( i = 0; i < 8; i++ ) {
		this.blobCoreGlowGroup.addChild(
			new Kiwi.Plugins.Primitives.Ellipse( params ) );
		params.radius -= 2;
		this.blobCoreGlowGroup.members[ 0 ].glRenderer = blobGlowRenderer;
	}

	this.blobGroup.addChild( this.blobCytoplasmGroup );
	this.blobGroup.addChild( this.blobFloaterGroup );
	this.blobGroup.addChild( this.blobCoreGroup );
	this.blobGroup.addChild( this.blobCoreGlowGroup );

	this.blobShadowGroup = new Kiwi.Group( this );
	this.blobShadowGroup.x = this.blobGroup.x;
	this.blobShadowGroup.y = this.blobGroup.y + 96;
	params = {
		state: this,
		centerOnTransform: true,
		width: 96,
		height: 36,
		color: [ 0.01, 0.02, 0.05 ],
		alpha: 0.1,
		drawStroke: false
	};
	for ( i = 0; i < 3; i++ ) {
		this.blobShadowGroup.addChild(
			new Kiwi.Plugins.Primitives.Ellipse( params ) );
		params.width -= 8;
		params.height -= 8;
	}



	Kiwi.State.prototype.create.call(this);


	// Define background
	this.game.stage.color = "000000";

	// Construct scene graph
	this.addChild( this.encase( this.vignette ) );

	this.addChild( this.encase( this.triangleStroke ) );
	this.addChild( this.encase( this.triangleNoStroke ) );
	this.addChild( this.encase( this.triangleNoFill ) );
	this.addChild( this.encase( this.rectangleStroke ) );
	this.addChild( this.encase( this.rectangleNoStroke ) );
	this.addChild( this.encase( this.rectangleNoFill ) );
	this.addChild( this.encase( this.ellipseStroke ) );
	this.addChild( this.encase( this.ellipseNoStroke ) );
	this.addChild( this.encase( this.ellipseNoFill ) );
	this.addChild( this.encase( this.starStroke ) );
	this.addChild( this.encase( this.starNoStroke ) );
	this.addChild( this.encase( this.starNoFill ) );
	this.addChild( this.encase( this.line ) );

	this.addChild( this.blobShadowGroup );
	this.addChild( this.blobGroup );

	// Construct foreground object list
	this.foregroundObjects.push( this.triangleStroke );
	this.foregroundObjects.push( this.triangleNoStroke );
	this.foregroundObjects.push( this.triangleNoFill );
	this.foregroundObjects.push( this.rectangleStroke );
	this.foregroundObjects.push( this.rectangleNoStroke );
	this.foregroundObjects.push( this.rectangleNoFill );
	this.foregroundObjects.push( this.ellipseStroke );
	this.foregroundObjects.push( this.ellipseNoStroke );
	this.foregroundObjects.push( this.ellipseNoFill );
	this.foregroundObjects.push( this.starStroke );
	this.foregroundObjects.push( this.starNoStroke );
	this.foregroundObjects.push( this.starNoFill );
	this.foregroundObjects.push( this.line );
};
state.update = function() {
	var i, fo,
		wobble = 4,
		wobbleRotation = 0.03;

	Kiwi.State.prototype.update.call( this );

	// Wobble foreground geometries
	for ( i = 0; i < this.foregroundObjects.length; i++ ) {
		fo = this.foregroundObjects[ i ];
		fo.x = wobble * Math.cos( this.game.idealFrame * 0.01 + i * i );
		fo.y = wobble * Math.sin( this.game.idealFrame * 0.011 + i * i );
		fo.rotation = wobbleRotation *
			Math.sin( this.game.idealFrame * 0.013 + i * i );
	}

	// Animate blob
	this.blobCytoplasmGroup.scaleX = 1 + 0.05 *
		Math.cos( this.game.idealFrame * 0.01 );
	this.blobCytoplasmGroup.scaleY = 2 - this.blobCytoplasmGroup.scaleX;
	this.blobCytoplasmGroup.rotation = 0.2 *
		Math.sin( this.game.idealFrame * 0.017 );
	// this.blobCoreGlowGroup.scale = 0.5 + 0.5 *
	// 	Math.sin( this.game.idealFrame * 0.037 );
	for ( i = 0; i < this.blobCoreGlowGroup.members.length; i++ ) {
		this.blobCoreGlowGroup.members[ i ].alpha =
			( 0.5 + 0.5 * Math.sin( this.game.idealFrame * 0.037 ) ) * 0.05;
	}
};

// Push a GameObject into a group, and transfer its transforms to the group.
state.encase = function( entity ) {
	var group = new Kiwi.Group( this );

	group.addChild( entity );
	group.x = entity.x;
	group.y = entity.y;
	entity.x = 0;
	entity.y = 0;

	return group;
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Primitives', state, gameOptions);


