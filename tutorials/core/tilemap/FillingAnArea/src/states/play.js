var FillingAnArea = FillingAnArea || {};

FillingAnArea.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
FillingAnArea.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
	  this.addChild(this.name);

    //Create the Tilemap. 
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'desertTilemap', this.textures.desertSpritesheet);

    //Get the TilemapLayer
    this.tilemaplayer = this.tilemap.layers[0];

    //Add to the stage.
    this.addChild(this.tilemaplayer);

    //tileoutline - to outline the tile/tiles we are currently hovering over
    this.tileoutline = new Kiwi.GameObjects.StaticImage(this, this.textures.tileoutline, -48, -48);
    this.tileoutline.transform.rotPointX = 0; 
    this.tileoutline.transform.rotPointY = 0;
    this.addChild(this.tileoutline);
    
    //On click event
    this.game.input.onDown.add(this.press, this);
    this.game.input.onUp.add(this.replace, this);
  
}
FillingAnArea.Play.press = function(x, y){
  this.isDown = true;
  //snap the pressed locations X/Y positions
  this.pressedLocationX = Kiwi.Utils.GameMath.snapToFloor(x, this.tilemaplayer.tileWidth);
  this.pressedLocationY = Kiwi.Utils.GameMath.snapToFloor(y, this.tilemaplayer.tileHeight);
}
FillingAnArea.Play.replace = function(x, y){
  //Calculate the x/y/width/height of the area we are going to fill in tiles and if they selected it backwards or forwards
  if (x > this.pressedLocationX) {
      var tx = Math.floor(this.pressedLocationX / this.tilemaplayer.tileWidth);
      var w = Math.ceil((x - this.pressedLocationX) / this.tilemaplayer.tileWidth);
  } else {
      var tx = Math.floor(x / this.tilemaplayer.tileWidth);
      var w = Math.ceil((this.pressedLocationX - x) / this.tilemaplayer.tileWidth);
  }

  if (y > this.pressedLocationY) {
      var ty = Math.floor(this.pressedLocationY / this.tilemaplayer.tileHeight);
      var h = Math.ceil((y - this.pressedLocationY) / this.tilemaplayer.tileHeight);
  } else {
      var ty = Math.floor(y / this.tilemaplayer.tileHeight);
      var h = Math.ceil((this.pressedLocationY - y) / this.tilemaplayer.tileHeight);
  }

  //Fill in that area of the map
  this.tilemaplayer.fill(27, tx, ty, w, h);

  //Reset the tileoutline properties
  this.isDown = false;
  this.tileoutline.scaleX = 1;
  this.tileoutline.scaleY = 1;
}

FillingAnArea.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  //Should the tileoutline follow the cursor or is the user pressing the mouse down.
  if (this.isDown == false) {
      //Snap the tileoutline to the tiles on the map so we know which tile would be replaced
      this.tileoutline.x = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.x, this.tilemap.tileWidth);
      this.tileoutline.y = Kiwi.Utils.GameMath.snapToFloor(this.game.input.mouse.y, this.tilemap.tileHeight);

  } else {

      this.tileoutline.x = Kiwi.Utils.GameMath.snapToFloor(this.pressedLocationX, this.tilemap.tileWidth);
      this.tileoutline.y = Kiwi.Utils.GameMath.snapToFloor(this.pressedLocationY, this.tilemap.tileHeight);

      //Scale the Tileoutline to fit
      this.tileoutline.scaleX = Math.ceil((this.game.input.mouse.x - this.pressedLocationX) / this.tilemap.tileWidth);
      this.tileoutline.scaleY = Math.ceil((this.game.input.mouse.y - this.pressedLocationY) / this.tilemap.tileHeight);

      //Increase Scale if the scale is negative
      if (this.tileoutline.scaleX <= 0) this.tileoutline.scaleX -= 1;
      if (this.tileoutline.scaleY <= 0) this.tileoutline.scaleY -= 1; 
  }

}



