var Looping = Looping || {};

Looping.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Looping.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);
  this.playing = false;
  this.direction = "right";

  //create our cat
  this.cat = new Kiwi.GameObjects.Sprite(this, this.textures.cat, 100, 200);

  //see animation component section about animations
  this.cat.animation.add('moving', [1,2,3,4,5,6], 0.1, true);
  this.cat.animation.add('stop', [0], 0, false);

  this.addChild(this.cat);
  this.cat.animation.play('stop');
  
  //When the cat has been clicked. 
  //Note: onRelease is the same as onUp. Aka onRelease is an alias for onUp.
  this.cat.input.onRelease.add(this.moveKitty, this);
  
}
Looping.Play.stop = function(){
  this.cat.animation.play('stop');
  this.playing = false;
}
Looping.Play.moveKitty = function(){
  if (!this.playing) {
    /**
    * To create a tween you need to create the tween via the manager.
    * When you create the tween you pass in the object that the tween is taking affect on.
    **/
    this.tween = this.game.tweens.create(this.cat);

    //move the cat to the right
    if (this.direction == 'left') {
        this.direction = 'right';
        this.cat.scaleX = -1;
        this.tween.to({ x: 100 }, 800, Kiwi.Animations.Tweens.Easing.Linear.None, true);

    //move the cat to the left
    } else {
        this.direction = 'left';
        this.cat.scaleX = 1;
        this.tween.to({ x: 600 }, 800, Kiwi.Animations.Tweens.Easing.Linear.None, true);
    }

    
    //adding a callback to the tween.
    this.tween.onComplete(this.stop, this);

    //start the animation. We are now playing.
    this.playing = true;
    this.cat.animation.play('moving');
  }  

}




