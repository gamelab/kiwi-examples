var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet('player', './assets/img/anime/squid.png', 150, 117);
    this.addAudio('music', './assets/audio/sci-fi/sci-fi-theme-8-bit.mp3');
}

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.035, true, true );
	this.addChild(this.player);

	
	/*
	* Adds Audio object to the game.
	* Param 1: The game that this piece of audio belongs to.
	* Param 2: The key to which which piece of audio should be loaded from the AudioLibrary.
	* Param 3: A number between 0 (silence) and 1 (loud).
	* Param 4: If the audio should loop when it is finished or just stop.
	*/
	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, true);

	// Plays the Audio.
	this.music.play();


};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Loop Music', state, gameOptions);


