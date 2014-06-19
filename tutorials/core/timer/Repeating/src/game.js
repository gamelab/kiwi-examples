
/**
* The core Repeating game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 600
}

var game = new Kiwi.Game('content', 'Repeating', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Repeating.Loading);
game.states.addState(Repeating.Intro);
game.states.addState(Repeating.Play);

game.states.switchState("Loading");