var MultipleSprites = MultipleSprites || {};

MultipleSprites.Play = new Kiwi.State('Play');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*/

MultipleSprites.Play.create = function () {

	this.squid1 = new Kiwi.GameObjects.Sprite(this, this.textures.squid, 25, 30);
	this.addChild(this.squid1);
	this.squid1.animation.add('walk', [1, 2, 3, 4, 5, 6], 0.075, true);
	this.squid1.animation.play('walk');
	
	this.squid2 = new Kiwi.GameObjects.Sprite(this, this.textures.squid, 225, 30);
	this.addChild(this.squid2) ; 
	this.squid2.animation.add('jump', [8, 9,  10], 1, true);
	this.squid2.animation.play('jump');


}




