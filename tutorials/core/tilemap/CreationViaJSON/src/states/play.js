var CreationViaJSON = CreationViaJSON || {};

CreationViaJSON.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
CreationViaJSON.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
    this.addChild(this.name);

    /**
    * Create the Tilemap GameObject. 
    * 
    * 1 - The State we are creating it on.
    * 2 - Optional - The JSON file we want to load in.
    * 3 - Optional - The spritesheet we want to use.
    */
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

    /**
    * A Tilemap isn't actually a GameObject. It functions more as a Manager to create TilemapLayers and TileTypes.
    * So to have a Tilemap rendering you need to add a Tilemaps layers to the state.
    */
    this.addChild( this.tilemap.layers[0] );
  
}




