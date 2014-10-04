
/**
* The core CreationProgrammatically game file.
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

var game = new Kiwi.Game('content', 'CreationProgrammatically', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(CreationProgrammatically.Loading);
game.states.addState(CreationProgrammatically.Intro);
game.states.addState(CreationProgrammatically.Play);

game.states.switchState("Loading");