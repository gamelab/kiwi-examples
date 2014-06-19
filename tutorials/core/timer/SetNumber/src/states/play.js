var SetNumber = SetNumber || {};

SetNumber.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/


/**
* This create method is executed when a Kiwi state has finished loading any resources that were required to load.
*/
SetNumber.Play.create = function () {
  	this.name = new Kiwi.GameObjects.StaticImage(this, this.textures.kiwiName, 10, 10);
	  this.addChild(this.name);

    //create the animations.
    this.textures.german.sequences.push(new Kiwi.Animations.Sequence('walk', [1, 2, 3, 4, 5, 6], 0.2, true));
    this.textures.tank.sequences.push(new Kiwi.Animations.Sequence('move', [1, 2, 3, 4, 5, 6], 0.2, true));

    this.germans = [];

    /**
    * set the value of a clock unit. 
    **/
    this.game.time.clock.units = 400;

    /**
    * Create a new timer event on the master clock and save it in timerEvent
    * - Parameter One - name of the timer.
    * - Parameter Two - delay on the timer in clock units.
    * - Parameter Three - number of times to repeat - -1 means infinite/never expires
    **/
    this.timer = this.game.time.clock.createTimer('spawn', 2, 20, false);  
    this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_START, this.spawnTank, this);
    this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnTroop, this);  //create a new timer event on that timer.
    this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_STOP, this.spawnTank, this);

    this.timer.start();
  
}

SetNumber.Play.spawnTroop = function(){
  //if its not the first german spawning
  if (this.timer.currentCount() !== 0) {

      var g = new Kiwi.GameObjects.Sprite(this, this.textures.german, -150, 200);
      g.animation.play('walk');
      this.addChild(g);
      this.germans.push(g);

  }
}
SetNumber.Play.spawnTank = function(){
  var t = new Kiwi.GameObjects.Sprite(this, this.textures.tank, -150, 200);
  t.animation.play('move');
  this.addChild(t);
  this.germans.push(t);
}
SetNumber.Play.update = function(){
  Kiwi.State.prototype.update.call(this);
  //loop through the bullets and shoot!
  for (var i = 0; i < this.germans.length; i++) {
      this.germans[i].x += 3;

      //destroy it if the german is not on screen any more
      if (this.germans[i].x > this.game.stage.width) {

          this.germans[i].destroy();
          this.germans.splice(i, 1);
          i--;

      }
  }
}




