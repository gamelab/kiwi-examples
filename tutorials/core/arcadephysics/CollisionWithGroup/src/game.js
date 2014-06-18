
/**
* The core CollisionWithGroup game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 300
}

var game = new Kiwi.Game('content', 'CollisionWithGroup', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(CollisionWithGroup.Loading);
game.states.addState(CollisionWithGroup.Intro);
game.states.addState(CollisionWithGroup.Play);

game.states.switchState("Loading");