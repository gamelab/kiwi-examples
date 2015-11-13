// A tutorial on how to create JSON tilemaps with "Tiled" can be found here : 
// http://www.kiwijs.org/documentation/tutorials/tilemap-creating-tiled-maps

var state = new Kiwi.State("Play");

state.preload = function () {
	this.addJSON( "tilemap", "./assets/data/tilemap/war.json" );
	this.addSpriteSheet(
		"tiles", "./assets/img/tiles/war.png", 48, 48 );
};

state.create = function () {

	this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(
		this, "tilemap", this.textures.tiles );

	this.addChild( this.tilemap.layers[ 0 ] );
	this.addChild( this.tilemap.layers[ 1 ] );

};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game(
		"game-container", "Basic Tilemap", state, gameOptions );
