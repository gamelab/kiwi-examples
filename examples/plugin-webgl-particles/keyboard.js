var MyState = new Kiwi.State( "myState" );

var MyGame = new Kiwi.Game( "game-container", "testGame", MyState, { 
	plugins: [ "ParticlesGL" ], 
	renderer: Kiwi.RENDERER_WEBGL 
} );

MyState.preload = function() {
	this.game.stage.color = "000000";
	this.addImage( 'particle', './assets/img/plugins/webgl-particles/particle_01.png' );
}

MyState.create = function() {
	var particle = new Kiwi.GameObjects.StatelessParticles(
			this, this.textures.particle, 400, 300, config ),
		text = new Kiwi.GameObjects.Textfield( this,
			"Press the SPACEBAR to fire particles.",
			this.game.stage.width / 2, 10, "#fff", 12 );

	this.addChild( particle );
	this.addChild( text );

	text.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	this.spacebar = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.SPACEBAR, true );

	this.game.input.keyboard.onKeyDownOnce.add( function( keyCode ) {
		if ( keyCode === Kiwi.Input.Keycodes.SPACEBAR ) {
			particle.startEmitting( true, false );
		}
	});

	this.game.input.keyboard.onKeyUp.add( function(keyCode) {
		if ( keyCode === Kiwi.Input.Keycodes.SPACEBAR ) {
			particle.stopEmitting( false, false );
		}
	});

}

MyState.update = function () {
	Kiwi.State.prototype.update.call( this );
}

var config = {
	"numParts": 25,
	"posOffsetX": 0,
	"posOffsetY": 0,
	"posRadius": 5,
	"posRadialStart": 0,
	"posRadialEnd": 6.283185307179586,
	"posWidth": 200,
	"posHeight": 200,
	"posConstrainRect": true,
	"posAngle": 0,
	"posLength": 200,
	"posRandomLine": true,
	"posConstrainRadial": false,
	"posRandomRadial": true,
	"posShape": "point",
	"maxVel": 100,
	"minVel": 70,
	"velConstrainRect": true,
	"velConstrainRadial": true,
	"velRandomRadial": true,
	"velShape": "point",
	"velOffsetX": 300,
	"velOffsetY": 0,
	"velAngMin": -6,
	"velAngMax": 6,
	"velRadius": 20,
	"velRadialStart": 0,
	"velRadialEnd": 6.283185307179586,
	"velWidth": 200,
	"velHeight": 200,
	"velAngle": 0.0004784919240787009,
	"velLength": 200,
	"velRandomLine": true,
	"minStartTime": 0,
	"maxStartTime": 0,
	"minLifespan": 0.1,
	"maxLifespan": 0.6,
	"gravityX": 0,
	"gravityY": 0,
	"startSize": 5,
	"endSize": 80,
	"loop": true,
	"colEnvKeyframes": [
		"0.2",
		"0.3"
	],
	"alpha": 0.7,
	"colEnv0": [
		0.611764705882353,
		0.9647058823529412,
		0.9921568627450981
	],
	"colEnv1": [
		0.4392156862745098,
		0.7450980392156863,
		0.9921568627450981
	],
	"colEnv2": [
		0.10980392156862745,
		0.38823529411764707,
		0.9921568627450981
	],
	"colEnv3": [
		0.06666666666666667,
		0.2549019607843137,
		0.9921568627450981
	],
	"alphaGradient": [
		"0",
		"1",
		"1",
		"0"
	],
	"alphaStops": [
		"0.1",
		"0.5"
	],
	"additive": true,
	"cells": [
		0
	],
	"textureID": "_128x128"
};