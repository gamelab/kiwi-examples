var ParalaxLayers = ParalaxLayers || {};

ParalaxLayers.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
ParalaxLayers.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  	this.addChild(this.name);

    //Create the Tilemap from the JSON file.
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

    //Get the layers. I named then 'foreground' and 'background' when I created then in Tiled and so they will have those names in Kiwi and we can grab them through those.
    this.foreground = this.tilemap.getLayerByName('Foreground');
    this.background = this.tilemap.getLayerByName('Background');

    //Add them to the stage.
    this.addChild(this.background);
    this.addChild(this.foreground);
  
}

ParalaxLayers.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  //If the user pressed the left or A key
  if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.A) || this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.LEFT)) {

      //And the foreground wouldn't be moved off screen.
      if (this.foreground.x < 0) {
          this.foreground.x += 5; 
          this.background.x += 3;
      }

  //If the user pressed the RIGHT or D key.
  } else if (this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.D) || this.game.input.keyboard.isDown(Kiwi.Input.Keycodes.RIGHT)) {

      //And the foreground wouldn't be moved off screen. 
      if (this.foreground.x > -(this.foreground.widthInPixels - this.game.stage.width)) {
          this.foreground.x -= 5;
          this.background.x -= 3;
      }

  }

}



