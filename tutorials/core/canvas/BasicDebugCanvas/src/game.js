
/**
* The core BasicDebugCanvas game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 400,
	height: 300
}

var game = new Kiwi.Game('content', 'BasicDebugCanvas', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(BasicDebugCanvas.Loading);
game.states.addState(BasicDebugCanvas.Intro);
game.states.addState(BasicDebugCanvas.Play);

game.states.switchState("Loading");