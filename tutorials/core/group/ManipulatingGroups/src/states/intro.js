var ManipulatingGroups = ManipulatingGroups || {};

ManipulatingGroups.Intro = new Kiwi.State('Intro');

/**
* The IntroState is the state which would manage any main-menu functionality for your game.
* Generally this State would switch to other sub 'states' which would handle the individual features. 
*  
* Right now we are just switching straight to the PlayState.
*
*/


ManipulatingGroups.Intro.create = function () {
    game.states.switchState("Play");
}