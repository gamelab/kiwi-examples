
/**
* The core CreateAndUpdate game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 400,
	height: 400
}

var game = new Kiwi.Game('content', 'CreateAndUpdate', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(CreateAndUpdate.Loading);
game.states.addState(CreateAndUpdate.Intro);
game.states.addState(CreateAndUpdate.Play);

game.states.switchState("Loading");