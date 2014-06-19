var Dragging = Dragging || {};

Dragging.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Dragging.Play.create = function () {
  	this.name = new Kiwi.GameObjects.Sprite(this, this.textures.kiwiName, 10, 10);
	  this.addChild(this.name);


    //create the ninja. Enable the input component by passing true.
    this.ninja = new Kiwi.GameObjects.Sprite(this, this.textures.ninja, 10, 10, true);
    this.addChild(this.ninja);

    //create the pirate. 
    this.pirate = new Kiwi.GameObjects.Sprite(this, this.textures.pirate, 400, 300, true);
    this.addChild(this.pirate);

    /**
    * When you want a sprite to be draggable you have to enable the drag on that element.
    **/
    this.ninja.input.enableDrag();
    

    /**
    * Parameter One - OPTIONAL - Snap the sprite to the center. - Default to false
    * Parameter Two - OPTIONAL - Distance between gridpoints in which the sprite should snap to.
    **/
    this.pirate.input.enableDrag(true, 25);
    this.name.input.enableDrag(false, 25);
  
}

Dragging.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
}


