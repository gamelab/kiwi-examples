var state = new Kiwi.State('Play');


state.preload = function () {
    this.addSpriteSheet('player', './assets/img/anime/griffon.png', 150, 117);
    this.addAudio('music', './assets/audio/ice/ice-theme-boss.mp3');
}


state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);

	this.music = new Kiwi.Sound.Audio(this.game, 'music', 0, true);
	this.music.play();

	// Sets the games volume to 0 to begin with.
	this.volume = 0;

	this.game.input.mouse.onDown.add( this.mouseClicked, this );

}

state.update = function () {
	Kiwi.State.prototype.update.call(this);

	// Increases the volume of the game by 0.001 to 1 in the update loop of the state. 
	if ( this.volume < 1 ){
		this.volume += 0.001;
		this.music.volume = this.volume;
	}
	
}


state.mouseClicked = function () {
	this.music.stop();
	this.music.play( 'default', true );
	
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Fade In', state, gameOptions);


