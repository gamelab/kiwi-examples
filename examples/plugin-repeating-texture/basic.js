var myState = new Kiwi.State('myState');

myState.preload = function() {
	//The images we are going to load in.
	this.addImage('wall', './assets/img/plugins/repeating-texture/greenwall.png');
}

myState.create = function() {
	
	/**
	* @param one - The state
	* @param two - The texture to use
	* @param three - Its 'x' coordinate
	* @param four - Its 'y' coordinate
	* @param five - The width of the area is should take up.
	* @param six - the height of the area is should take up. 
	*/
	this.wall = new Kiwi.Plugins.GameObjects.RepeatingTexture(this, this.textures.wall, 0, 0, this.game.stage.width, this.game.stage.height);

	//Note: If you only want it to repeat in 'one' direction then you can set the booleans 'repeatX/repeatY' to false.

	this.addChild(this.wall);

}


var game = new Kiwi.Game( "game-container", 'Intro', myState, { plugins: ['RepeatingTexture'], renderer: Kiwi.RENDERER_CANVAS })