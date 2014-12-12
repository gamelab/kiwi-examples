var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime-monsters/snake-sheet.png', 150, 117);
    this.addAudio('music', './assets/audio/pirates/pirate-theme-8-bit.mp3');
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);

	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, true);
	this.music.play();

	this.game.input.mouse.onDown.add( this.mouseClicked, this );


};

state.mouseClicked = function () {
	if( this.music.isPlaying ){
		this.music.pause();
	} else {
		this.music.resume();
	}
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'PlayMusic', state, gameOptions);


