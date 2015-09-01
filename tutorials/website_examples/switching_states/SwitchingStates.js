var myGame = new Kiwi.Game();

myGame.states.addState( loadingState );
myGame.states.addState( interiorState );
myGame.states.addState( outsideState );

myGame.states.switchState( "LoadingState" );
