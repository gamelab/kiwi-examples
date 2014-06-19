
/**
* The core LoopingAudio game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 200,
	height: 200
}

var game = new Kiwi.Game('content', 'LoopingAudio', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(LoopingAudio.Loading);
game.states.addState(LoopingAudio.Intro);
game.states.addState(LoopingAudio.Play);

game.states.switchState("Loading");