var state = new Kiwi.State('Play');

state.preload = function () {
    //this.addImage( 'shield', './assets/img/logo/shield.png' );
};

state.create = function () {

	this.signalText1 = new Kiwi.GameObjects.TextField ( this, "Signal 1 has dispatched 0 times.", 50, 50, "#000", 32 );
	this.addChild( this.signalText1 );

	this.signalText2 = new Kiwi.GameObjects.TextField ( this, "Signal 2 has dispatched 0 times.", 50, 100, "#000", 32 );
	this.addChild( this.signalText2 );

	this.signalText3 = new Kiwi.GameObjects.TextField ( this, "Signal 3 has dispatched 0 times.", 50, 150, "#000", 32 );
	this.addChild( this.signalText3 );

	this.counterText = new Kiwi.GameObjects.TextField ( this, "Counter: 0", 50, 200, "#000", 32 );
	this.addChild( this.counterText );

	this.counter = 0;
	this.signal1Counter = 0;
	this.signal2Counter = 0;
	this.signal3Counter = 0;

	this.counterStep = 1;

	// Creating three signals
	this.signal1 = new Kiwi.Signal();
	this.signal2 = new Kiwi.Signal();
	this.signal3 = new Kiwi.Signal();

	// Adding function to be ran when the signal is dispatched.
	this.signal1.add( this.signal1Incrementor, this );
	this.signal2.add( this.signal2Incrementor, this );
	this.signal3.add( this.signal3Incrementor, this );
};

state.update = function () {
	Kiwi.State.prototype.update.call( this );

	this.counter += this.counterStep;
	this.counterText.text = "Counter: " + this.counter;

	if( this.counter % 10 === 0 ){
		this.signal1.dispatch();
	}

	if( this.counter % 100 === 0 ){
		this.signal2.dispatch();
	}

	if( this.counter % 1000 === 0 ){
		this.signal3.dispatch();
	}


};

state.signal1Incrementor = function () {
	this.signal1Counter += this.counterStep;
	this.signalText1.text = "Signal 1 has dispatched " + this.signal1Counter + " times.";

};

state.signal2Incrementor = function () {
	this.signal2Counter += this.counterStep;
	this.signalText2.text = "Signal 2 has dispatched " + this.signal2Counter + " times.";

};

state.signal3Incrementor = function () {
	this.signal3Counter += this.counterStep;
	this.signalText3.text = "Signal 3 has dispatched " + this.signal3Counter + " times.";

};

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Signal', state, gameOptions);


