var GettingStarted = GettingStarted || {};

GettingStarted.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/

GettingStarted.Play.init = function () {
  this.control = Kiwi.Plugins.LEAPController.createController();
}

/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
GettingStarted.Play.create = function () {
    this.hand = new Kiwi.GameObjects.Sprite(this, this.textures['hand'],  0, 0);
    this.addChild(this.hand);
    this.fingers = [];
    for (var i = 0; i <= 5; i++) {
      var temp = new Kiwi.GameObjects.Sprite(this, this.textures['finger'], 0, 0);
      this.addChild(temp); 
      this.fingers.push(temp);
    };
}


GettingStarted.Play.update = function() {
  Kiwi.State.prototype.update.call(this);

  this.hand.x = this.control.hands[0].posX + (game.stage.width * 0.5);
  this.hand.y = -this.control.hands[0].posY + (game.stage.height);

  for (var i = this.fingers.length - 1; i >= 0; i--) {
    this.fingers[i].x = this.control.hands[0].pointables[i].tipX;
    this.fingers[i].x += game.stage.width * 0.5;

    this.fingers[i].y = -this.control.hands[0].pointables[i].tipY;
    this.fingers[i].y += game.stage.height;
  }; 
};



