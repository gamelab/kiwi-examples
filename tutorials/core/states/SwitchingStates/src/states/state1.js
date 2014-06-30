var SwitchingStates = SwitchingStates || {};

SwitchingStates.State1 = new Kiwi.State('State1');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
SwitchingStates.State1.create = function () {
    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures.state1, 0, 0);
    this.addChild(this.background);

    this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
    this.addChild(this.name);





    this.mouse = game.input.mouse
    this.mouse.onUp.add(this.mouseUp, this);


  
}

SwitchingStates.State1.mouseUp = function(){
  game.states.switchState("State2");
}



