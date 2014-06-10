var Pillar = function (state, x, y){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['pillar'], x, y);

	

	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
	this.health = 1;
	this.scaleX = 1;

	Pillar.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		this.physics.update();

		this.x -= 6;
		if (this.x < -100){
			this.destroy();
		}
	}
}
Kiwi.extend(Pillar,Kiwi.GameObjects.Sprite);