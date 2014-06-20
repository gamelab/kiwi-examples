
/**
* The core BasicScore game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 300,
	height: 300
}

var game = new Kiwi.Game('content', 'BasicScore', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(BasicScore.Loading);
game.states.addState(BasicScore.Intro);
game.states.addState(BasicScore.Play);

game.states.switchState("Loading");