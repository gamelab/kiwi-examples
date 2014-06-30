
/**
* The core SwitchingStates game file.
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

var game = new Kiwi.Game('content', 'SwitchingStates', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(SwitchingStates.Loading);
game.states.addState(SwitchingStates.Intro);
game.states.addState(SwitchingStates.State1);
game.states.addState(SwitchingStates.State2);

game.states.switchState("Loading");