var state = new Kiwi.State('Play');

state.preload = function() {
    this.addSpriteSheet('player', './assets/img/anime/griffon.png', 150, 117);
    this.addAudio('music', './assets/audio/industrial/industrial-theme-alt.mp3');
}

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.15, true, true );
	this.addChild(this.player);

	this.music = new Kiwi.Sound.Audio(this.game, 'music', 1, true);
	this.music.play();

	this.game.input.keyboard.onKeyDown.add( this.keyDown, this );

	var text = new Kiwi.GameObjects.Textfield( this, "Use the left and right arrow keys to control the game's volume.", 15, 15, '#000', 20 );
	this.addChild( text );

}

state.keyDown = function(keyCode, key) {

	// Use the left and right keys to adjust the volume of the game.
    if( keyCode === Kiwi.Input.Keycodes.LEFT){
    	if( this.game.audio.volume > 0 ){
	    	this.game.audio.volume -= 0.05;
	    } 
	}

    if( keyCode === Kiwi.Input.Keycodes.RIGHT){
    	if( this.game.audio.volume < 1 ) {
    		this.game.audio.volume += 0.05;
    		
    	}
    }  

}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'VolumeControl', state, gameOptions);


