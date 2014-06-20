
/**
* The core Button game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_CANVAS, 
	width: 800,
	height: 600
}

var game = new Kiwi.Game('content', 'Button', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Button.Loading);
game.states.addState(Button.Intro);
game.states.addState(Button.Play);

game.states.switchState("Loading");