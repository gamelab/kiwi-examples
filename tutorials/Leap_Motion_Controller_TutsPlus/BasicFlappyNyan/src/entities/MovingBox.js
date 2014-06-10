
var MovingBox = function(state, x, y, texture){
    Kiwi.GameObjects.StaticImage.call(this, state, state.textures[texture], x, y, false);
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

    this.xVelo = -200;
    this.yVelo = 0;
    this.physics.velocity.x = this.xVelo;
    this.physics.velocity.y = this.yVelo;
    
    MovingBox.prototype.update = function(){
        Kiwi.GameObjects.StaticImage.prototype.update.call(this);
        this.physics.update();
        if (this.x < -50) {
            this.destroy();
        }
    }

};

Kiwi.extend(MovingBox,Kiwi.GameObjects.StaticImage);