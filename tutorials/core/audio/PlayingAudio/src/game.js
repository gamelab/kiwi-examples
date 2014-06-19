
/**
* The core PlayingAudio game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_CANVAS, 
	width: 200,
	height: 200
}

var game = new Kiwi.Game('content', 'PlayingAudio', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(PlayingAudio.Loading);
game.states.addState(PlayingAudio.Intro);
game.states.addState(PlayingAudio.Play);

game.states.switchState("Loading");