var FlappyNyan = function(state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['flappyNyanCat'], x, y);
    this.state = state;
    this.animation.add('walk', [0, 1, 2, 3, 4, 5], 0.1, true);    
    this.animation.play('walk');

    FlappyNyan.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.spawnBoxes(this.state.control.hands[0].pointables[0].active, 
            this.state.control.hands[0].pointables[1].active, 
            this.state.control.hands[0].pointables[2].active, 
            this.state.control.hands[0].pointables[3].active, 
            this.state.control.hands[0].pointables[4].active);
    }

    FlappyNyan.prototype.spawnBoxes = function(one, two, three, four, five){

        if(one){    
        this.state.streamerGroup.addChild(new MovingBox(this.state, this.x , this.y + 05,  'redBox'));
        }
        if(two){ 
            this.state.streamerGroup.addChild(new MovingBox(this.state, this.x , this.y+ 15, 'orangeBox'));
        }

        if(three){ 
            this.state.streamerGroup.addChild(new MovingBox(this.state, this.x , this.y + 25,  'yellowBox'));
        }

        if(four){ 
            this.state.streamerGroup.addChild(new MovingBox(this.state, this.x, this.y + 35,  'greenBox'));
        }

        if(five){ 
            this.state.streamerGroup.addChild(new MovingBox(this.state, this.x, this.y + 45, 'blueBox'));
        }
    }

}

Kiwi.extend(FlappyNyan,Kiwi.GameObjects.Sprite);