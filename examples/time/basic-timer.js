var state = new Kiwi.State('Play');

state.create = function () {

	this.timeText = new Kiwi.GameObjects.Textfield( this, "Time: 0", 50, 50, "#000", 16, 'normal');
	this.addChild( this.timeText );

	this.startText = new Kiwi.GameObjects.Textfield( this, "Click to start the timer.", 50, 100, "#000", 32, 'normal' );
	this.addChild( this.startText );

	this.counterText = new Kiwi.GameObjects.Textfield( this, "Timer has counted 0 time(s).", 50, 150, "#000", 32, 'normal' );
	this.addChild( this.counterText );

	this.stopText = new Kiwi.GameObjects.Textfield( this, "After 5 counts the Timer will stop.", 50, 200, "#000", 32, 'normal' );
	this.addChild( this.stopText );

	// You can call the createTimer method on any clock to attach a timer to the clock.
	/**
	* Param 1 - Name of Timer.
	* Param 2 - Delay Between Counts.
	* Param 3 - Repeat amount. If set to -1 will repeat infinitely.
	* Param 4 - If the timer should start.
	*/

	this.timer = this.game.time.clock.createTimer('time', 2, 5, false);

	this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_START, this.onTimerStart, this );
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_COUNT, this.onTimerCount, this );
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.onTimerStop, this );



    this.game.input.mouse.onDown.add( this.startTimer, this );
    this.timerCount = 0;
  
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );
	this.timeText.text = "Time: " + this.game.time.now();
}

state.startTimer = function () {

	this.timer.start();
}

state.onTimerStart= function () {
	this.startText.text = "The timer has started.";
	this.stopText.text = "After 5 counts the Timer will stop.";
}

state.onTimerCount = function () {
	this.timerCount += 1;
	this.counterText.text =  "Timer has counted " + this.timerCount + " times(s).";


}

state.onTimerStop = function () {
	this.timerCount = 0;
	this.stopText.text = "The timer has stopped.";
	this.startText.text = "Click to start the timer.";

}



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Basic Timer', state, gameOptions);


