var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet('player', './assets/img/anime/squid.png', 150, 117);

    // Load audio object here.
    this.addAudio('music', './assets/audio/sky/skytheme-8-bit.mp3');
}

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);

	// Add a new Audio object to the game
	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, false);

	// Plays the Audio object.
	this.music.play();

}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Play Music', state, gameOptions);