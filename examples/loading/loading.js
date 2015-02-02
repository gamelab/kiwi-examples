var state = new Kiwi.State('Play');

state.preload = function () {
	//kiwi.js
	this.addImage('k', './assets/img/logo/k.png');
	this.addImage('i', './assets/img/logo/i.png');
	this.addImage('w', './assets/img/logo/w.png');
	this.addImage('dot', './assets/img/logo/dot.png');
	this.addImage('j', './assets/img/logo/j.png');
	this.addImage('s', './assets/img/logo/s.png');
	this.addImage('underline', './assets/img/logo/underline.png');


	//Logo
	this.addImage('bomb', './assets/img/logo/bomb.png');
	this.addImage('castle', './assets/img/logo/castle.png');
	this.addImage('controller-1', './assets/img/logo/controller-1.png');
	this.addImage('controller-2-left', './assets/img/logo/controller-2-left.png');
	this.addImage('controller-2-right', './assets/img/logo/controller-2-right.png');
	this.addImage('crown', './assets/img/logo/crown.png');

	this.addImage('fingers', './assets/img/logo/fingers.png');

	this.addImage('heart-1', './assets/img/logo/heart.png');
	this.addImage('heart-2', './assets/img/logo/heart-2.png');
	this.addImage('jigsaw-1', './assets/img/logo/jigsaw.png');
	this.addImage('jigsaw-2', './assets/img/logo/jigsaw-2.png');

	this.addImage('key', './assets/img/logo/key.png');

	this.addImage('lighting-1-left', './assets/img/logo/lighting-bolt-left.png');
	this.addImage('lighting-1-right', './assets/img/logo/lighting-bolt-right.png');
	this.addImage('lighting-2-left', './assets/img/logo/lighting-bolt-2-left.png');
	this.addImage('lighting-2-right', './assets/img/logo/lighting-bolt-2-right.png');
	this.addImage('lighting-3', './assets/img/logo/lighting-bolt-3.png');

	this.addImage('mouse', './assets/img/logo/mouse.png');
	this.addImage('pacman', './assets/img/logo/pacman.png');
	this.addImage('rocket', './assets/img/logo/rocket.png');
	this.addImage('shield', './assets/img/logo/shield.png');
	this.addImage('spade', './assets/img/logo/spade.png');
	this.addImage('speech', './assets/img/logo/speech-bubble.png');

	this.addImage('sword', './assets/img/logo/sword.png');
	this.addImage('sword-2-left', './assets/img/logo/sword-2-left.png');
	this.addImage('sword-2-right', './assets/img/logo/sword-2-right.png');

    this.counter = 0;
    this.filesLoadedz = new Kiwi.Group( this );

};

// state.loadUpdate = function () {
// 	Kiwi.State.prototype.loadUpdate.call( this );
// 	console.log ( "Load Update", "ZACH" );
// }

state.loadProgress = function ( percent, bytesloaded, file ) {
	this.counter += 1;
	if( file == undefined || percent == 100 ) {
		return;
	}
	var string = file.key + " Loaded. Percent: " + percent + " Bytes Loaded: " + bytesloaded;
	var loadText = new Kiwi.GameObjects.Textfield( this, string, 10, this.counter * 12, "#000", 10 );
	this.filesLoadedz.addChild( loadText );
	console.log( loadText );
	// this.addChild( loadText );



}
// state.loadComplete = function () {
// 	// Kiwi.State.prototype.loadComplete.call( this );
// 	//console.log ( "Load Complete", "ZACH" );

// }





state.create = function () {
	console.log( this, "ZACH" );

	console.log( this.filesLoadedz )
	this.addChild(this.filesLoadedz);

	this.test = new Kiwi.GameObjects.Sprite( this, this.textures.shield, 50, 50 );
	this.addChild( this.test );


};
state.update = function () {
	Kiwi.State.prototype.update.call( this );
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Loading', state, gameOptions);


