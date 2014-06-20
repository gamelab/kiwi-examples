var Textfield = Textfield || {};

Textfield.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Textfield.Play.create = function () {

	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  /**
  * Create a new Textfield
  * - Parameter One - The state that this Textfield belongs to.
  * - Parameter Two - The text that is contained within this textfield
  * - Parameter Three - The new x coordinate from the Position component
  * - Parameter Four - The new y coordinate from the Position component
  * - Parameter Five - The color of the text.
  * - Parameter Six - The size of the text in pixels.
  * - Parameter Seven - The weight of the text.
  * - Parameter Eight - The font family that is to be used when rendering.
  **/
  this.text1 = new Kiwi.GameObjects.Textfield(this, 'White, Size 32, Bold, sans-serif.', 10, 40, '#FFFFFF', 32, 'bold', 'sans-serif');
   //Add text to stage.
  this.addChild(this.text1);

  this.text2 = new Kiwi.GameObjects.Textfield(this, 'Light Blue, Size 14, Normal, serif.', 10, 80, '#91FFFF', 14, 'normal', 'serif');
   //Add text to stage. 
  this.addChild(this.text2);

  this.text3 = new Kiwi.GameObjects.Textfield(this, 'Red, Size 20, italic, san-serif.', 10, 100, '#FF0000', 20, 'italic', 'san-serif');
   //Add text to stage. 
  this.addChild(this.text3);

}




