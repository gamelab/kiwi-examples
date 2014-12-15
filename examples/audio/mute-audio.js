var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime-monsters/griffon-sheet.png', 150, 117);
    this.addAudio('music', './assets/audio/dungeon/dungeon-theme-alt.mp3');
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);

	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, false);
	this.music.play();

	this.game.input.mouse.onDown.add( this.mouseDown, this );


};

state.mouseDown = function () {

	// Used to mute the audio on the device, or to check to see if the device is muted. 
	// This will not stop audio from being played, will just mean that the audio is silent.
	this.game.audio.mute = !this.game.audio.mute;
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'PlayMusic', state, gameOptions);


