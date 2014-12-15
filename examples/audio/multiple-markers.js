var state = new Kiwi.State('Play');

state.preload = function () {
    
    this.addSpriteSheet('player', './assets/img/anime-monsters/snake-sheet.png', 150, 117);
    this.addAudio('sfx', './assets/audio/misc-sound-effects/sound-sheet.mp3');
};

state.create = function () {

	this.player = new Kiwi.GameObjects.Sprite(this, this.textures.player, 275, 150);
	this.player.animation.add( 'walk', [ 1, 2, 3, 4, 5, 6 ], 0.1, true, true );
	this.addChild(this.player);

	this.sfx = new Kiwi.Sound.Audio(this.game, 'sfx', 1, true);

	this.sfx.addMarker( 'paperCrunch', 0, 0.96, false );
	this.sfx.addMarker( 'click', 1, 1.39, false );
	this.sfx.addMarker( 'woosh', 2, 2.29, false );
	this.sfx.addMarker( 'coin', 2.50, 4.22, false );

	this.game.input.mouse.onDown.add( this.mouseDown, this );


};

state.mouseDown = function (){
	var choice,
		randomNumber = Math.floor( Math.random() * 4 );

	switch ( randomNumber ){
		case 0:
			choice = 'paperCrunch';
			break;
		case 1:
			choice = 'click';
			break;
		case 2:
			choice = 'woosh';
			break;
		case 3:
			choice = 'coin';
			break;
		default:
			choice = 'coin';
	}


	this.sfx.play( choice, true );
}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'multiple-marker', state, gameOptions);


