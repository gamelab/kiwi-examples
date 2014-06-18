var Creation = Creation || {};

Creation.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Creation.Play.create = function () {

	     //create our snake
        this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 25, 30);
        //add them all to the stage
        this.addChild(this.zombie); 
        
        /**
        * Now in order to animate the zombie we need firstly set up the animation.
        * 
        * This is accomplised through the animation component.
        * Method add.
        * - Parameter One - Name of the animation.
        * - Parameter Two - Cell animation order.
        * - Parameter Three - Time that the animation will take in seconds.
        * - Paramter Four - If the animation should loop or not.
        **/
        this.zombie.animation.add('walking', [1, 2, 3, 4, 5, 6], 0.1, true);

        //Play the animation that we just set-up.
        this.zombie.animation.play('walking');
  
}




