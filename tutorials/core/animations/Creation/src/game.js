
/**
* The core Creation game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 200,
	height: 200
}

var game = new Kiwi.Game('content', 'Creation', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Creation.Loading);
game.states.addState(Creation.Intro);
game.states.addState(Creation.Play);

game.states.switchState("Loading");