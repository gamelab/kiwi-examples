var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime-monsters/squid-sheet.png', 150, 117);
    this.addAudio('music', './assets/audio/sci-fi/sci-fi-theme-8-bit.mp3');
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.035, true, true );
	this.addChild(this.player);

	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, true);
	this.music.play();


};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'LoopMusic', state, gameOptions);


