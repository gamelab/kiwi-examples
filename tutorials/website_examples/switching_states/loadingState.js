var loadingState = new Kiwi.State( "LoadingState" );

loadingState.preload = function() {
	Kiwi.State.prototype.preload.call( this );

	this.addImage( "outside", "manorOutside.png" );
	this.addImage( "interior", "tavernInterior.png" );
	this.addSpriteSheet( "characterSprite", "character.png", 150, 117 );
};


loadingState.create = function(){
	Kiwi.State.prototype.create.call( this );

	this.game.states.switchState( "OutsideState" );
};
