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
  this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'isometricmap', this.textures.blocks);


  for(var i = 0; i < this.tilemap.layers.length; i++) {
    this.tilemap.layers[i].x = this.game.stage.width / 2;
    this.addChild( this.tilemap.layers[i] );
  }


    
  
}


CreationProgrammatically.Play.update = function(){
  Kiwi.State.prototype.update.call(this);


}




