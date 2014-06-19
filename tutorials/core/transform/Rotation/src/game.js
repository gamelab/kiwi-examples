
/**
* The core Rotation game file.
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

var game = new Kiwi.Game('content', 'Rotation', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Rotation.Loading);
game.states.addState(Rotation.Intro);
game.states.addState(Rotation.Play);

game.states.switchState("Loading");