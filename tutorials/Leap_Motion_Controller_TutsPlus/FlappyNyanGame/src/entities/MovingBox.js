//MovingBox
var MovingBox = function(state, x, y,  angle, texture){
    Kiwi.GameObjects.StaticImage.call(this, state, state.textures[texture], x, y, false);

    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

    this.xVelo = -200;
    this.yVelo = 0;
    // this.xVelo  =Math.sin(angle)*120;
    // this.yVelo  = Math.cos(angle)*120;
    this.physics.velocity.x = this.xVelo;
    this.physics.velocity.y = this.yVelo;
    
    this.angle = angle;

    //this.rotation  = -this.angle;
    MovingBox.prototype.update = function(){
        Kiwi.GameObjects.StaticImage.prototype.update.call(this);
        this.physics.update();
        //this.rotation  = -this.angle;

        if (this.x > game.stage.width + 50 || this.x < -50 || this.y > game.stage.height + 50 || this.y < -50 ) {
            this.destroy();
        }
    }

};

Kiwi.extend(MovingBox,Kiwi.GameObjects.StaticImage);