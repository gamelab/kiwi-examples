var LoadingAssets = LoadingAssets || {};

LoadingAssets.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/
LoadingAssets.Play.preload = function () {
    
    this.game.stage.setRGBColor(06, 16, 41);
    this.game.stage.resize(120, 70);

    this.colorValue = 0;
    this.colorStep = 1;
    this.maxColorValue = 20;

    this.percentageText = new Kiwi.GameObjects.Textfield(this, "Loading: %0", 12, 36, '#FFFFFF', 10);
    this.addChild(this.percentageText);


    /**
    * Replace with your own in-assets to load.
    **/
    this.addImage('kiwiName', '../../assets/img/kiwijs-name.png');
    this.addSpriteSheet('icons', '../../assets/img/kiwijs-icons.png', 100, 90);
    //this.addImage('large', 'assets/img/large.jpg');

};

LoadingAssets.Play.loadUpdate = function () {
  this.game.stage.setRGBColor(6+this.colorValue, 16+this.colorValue, 41+this.colorValue);
  this.colorValue += this.colorStep;
  if(this.colorValue >= this.maxColorValue || this.colorValue <= 0){
    this.colorStep *= -1;
  }
};

LoadingAssets.Play.loadProgress = function (percent, bytesLoaded, file) {
    this.percentageText.text = "Loading: %" + percent;
    console.log(percent, bytesLoaded, file);
};

LoadingAssets.Play.loadComplete = function () {
    this.loadCompleteText = new Kiwi.GameObjects.Textfield(this, "Loading Complete", 12, 48, '#FFFFFF', 10);
    this.addChild(this.loadCompleteText);
    this.game.stage.setRGBColor(06, 16, 41);
};

LoadingAssets.Play.create = function () {
  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
 	  this.addChild(this.name);
}




