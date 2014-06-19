
/**
* The core MultiTouch game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_CANVAS, 
	width: 800,
	height: 600,
	scaleType: Kiwi.Stage.SCALE_FIT
}

var game = new Kiwi.Game('content', 'MultiTouch', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(MultiTouch.Loading);
game.states.addState(MultiTouch.Intro);
game.states.addState(MultiTouch.Play);

game.states.switchState("Loading");