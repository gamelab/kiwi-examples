var state = new Kiwi.State('Play');

state.preload = function () {
	this.addImage( 'background', 'assets/img/plugins/fullscreen/background.jpg' );
	this.addImage( 'button', 'assets/img/plugins/fullscreen/toggle-button.png' );

};

state.create = function () {
	//Create the background 
	this.background = new Kiwi.GameObjects.Sprite( this, this.textures.background );
	this.addChild( this.background );


	//Create the toggle fullscreen button
	this.button = new Kiwi.GameObjects.Sprite( this, this.textures.button, 0, 0 );
	this.button.x = ( this.game.stage.width - this.button.width ) * 0.5; 
	this.button.y = this.game.stage.height - this.button.height - 20;
	this.addChild( this.button );

	this.game.input.onUp.add( this.fullscreen, this);
};

//When the fullscreen icon is clicked
state.fullscreen = function( x, y ) {

	//Check to see if the user clicked the icon.
	if ( this.button.box.hitbox.contains( x, y ) ) {
		this.game.fullscreen.toggleFullscreen();
	}

}

var gameOptions = {
	plugins: [ 'Fullscreen' ],
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Fullscreen', state, gameOptions);


