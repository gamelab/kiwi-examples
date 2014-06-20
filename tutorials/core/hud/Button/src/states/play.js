var Button = Button || {};

Button.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Button.Play.create = function () {
  this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  /**
  * Create a new Button
  * - Parameter One - The game that this BasicScore belongs to.
  * - Parameter Two - The cooridnates of the game on the x-axis.
  * - Parameter Three - The cooridnates of the game on the y-axis.
  * - Parameter Four - The initial score to start off at.
  *
  * You can also apply your own CSS to these widgets to customize your game even further.
  **/
  this.myButton = new Kiwi.HUD.Widget.Button(this.game, 'Click this Button!', 10, 40);
  this.myButton.style.color = '#FFFFFF';
  this.myButton.style.backgroundColor = '#999';
  this.addStyle();

  this.clickCounter = 0;
  this.timesClicked = new Kiwi.GameObjects.Textfield(this, 'Times Clicked = 0', 10, 90, '#FFFFFF', 14);
  this.addChild(this.timesClicked)

  this.game.huds.defaultHUD.addWidget(this.myButton);
  this.myButton.input.onUp.add(this.buttonUp, this);
  this.myButton.input.onDown.add(this.buttonDown, this);
  this.myButton.input.onOver.add(this.buttonOver, this);
  this.myButton.input.onOut.add(this.buttonOut, this);
}

Button.Play.buttonUp = function(){
  this.timesClicked.text = 'Times Clicked = ' + (++ this.clickCounter);
  this.myButton.style.color = '#000000';
  this.myButton.style.position = 'relative';
  this.myButton.style.top =  (this.myButton.y + 0)+'px';

}
Button.Play.buttonDown = function(){
  this.myButton.style.position = 'relative';
  this.myButton.style.top =  (this.myButton.y + 1) + 'px';
}
Button.Play.buttonOver = function(){
  this.myButton.style.color = '#000000';
  this.myButton.style.boxShadow = 'inset 0 0 7px rgba(0,0,0,0.35)';
}
Button.Play.buttonOut = function(){
  this.myButton.style.color = '#FFFFFF';
  this.myButton.style.boxShadow = 'none';
}

Button.Play.addStyle = function(){
  this.myButton.style.display= 'inline-block';
  this.myButton.style.padding = '0.75em';
  this.myButton.style.borderRadius = '3px';
  this.myButton.style.fontSize = '0.9em';
  this.myButton.style.color = 'white';
  this.myButton.style.textDecoration = 'none';
  this.myButton.style.textAlign = 'center';
  
  this.myButton.style.textShadow = '0 0 5px rgba(255,255,255,0.2)';
  this.myButton.style.border = '1px solid rgba(0,0,0,0.25)';
  
  /* gradient */
  this.myButton.style.background = '#0099cc'; /* Old browsers */
  this.myButton.style.background = '-moz-linear-gradient(top, #0099cc 0%, #0077aa 100%)'; /* FF3.6+ */
  this.myButton.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0%,#0099cc), color-stop(100%,#0077aa))'; /* Chrome,Safari4+ */
  this.myButton.style.background = '-webkit-linear-gradient(top, #0099cc 0%,#0077aa 100%)'; /* Chrome10+,Safari5.1+ */
  this.myButton.style.background = '-o-linear-gradient(top, #0099cc 0%,#0077aa 100%)'; /* Opera 11.10+ */
  this.myButton.style.background = '-ms-linear-gradient(top, #0099cc 0%,#0077aa 100%)'; /* IE10+ */
  this.myButton.style.background = 'linear-gradient(to bottom, #0099cc 0%,#0077aa 100%)'; /* W3C */
  this.myButton.style.filter = 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#0099cc", endColorstr="#0077aa",GradientType=0 )'; /* IE6-9 */
}




