
/**
* The core Scale game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 600,
	height: 400
}

var game = new Kiwi.Game('content', 'Scale', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Scale.Loading);
game.states.addState(Scale.Intro);
game.states.addState(Scale.Play);

game.states.switchState("Loading");