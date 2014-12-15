var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime-monsters/griffon-sheet.png', 150, 117);
    this.addAudio('music', './assets/audio/forest/forest-theme-boss.mp3');
    this.addAudio('sfx', './assets/audio/sound-effects/ig-coin.mp3');
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);

	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, true);
	this.music.play();

	this.sfx = new Kiwi.Sound.Audio(this.game, 'sfx', 1, true);
	this.sfx.play();

	this.game.input.mouse.onDown.add( this.mouseDown, this );


};

state.mouseDown = function () {

	// Mutes the sound and makes it 'silent'. This will not stop the sound from playing,
	// or events from being dispatched due when the sound has finished/is looping.
	this.sfx.mute = !this.sfx.mute;
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'PlayMusic', state, gameOptions);


