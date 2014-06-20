
/**
* The core Bar game file.
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

var game = new Kiwi.Game('content', 'Bar', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Bar.Loading);
game.states.addState(Bar.Intro);
game.states.addState(Bar.Play);

game.states.switchState("Loading");