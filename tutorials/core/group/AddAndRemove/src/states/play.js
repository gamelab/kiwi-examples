var AddAndRemove = AddAndRemove || {};

AddAndRemove.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
AddAndRemove.Play.create = function () {
    this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
	  this.addChild(this.name);
      

    this.heart = new Kiwi.GameObjects.Sprite(this, this.textures.icons, 10, 10);
    this.heart.cellIndex = 8;
    this.heart.y = this.game.stage.height - this.heart.height - 10;


    this.keyboard = game.input.keyboard;


    this.addKey = this.keyboard.addKey(Kiwi.Input.Keycodes.UP);
    this.removeKey = this.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);

    this.keyboard.onKeyDownOnce.add(this.keyDownOnce, this);
    this.myGroup = new Kiwi.Group(this);
    this.addChild(this.myGroup);

  
}




AddAndRemove.Play.keyDownOnce = function(keyCode, key){
  if(keyCode == this.addKey.keyCode){
    var temp = new Kiwi.GameObjects.Sprite(this, this.textures.icons, Math.random()*game.stage.width, Math.random()*game.stage.height);
    temp.cellIndex = 8;
    this.myGroup.addChild(temp);
  }
  if(keyCode == this.removeKey.keyCode){
    if(this.myGroup.members.length > 0){
      this.myGroup.removeFirstAlive();
    }
  }
}





