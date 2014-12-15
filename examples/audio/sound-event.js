var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime-monsters/squid-sheet.png', 150, 117);
    this.addAudio('music', './assets/audio/sky/skytheme-8-bit.mp3');
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);

	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, true);

	this.music.onLoop.add( this.onLoop, this );
	this.music.onMute.add( this.onMute, this );
	this.music.onPause.add( this.onPause, this );
	this.music.onPlay.add( this.onPlay, this );
	this.music.onResume.add( this.onResume, this );
	this.music.onStop.add( this.onMusicStop, this );

	this.music.play();

	this.game.input.mouse.onDown.add( this.mouseDown, this )

};

state.mouseDown = function () {
	if( this.music.isPlaying ){
		this.music.pause();
	} else {
		this.music.resume();
	}
	console.log( this.music._loop );

};

state.onLoop = function () {
	console.log( "Loop" );

};

state.onMute = function () {
	console.log( "Mute" );
};

state.onPause = function () {
	console.log( "Pause" );
};
state.onPlay = function () {
	console.log( "Play" );
};

state.onResume = function () {
	console.log( "Resume" );
};

state.onMusicStop = function () {
	console.log( "Stop" );
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'MusicEvents', state, gameOptions);