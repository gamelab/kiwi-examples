var state = new Kiwi.State('Play');

state.preload = function () {
    
    // Add the audio file to the loading queue.
    this.addAudio('music', './assets/audio/sky/skytheme-8-bit.mp3');
};

state.create = function () {

	// This plays the audio. This is not needed to add audio to a state.
	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, false);
	this.music.play();

};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Load Audio', state, gameOptions);