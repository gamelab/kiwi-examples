var EasingMethods = EasingMethods || {};

EasingMethods.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
EasingMethods.Play.create = function () {
	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
  this.addChild(this.name);

  this.tweens = [];

  var easing = new Array();
  easing.push(Kiwi.Animations.Tweens.Easing.Linear.None);
  easing.push(Kiwi.Animations.Tweens.Easing.Bounce.In);
  easing.push(Kiwi.Animations.Tweens.Easing.Elastic.In);
  easing.push(Kiwi.Animations.Tweens.Easing.Sinusoidal.In);
  easing.push(Kiwi.Animations.Tweens.Easing.Circular.In);
  easing.push(Kiwi.Animations.Tweens.Easing.Quartic.In);

  for (var i = 0; i < easing.length; i++) {
      var bullet = new Kiwi.GameObjects.Sprite(this, this.textures.bullet, 50, 40 * i + 25);
      this.addChild(bullet);

      var tween = this.game.tweens.create(bullet);  
      tween.delay(0);
      tween.to({ x: 700 }, 4000, easing[i]);
      this.tweens.push(tween);
      
      if (i !== 0) {
          this.tweens[i-1].chain(this.tweens[i]);
      }
  }

  this.game.input.onUp.addOnce(this.play, this);
  
}

EasingMethods.Play.play = function(){
  this.tweens[0].start();
}




