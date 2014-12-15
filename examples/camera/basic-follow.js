var state = new Kiwi.State('Play');

state.preload = function () {
	
	this.addImage( 'grid', './assets/img/grids/large-debug-grid.png' );
	this.addImage( 'player', './assets/img/logo/rocket.png' );
}; 

state.create = function () {

	this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.grid, 0, 0 );

	this.addChild(this.background);

	this.step = 3;

	this.upKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.UP, true );
	this.downKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.DOWN, true );
	this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.RIGHT, true );
	this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.LEFT, true );

	this.player = new Kiwi.GameObjects.Sprite( this, this.textures.player, 500, 500 );
	this.addChild( this.player );


};


state.update = function () {
	Kiwi.State.prototype.update.call( this );


	if( this.leftKey.isDown ){
		this.player.x -= this.step;
	}
	if( this.rightKey.isDown ){
		this.player.x += this.step;
	} 
	if( this.upKey.isDown ){
		this.player.y -= this.step;
	} 
	if( this.downKey.isDown ){
		this.player.y += this.step;
	}

	var playerOffsetX = this.player.width * 0.5;
	var playerOffsetY = this.player.height * 0.5;
	
	this.game.cameras.defaultCamera.transform.x = -1 * this.player.x + this.game.stage.width * 0.5 - playerOffsetX;
	this.game.cameras.defaultCamera.transform.y = -1 * this.player.y + this.game.stage.height * 0.5 - playerOffsetY;


}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'MoveCamera', state, gameOptions);


