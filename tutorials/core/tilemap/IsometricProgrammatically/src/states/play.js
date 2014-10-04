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
  this.tilemap.orientation = Kiwi.GameObjects.Tilemap.ISOMETRIC;


  /*
  * Sets the properties of the tilemap. You don't have to do this and can provide it when you create your tilemap,
  * but it is easier to do at this stage as it will then be inherited by default.  
  * Param 1 - Width of a single tile.
  * Param 2 - Height of a single tile.
  * Param 3 - Width of the whole map - in tiles.
  * Param 4 - Height of the whole map - in tiles.
  */
  this.tilemap.setTo(64, 32, 10, 6);


  /*
  * Create's a bunch of tiletypes based on an list of cellIndexs we want to use for each one.
  * Param 1 - Array of cellIndexs. Each item will have its own tileType.
  *
  * 0 - Is the cell related to the grass block
  * 1 - Is the cell related to the spike block
  * 2 - Is the cell related to the stone block
  * 3 - Is the cell related to the wooden block
  */
  this.tilemap.createTileTypes([0, 1, 2, 3]);


  /*
  * Create our tilemap. Tilemap data in Kiwi is a 1D array.
  *
  * Note that '0' means that no tile will be used at that point and the other numbers relate to types of tiles we created.
  * So the number '1' will use tiletype '1' which uses cellIndex 0. Aka the grass block.
  * Or number '3' will use tiletype '3' which uses cellIndex 2, also known as the stone block
  */
  var tilemapdata = [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 
      3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 
      3, 3, 1, 1, 3, 3, 3, 4, 3, 1, 
      3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 
      3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 
      3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 
  ];

  
  /* 
  * Create our TileMapLayer.
  * Param 1 - Name of the tilemaplayer we are creating.
  * Param 2 - The textureatlas/spritesheet we will use.
  * Param 3 - The tile data for the map.
  */
  this.isoLayer = this.tilemap.createNewLayer('Desert', this.textures.blocks, tilemapdata);
  this.isoLayer.x = this.game.stage.width / 2;
  this.isoLayer.y = 32;

  //Add the layer to the state.
  this.addChild( this.isoLayer );

    
  
}


CreationProgrammatically.Play.update = function(){
  Kiwi.State.prototype.update.call(this);


}




