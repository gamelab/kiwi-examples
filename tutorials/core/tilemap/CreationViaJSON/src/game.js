
/**
* The core CreationViaJSON game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 270
}

var game = new Kiwi.Game('content', 'CreationViaJSON', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(CreationViaJSON.Loading);
game.states.addState(CreationViaJSON.Intro);
game.states.addState(CreationViaJSON.Play);

game.states.switchState("Loading");