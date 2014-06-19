
/**
* The core SwappingTiles game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_WEBGL, 
	width: 800,
	height: 288
}

var game = new Kiwi.Game('content', 'SwappingTiles', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(SwappingTiles.Loading);
game.states.addState(SwappingTiles.Intro);
game.states.addState(SwappingTiles.Play);

game.states.switchState("Loading");