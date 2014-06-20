
/**
* The core Time game file.
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

var game = new Kiwi.Game('content', 'Time', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Time.Loading);
game.states.addState(Time.Intro);
game.states.addState(Time.Play);

game.states.switchState("Loading");