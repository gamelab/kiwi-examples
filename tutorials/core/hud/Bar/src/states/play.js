var Bar = Bar || {};

Bar.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Bar.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);


  /**
  * Create a new Textfield
  * - Parameter One - The game that this bar belongs to.
  * - Parameter Two - The current value of the bar.
  * - Parameter Three - The maximum value that there can be.
  * - Parameter Four - The coordinates of this widget on the x-axis
  * - Parameter Five - The cooridnates of this widget on the y-axis.
  * - Parameter Six - The width of the widget. Defaults to 120.
  * - Parameter Seven - The height of the widget. Defaults to 20.
  * - Parameter Eight - The default color of the inner bar. Defaults to #000 (black).
  *
  * You can also apply your own CSS to these widgets to customize your game even further.
  **/
  this.myBar = new Kiwi.HUD.Widget.Bar(this.game, 100, 100, 10, 40, 100, 20, '#FFFFFF');
  this.myBar.style.backgroundColor = '#91FFFF';

  this.game.huds.defaultHUD.addWidget(this.myBar);
  this.step = 1;
  
}
Bar.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  this.myBar.counter.current += this.step;
  if(this.myBar.counter.current == 0 || this.myBar.counter.current == 100){
    this.step *= -1;
  }
}




