
/**
* The core GroupRotation game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 550,
	height: 250
}

var game = new Kiwi.Game('content', 'GroupRotation', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(GroupRotation.Loading);
game.states.addState(GroupRotation.Intro);
game.states.addState(GroupRotation.Play);

game.states.switchState("Loading");