var MultiTouch = MultiTouch || {};

MultiTouch.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
MultiTouch.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  	this.addChild(this.name);

    if (Kiwi.DEVICE.touch) {

            
            var text = new Kiwi.GameObjects.Textfield(this, 'Touch the device to create a new Character!', this.game.stage.width / 2, 10, '#FFF', 12);
            text.textAlign = 'center';
            this.addChild(text);

            /**
            * Add the callbacks to the touch manager.
            **/
            // this.game.input.touch.touchDown.add(this.spawn, this);
            // this.game.input.touch.touchUp.add(this.remove, this);

            this.game.input.onDown.add(this.spawn, this);
            this.game.input.onUp.add(this.remove, this);

            //create a new character for each finger.
            this.characters = [];
            this.pointers = [];

            for (var i = 0; i < this.game.input.touch.fingers.length; i++) {


                var c = new Kiwi.GameObjects.Sprite(this, this.textures.characters);
                this.characters.push(c);
                c.cellIndex = i;
            }

        } else {
           console.log("Hello?");

            var text = new Kiwi.GameObjects.Textfield(this, 'In order to view this example you need to be on a touch enabled device :(', this.game.stage.width / 2, this.game.stage.height / 3, '#FFF', 16);
            text.textAlign = 'center';
            this.addChild(text);
            
        }
  
}
MultiTouch.Play.spawn = function (x, y, timeDown, timeUp, duration, pointer) {
  this.pointers.push(pointer);
  this.addChild(this.characters[this.pointers.length - 1]);
}
MultiTouch.Play.removePointer = function (pointer) {
  for (var i = 0; i < this.pointers.length; i++) {
            if (pointer.id == this.pointers[i].id) {

                this.removeChild(this.characters[i]);
                this.pointers.splice(i, 1);
                return true;
            }
        }
        return false;
}
MultiTouch.Play.remove = function (x, y, timeDown, timeUp, duration, pointer) {
  this.removePointer(pointer);
}
MultiTouch.Play.update = function () {
  Kiwi.State.prototype.update.call(this);



  if(Kiwi.DEVICE.touch) {

      //loop through all of the active pointers and move the characters to be in position with them.
      //console.log(this.pointers.length, "Here");
      for (var i = 0; i < this.pointers.length; i++) {
          console.log("INSIDE THE THING", i, this.pointers[i].active);

          if (this.pointers[i].active) {

              this.characters[i].x = this.pointers[i].x - 75;
              this.characters[i].y = this.pointers[i].y - 50;

          } else {
              if (this.removePointer(this.pointers[i])) {
                  i--;
              }
          }
      }
  }
}



