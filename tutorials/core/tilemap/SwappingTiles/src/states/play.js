var SwappingTiles = SwappingTiles || {};

SwappingTiles.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
SwappingTiles.Play.create = function () {

	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
	this.addChild(this.name);

  //Create the Tilemap. 
  this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

  //Get the TilemapLayer
  this.tilemaplayer = this.tilemap.layers[0];

  //Add to the stage.
  this.addChild(this.tilemaplayer);

  //On click event
  this.game.input.onUp.add(this.replace, this);
  
}
SwappingTiles.Play.replace = function(x, y){
  //Replace all of the barbed wire with tank stoppers and the other way around
  this.tilemaplayer.swapTiles(36, 33);
}




