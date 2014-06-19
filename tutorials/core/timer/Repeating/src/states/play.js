var Repeating = Repeating || {};

Repeating.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
Repeating.Play.create = function () {

  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
	  this.addChild(this.name);

    this.bullets = [];
    this.mujahadeen = new Kiwi.GameObjects.Sprite(this, this.textures.mujahadeen, 100, 300);
    this.addChild(this.mujahadeen);                                                               
    
    /**
    * set the value of a clock unit. 
    **/
    this.game.time.clock.units = 250;

    /**
    * Create a new timer event on the master clock and save it in timerEvent
    * - Parameter One - name of the timer.
    * - Parameter Two - delay on the timer in clock units.
    * - Parameter Three - number of times to repeat - -1 means infinite/never expires
    * - Parameter Four - should the timer start? - defaults to true
    **/
    this.timer  = this.game.time.clock.createTimer('shoot', 2, -1, false);
    this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.shoot, this);  //create a new timer event on that timer
    this.timer.start();
  
}
Repeating.Play.shoot = function(){
  var bullet = new Kiwi.GameObjects.StaticImage(this, this.textures.bullet, this.mujahadeen.x + this.mujahadeen.width, (this.mujahadeen.y + this.mujahadeen.height / 2) + 10 );
  this.bullets.push(bullet);
  this.addChild(bullet);
}
Repeating.Play.update = function(){
  Kiwi.State.prototype.update.call(this);

  //loop through the bullets and shoot!
  for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].x += 10;

      //destroy it if the bullet is not on screen any more
      if (this.bullets[i].x > this.game.stage.width) {

          this.bullets[i].destroy();
          this.bullets.splice(i, 1);
          i--;

      }
  }

}



