//MovingBox
var Star = function(state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['star'], x, y);
    this.state = state;
    this.scaleX = Math.random() * 3;
    this.scaleY = this.scaleX;

    this.animation.add('walk', [0, 1, 2, 3, 4], 0.1, true);    
    this.animation.play('walk');

    


    Star.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.x -= 6;
        if(this.animation.currentCell == 4){
            this.destroy();
        }
    }
 

   

};

Kiwi.extend(Star,Kiwi.GameObjects.Sprite);