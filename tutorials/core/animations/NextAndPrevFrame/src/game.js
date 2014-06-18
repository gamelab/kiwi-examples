
/**
* The core NextAndPrevFrame game file.
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

var game = new Kiwi.Game('content', 'NextAndPrevFrame', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(NextAndPrevFrame.Loading);
game.states.addState(NextAndPrevFrame.Intro);
game.states.addState(NextAndPrevFrame.Play);

game.states.switchState("Loading");