//MovingBox
var FlappyNyan = function(state, x, y,  angle){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['flappyNyanCat'], x, y);
    this.nyanX = 10;
    this.nyanY = 10;
    this.state = state;
    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

    this.animation.add('walk', [0, 1, 2, 3, 4, 5], 0.1, true);    
    this.animation.play('walk');

    
    this.nyanAngle = angle;

    //this.rotation  = -this.angle;
    FlappyNyan.prototype.update = function(){
        Kiwi.GameObjects.StaticImage.prototype.update.call(this);
        this.rotation  = -this.angle;
        this.physics.update();

    }

    FlappyNyan.prototype.findVelo = function(){
    this.xVelo  =Math.sin(angle)*120;
    this.yVelo  = Math.cos(angle)*120;
    this.physics.velocity.x = this.xVelo;
    this.physics.velocity.y = this.yVelo;
    }

    FlappyNyan.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
    }
    FlappyNyan.prototype.updatePos = function(xPos, yPos, angle){
        this.nyanX = xPos;
        this.nyanY = yPos;
        // this.x = xPos + 280;
        // this.y = -yPos +310;
        this.nyanAngle = angle - (Math.PI * 0.5);

    }

    FlappyNyan.prototype.spawnBoxes = function(one, two, three, four, five){

     if(one){    
        this.state.boxGroup.addChild(new MovingBox(this.state, this.nyanX + 140, -this.nyanY + 330, this.nyanAngle, 'blueBox'));
     }
    if(two){ 
        this.state.boxGroup.addChild(new MovingBox(this.state, this.nyanX + 140, -this.nyanY+ 320, this.nyanAngle, 'greenBox'));
    }

    if(three){ 
        this.state.boxGroup.addChild(new MovingBox(this.state, this.nyanX + 140, -this.nyanY + 310, this.nyanAngle, 'yellowBox'));
    }

    if(four){ 
        this.state.boxGroup.addChild(new MovingBox(this.state, this.nyanX + 140, -this.nyanY + 300, this.nyanAngle, 'orangeBox'));
    }

    if(five){ 
        this.state.boxGroup.addChild(new MovingBox(this.state, this.nyanX + 140, -this.nyanY + 290, this.nyanAngle, 'redBox'));
    }

    }

};

Kiwi.extend(FlappyNyan,Kiwi.GameObjects.Sprite);