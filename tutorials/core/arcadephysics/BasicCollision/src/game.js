
/**
* The core BasicCollision game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 250
}

var game = new Kiwi.Game('content', 'BasicCollision', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(BasicCollision.Loading);
game.states.addState(BasicCollision.Intro);
game.states.addState(BasicCollision.Play);

game.states.switchState("Loading");