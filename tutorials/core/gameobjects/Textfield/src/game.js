
/**
* The core Textfield game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_CANVAS, 
	width: 600,
	height: 130
}

var game = new Kiwi.Game('content', 'Textfield', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Textfield.Loading);
game.states.addState(Textfield.Intro);
game.states.addState(Textfield.Play);

game.states.switchState("Loading");