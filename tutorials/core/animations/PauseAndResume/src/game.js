
/**
* The core PauseAndResume game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_CANVAS, 
	width: 200,
	height: 200
}

var game = new Kiwi.Game('content', 'PauseAndResume', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(PauseAndResume.Loading);
game.states.addState(PauseAndResume.Intro);
game.states.addState(PauseAndResume.Play);

game.states.switchState("Loading");