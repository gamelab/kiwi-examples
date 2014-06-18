
/**
* The core AddingCallbacks game file.
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

var game = new Kiwi.Game('content', 'AddingCallbacks', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(AddingCallbacks.Loading);
game.states.addState(AddingCallbacks.Intro);
game.states.addState(AddingCallbacks.Play);

game.states.switchState("Loading");