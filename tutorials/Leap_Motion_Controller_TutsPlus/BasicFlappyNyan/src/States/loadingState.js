

/**
* Since we want to use the custom Kiwi.JS loader with the bobing kiwi/html5 logo and everything. We need to extend the KiwiLoadingScreen State.  
* The KiwiLoadingScreen State is an extentsion of a normal State but it has some custom code to handle the loading/bobbing/fading of all the items, so if you override a method (like the preload) for example just make sure you call the super method.
* 
* The parameters we are passing into this method are as ordered.
* 1 - name {String} Name of this state.
* 2 - stateToSwitch {String} Name of the state to switch to AFTER all the assets have loaded. Note: The state you want to switch to should already have been added to the game.
* 3 - dimensions {Object} A Object containing the width/height that the game is to be. For example {width: 1024, height: 768}
* 4 - subfolder {String} The folder that the loading graphics are located at. 
*/
var LoadingState = new KiwiLoadingScreen('LoadingState','IntroState',{width:580,height: 400}, 'assets/img/loading/');

LoadingState.preload = function () {
    
    //Make sure to call the super at the top.
    //Otherwise the loading graphics will load last, and that defies the whole point in loading them. 
    KiwiLoadingScreen.prototype.preload.call(this);

    this.addSpriteSheet('flappyNyanCat', 'assets/img/FlappyNyanCat.png', 111, 70);


    this.addImage('yellowBox', 'assets/img/YellowBox.png');
    this.addImage('blueBox', 'assets/img/BlueBox.png');
    this.addImage('orangeBox', 'assets/img/OrangeBox.png');
    this.addImage('greenBox', 'assets/img/GreenBox.png');
    this.addImage('redBox', 'assets/img/RedBox.png');
    this.addImage('pauseImage', 'assets/img/pauseImage.png');


    game.stage.resize(600, 290);
};
