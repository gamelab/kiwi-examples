var CreationProgrammatically = CreationProgrammatically || {};

CreationProgrammatically.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
CreationProgrammatically.Play.create = function () {

	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  //Create the Tilemap. We don't pass in the json or the atlas at this stage since we aren't creating it using a JSON file
  this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);


  /*
  * Sets the properties of the tilemap. You don't have to do this and can provide it when you create your tilemap,
  * but it is easier to do at this stage as it will then be inherited by default.  
  * Param 1 - Width of a single tile.
  * Param 2 - Height of a single tile.
  * Param 3 - Width of the whole map - in tiles.
  * Param 4 - Height of the whole map - in tiles.
  */
  this.tilemap.setTo(48, 48, 17, 6) 


  /*
  * Create's a bunch of tiletypes based on an list of cellIndexs we want to use for each one.
  * Param 1 - Array of cellIndexs. Each item will have its own tileType.
  *
  * The ones I have passed are the 'yellow' tiles in the desertSpritesheet
  */
  this.tilemap.createTileTypes([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);


  //Create another few tiletypes for the tankstopper/barbed wire.
  //The one param is a cell to use.
  this.tilemap.createTileType(32);  // Tile Type Number 17
  this.tilemap.createTileType(35);  // Tile Type Number 18


  /*
  * Create our tilemap. Tilemap data in Kiwi is a 1D array.
  *
  * Note that '0' means that no tile will be used at that point and the other numbers relate to types of tiles we created.
  * So the number '1' will use tiletype '1' which uses cellIndex 0.
  * Or number '8' will use tiletype '8' which uses cellIndex 7.
  */
  var tilemapdata = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,
      6, 0, 3, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0,10,11, 4, 4,
      6, 0, 7, 8, 8, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,
      6, 0, 7, 8, 8, 8, 9, 0, 3, 4, 5, 0, 0, 0, 0, 7, 8,
  ];

  
  /* 
  * Create our TileMapLayer.
  * Param 1 - Name of the tilemaplayer we are creating.
  * Param 2 - The textureatlas/spritesheet we will use.
  * Param 3 - The tile data for the map.
  */
  this.tilemap.createNewLayer('Desert', this.textures.desertSpritesheet, tilemapdata);


  //Add the layer to the state.
  this.addChild( this.tilemap.layers[0] );

    
  
}


CreationProgrammatically.Play.update = function(){
  Kiwi.State.prototype.update.call(this);


}




