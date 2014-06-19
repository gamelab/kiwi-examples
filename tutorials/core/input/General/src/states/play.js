var General = General || {};

General.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
General.Play.create = function () {

	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  		
  /**
  * To access general input events you can access the input manager.
  * The input manager is who managers the dispatching of input events.
  * We are adding an onUp event to be listened to.
  **/
  this.game.input.onUp.add(this.showNinja, this);
  this.addChild(this.name);
  
}

General.Play.showNinja = function(x, y) {
        //create the ninja. Enable the input component by passing true.
        var ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, x, y, true);
        this.addChild(ninja);
         
    }




