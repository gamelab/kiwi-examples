var myGame = new Kiwi.Game();

var myState = new Kiwi.State('myState');

myState.preload = function() {
	Kiwi.State.prototype.preload.call(this);
	this.addImage('cannon', 'cannon.png');
    this.addImage('background', 'background.png');
    this.addImage('cannonBall', 'cannonBall.png');
    this.addImage('pirateShip', 'pirateShip.png');
    this.addImage('ship', 'ship.png');

}


myState.create = function(){

    this.mouse = this.game.input.mouse;
    this.centerPoint = new Kiwi.Geom.Point(375, 240);

    this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['background'], 0, 0);
    this.ship = new Kiwi.GameObjects.Sprite(this, this.textures['cannon'], 370, 209);

    this.cannonBallGroup = new Kiwi.Group(this);
    this.pirateShipGroup = new Kiwi.Group(this);


    this.addChild(this.background);
    this.addChild(this.ship);
    this.addChild(this.cannonBallGroup);
    this.addChild(this.pirateShipGroup);


    this.pirateShipGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['pirateShip'], 100, 45)); //2.2
    this.pirateShipGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['pirateShip'],570, 45)); //-2.2
    this.pirateShipGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['pirateShip'],100, 320)); //1
    this.pirateShipGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['pirateShip'], 570, 320)); //-1

    pirateShipsRotation = this.pirateShipGroup.members;
    pirateShipsRotation[0].rotation = 2.2;
    pirateShipsRotation[1].rotation = -2.2;
    pirateShipsRotation[2].rotation = 1;
    pirateShipsRotation[3].rotation = -1;

}


myState.update = function(){
    Kiwi.State.prototype.update.call(this);
    this.ship.rotation = -(this.findAngle()) + Math.PI;
    this.checkFire();
    this.checkCollision();
}

myState.findAngle = function(){
    this.mousePoint = new Kiwi.Geom.Point(this.mouse.x, this.mouse.y);
    return this.centerPoint.angleTo(this.mousePoint);
}

myState.checkFire = function(){
    if (this.mouse.isDown) {
        this.createBullet();
        this.game.input.mouse.reset();
    }

}

myState.createBullet = function(){
    this.cannonBallGroup.addChild(new CannonBall(this, 375, 238, this.centerPoint.angleTo(this.mousePoint)));
}


myState.checkCollision = function(){
    var cannonBalls = this.cannonBallGroup.members;
    var pirateShips = this.pirateShipGroup.members;

    for (var i = 0; i < cannonBalls.length; i++) {
        for (var j = 0; j < pirateShips.length; j++) {
            var cannonBallBox = cannonBalls[i].box.bounds;
            if (pirateShips[j].box.bounds.intersects(cannonBallBox)) 
                pirateShips[j].destroy();
            
        }
    }
}

var CannonBall = function(state, x, y, angle){

    Kiwi.GameObjects.Sprite.call(this, state, state.textures['cannonBall'], x, y, false);

    this.angle = angle + (Math.PI / 2);
    this.speed = 12;
    this.rotation = -(angle);
    CannonBall.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.x += -1 * (Math.cos(this.angle) * this.speed);
        this.y += (Math.sin(this.angle) * this.speed);

        if (this.x > myGame.stage.width || this.x < 0 || this.y > myGame.stage.height || this.y < 0) {
            this.destroy();
        }
    }
};
Kiwi.extend(CannonBall,Kiwi.GameObjects.Sprite);

myGame.states.addState(myState);
myGame.states.switchState('myState');

