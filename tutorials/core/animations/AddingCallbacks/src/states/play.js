var AddingCallbacks = AddingCallbacks || {};

AddingCallbacks.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/

AddingCallbacks.Play.create = function () {
  //create our sprite
  this.griffon = new Kiwi.GameObjects.Sprite(this,this.textures.griffon, 25, 30);
  this.addChild(this.griffon);
  this.counter = 0;

  //add some animations to the zombag and keep a reference to the animations
  this.griffon.animation.add('walk', [1, 2, 3, 4, 5, 6], 0.075, true);
  this.griffon.animation.add('fade', [11, 12, 13, 14, 15], 0.3, false);
  this.griffon.animation.play('walk');

  this.griffon.animation.getAnimation('walk').onPlay.add(this.walkStarted, this);
  this.griffon.animation.getAnimation('walk').onUpdate.add(this.walkUpdated, this);

  this.griffon.animation.getAnimation('fade').onStop.add(this.finishedFade, this);
}

AddingCallbacks.Play.update = function () {
  Kiwi.State.prototype.update.call(this);
}
AddingCallbacks.Play.walkStarted = function () {
  this.counter = 0;

}
AddingCallbacks.Play.walkUpdated = function () {
  this.counter++;
  if(this.counter >= 24){
    this.griffon.animation.play('fade');
    this.counter = 0;
  }

}
AddingCallbacks.Play.finishedFade = function () {
  this.griffon.animation.play('walk');

}




