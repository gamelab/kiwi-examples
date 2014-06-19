
/**
* The core Position game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 650,
	height: 350
}

var game = new Kiwi.Game('content', 'Position', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Position.Loading);
game.states.addState(Position.Intro);
game.states.addState(Position.Play);

game.states.switchState("Loading");