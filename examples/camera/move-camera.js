var state = new Kiwi.State('Play');

state.preload = function () {
	
	this.addImage( 'grid', './assets/img/grids/large-debug-grid' );
}; 

state.create = function () {

	this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.grid, 0, 0 );

	this.addChild(this.background);

	this.cameraStep = 3;

	// this.game.input.keyboard.onKeyDown.add( this.myKeyDown, this );

	this.upKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.UP, true );
	this.downKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.DOWN, true );
	this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.RIGHT, true );
	this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.LEFT, true );


};


state.update = function () {
	Kiwi.State.prototype.update.call( this );

	if( this.leftKey.isDown ){
		this.game.cameras.defaultCamera.transform.x += this.cameraStep;
	}
	if( this.rightKey.isDown ){
		this.game.cameras.defaultCamera.transform.x -= this.cameraStep;
	} 
	if( this.upKey.isDown ){
		this.game.cameras.defaultCamera.transform.y += this.cameraStep;
	} 
	if( this.downKey.isDown ){
		this.game.cameras.defaultCamera.transform.y -= this.cameraStep;
	}

};


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'MoveCamera', state, gameOptions);


