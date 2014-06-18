var PlayingInReverse = PlayingInReverse || {};

PlayingInReverse.Play = new Kiwi.State('Play');

PlayingInReverse.Play.create = function () {

	this.zombie = new Kiwi.GameObjects.Sprite(this, this.textures.zombie, 25, 30);
  this.walkAnim = this.zombie.animation.add('walk', [1, 2, 3, 4, 5, 6], 0.075, true);
  this.addChild(this.zombie);
  this.zombie.animation.play('walk');

  this.game.input.onUp.add(this.reverse, this);

  this.mainText = new Kiwi.GameObjects.Textfield(this, 'Click to Reverse Animation', 2, 175, '#CCCCCC', 17);
  this.addChild(this.mainText);
  
}

PlayingInReverse.Play.reverse = function(){
  this.walkAnim.reverse = !this.walkAnim.reverse

}




