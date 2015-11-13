var state = new Kiwi.State( "Play" );

state.preload = function () {
	this.addSpriteSheet(
		"tiles", "./assets/img/tiles/war.png", 48, 48 );
};

state.create = function () {

	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap( this );
	/**
	* Param 1 - Width of a single tile.
	* Param 2 - Height of a single tile.
	* Param 3 - Width of the whole map - in tiles.
	* Param 4 - Height of the whole map - in tiles.
	*/
	this.tilemap.setTo( 48, 48, 17, 6 );

	this.tilemap.createTileType( 0 );
	this.tilemap.createTileType( 1 );
	this.tilemap.createTileType( 2 );
	this.tilemap.createTileType( 3 );
	this.tilemap.createTileType( 4 );

	var tilemapdata = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 2, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 4, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];

	//Create a new TileMapLayer
	this.tilemap.createNewLayer( "Ground", this.textures.tiles, tilemapdata );

	//Add the Layer to the State to be Rendered.
	this.addChild( this.tilemap.layers[0] );
};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game(
		"game-container", "Basic Tilemap", state, gameOptions);
