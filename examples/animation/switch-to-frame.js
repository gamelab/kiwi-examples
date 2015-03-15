var state = new Kiwi.State('Play');

state.preload = function () {
    this.addSpriteSheet('griffon', './assets/img/anime/griffon.png', 150, 117);
}

state.create = function () {

	this.griffon = new Kiwi.GameObjects.Sprite(this, this.textures.griffon, 250, 150);
	this.addChild( this.griffon );


	this.cellIndexText = new Kiwi.GameObjects.Textfield( this, "Cell Index: 0", 15, 15, '#000', 20 );
	this.addChild( this.cellIndexText );

	this.game.input.mouse.onDown.add( this.switchFrame, this );
}


state.switchFrame = function (){

	var randomFrame = Math.floor( Math.random() * this.griffon.animation.length );


	// This will switch to a randomly selected frame on the texture atlas of the sprite.
	this.griffon.animation.switchTo( randomFrame );
	this.cellIndexText.text = "Animation Frame Index: " + this.griffon.animation.frameIndex;

}



var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Switch to frame', state, gameOptions);


