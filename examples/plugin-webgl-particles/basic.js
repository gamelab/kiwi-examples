var MyState = new Kiwi.State("myState");

var MyGame = new Kiwi.Game( "game-container", "testGame", MyState,
	{ plugins: [ "ParticlesGL" ], renderer: Kiwi.RENDERER_WEBGL } );

MyState.preload = function() {
	this.game.stage.color = "000000";
	this.addImage( "particle", "./assets/img/plugins/webgl-particles/particle_01.png" );
}

MyState.create = function() {
	// create a particle object
	// params are
	// 1) the state(this),
	// 2) the texture to use,
	// 3) an optional configuration object (see example configuration below).
	// If not supplied or null, this will use a default configuration.
	// 4) whether to start generate and start emitting particles immediately
	// (also optional - defaults to true)
	var particle = new Kiwi.GameObjects.StatelessParticles(
		this, this.textures.particle, 400, 300, config );

	// If you haven't started the particle objects yet
	// then you can adjust the configuration
	particle.config.numParts = 50;

	// Start the particle object
	particle.startEmitting( true, false );
	particle.setConfigProp( "startAngle", 0, true, false )
	this.addChild( particle );

}


var config = {
	"numParts": 10,
	"posOffsetX": 0,
	"posOffsetY": 0,
	"posRadius": 80.4,
	"posRadialStart": 0,
	"posRadialEnd": 6.14355896702004,
	"posWidth": 200,
	"posHeight": 200,
	"posConstrainRect": true,
	"posAngle": 0,
	"posLength": 200,
	"posRandomLine": true,
	"posConstrainRadial": true,
	"posRandomRadial": false,
	"posShape": "radial",
	"maxVel": 100,
	"minVel": 100,
	"velConstrainRect": true,
	"velConstrainRadial": true,
	"velRandomRadial": false,
	"velShape": "radial",
	"velOffsetX": -100,
	"velOffsetY": 50,
	"velAngMin": 0,
	"velAngMax": 0,
	"velRadius": 250.8,
	"velRadialStart": 5.358160803622591,
	"velRadialEnd": 3.647738136668149,
	"velWidth": 200,
	"velHeight": 200,
	"velAngle": 0,
	"velLength": 200,
	"velRandomLine": false,
	"minStartTime": 0,
	"maxStartTime": 1,
	"minLifespan": 2,
	"maxLifespan": 2,
	"gravityX": 60,
	"gravityY": 30,
	"startSize": 39,
	"endSize": 140,
	"loop": false,
	"startAngle": 0,
	"colEnvKeyframes": [
		0.5,
		0.6
	],
		"colEnv0": [
		0.3686274509803922,
		0.050980392156862744,
		0.9490196078431372
	],
	"colEnv1": [
		0.07058823529411765,
		0.9490196078431372,
		0.050980392156862744
	],
	"colEnv2": [
		1,
		1,
		1
	],
	"colEnv3": [
		0,
		0,
		0
	],
	"alphaGradient": [
		1,
		1,
		1,
		0
	],
	"alphaStops": [
		0.3,
		0.7
	]
}