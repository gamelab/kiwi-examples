var Basic = Basic || {};

Basic.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Basic.Play.create = function () {

	this.createText();

  this.squid = new Kiwi.GameObjects.Sprite(this, this.textures.squid, 25, 30);
  this.addChild(this.squid);

  this.game.input.onUp.add(this.released, this);
  
}

Basic.Play.released = function(x){

  if (x > this.game.stage.width / 2) {
      this.squid.animation.nextFrame();
  } else {
      this.squid.animation.prevFrame();
  }
   

}

Basic.Play.createText = function(x){
  this.leftText = new Kiwi.GameObjects.Textfield(this, '<', 5, 85, '#CCCCCC');
  this.addChild(this.leftText);
  this.rightText = new Kiwi.GameObjects.Textfield(this, '>', 178, 85, '#CCCCCC');
  this.addChild(this.rightText);
  this.mainText = new Kiwi.GameObjects.Textfield(this, 'Click to Change Animation', 3, 175, '#CCCCCC', 17);
  this.addChild(this.mainText);
}
