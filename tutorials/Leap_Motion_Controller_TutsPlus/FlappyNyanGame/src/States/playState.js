var PlayState = new Kiwi.State('PlayState');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*
* @class playState
* @extends State
* @constructor
*/


/**
* This create method is executed when Kiwi Game reaches the boot stage of the game loop.
* @method create
* @public
*/

PlayState.init = function(){
    this.control = Kiwi.Plugins.LEAPController.createController();

    
}
PlayState.create = function () {
    //Create Finger Objects
    //Add To stage
    

    this.starGroup = new Kiwi.Group (this);
    this.addChild(this.starGroup);


    this.flappyNyan = new FlappyNyan(this, 100, 100, this.control.hands[0].roll);
    



    this.boxGroup = new Kiwi.Group(this);
    this.addChild(this.boxGroup);

    this.addChild(this.flappyNyan);
    this.scoreText = new Kiwi.HUD.Widget.TextField(this.game, "Score: 0" , 10, 10);
    this.scoreText.style.color = "#ffffff";
    this.scoreText.style.fontWeight = "bolder";
    this.scoreText.style.fontSize = "20px";
    this.scoreText.style.fontFamily = "Roboto"
    this.scoreText.style.letterSpacing = "1px"
    this.game.huds.defaultHUD.addWidget(this.scoreText);
    this.score =0;



    /////////////////////////
    //Timers for pillar spawns
    this.timer = this.game.time.clock.createTimer('spawnPillar', 2, -1, true);
    this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnPillar, this);


    //Star timers
    // this.starTimer = this.game.time.clock.createTimer('spawnStar', 0.001, -1, true);
    // this.startTimerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnStar, this);

    this.starCounter =0;

    this.pillarGroup = new Kiwi.Group(this);
    this.addChild(this.pillarGroup);


   

}


PlayState.update = function () {
    Kiwi.State.prototype.update.call(this);
    //Update Positions
    if(this.control.controllerConnected){
        this.flappyNyan.updatePos(this.control.hands[0].posX, this.control.hands[0].posY, this.control.hands[0].roll);
        this.updateText();
        this.flappyNyan.x = this.control.hands[0].posX + 140;
        this.flappyNyan.y = -this.control.hands[0].posY + 285;
        this.checkCollsions();
        
        this.flappyNyan.spawnBoxes(
            this.control.hands[0].pointables[0].active, 
            this.control.hands[0].pointables[1].active, 
            this.control.hands[0].pointables[2].active, 
            this.control.hands[0].pointables[3].active, 
            this.control.hands[0].pointables[4].active);


    }
    this.starCounter++;
    this.score++;

    if (this.starCounter == 10){
        this.spawnStar();
        this.starCounter = 0;
    }
}





PlayState.updateText = function(){
    var activeFingers = 0;
    var activeHands = 0;

    for(var i = 0; i < this.control.hands[0].pointables.length -1; i++){
        if(this.control.hands[0].pointables[i].active)
            activeFingers++;

    }
    for(var j = 0; j < this.control.hands.length -1; j++){
        if(this.control.hands[j].active)
            activeHands++;

    }


    this.scoreText.text = "Score: " + this.score;




}

PlayState.spawnPillar = function(){
    if(this.control.controllerConnected){
        var topY = (-(Math.random() * 160))-130;
        var botY = topY + 420;
        var t = new Pillar(this, 600, topY);
        var b = new Pillar(this, 600, botY);
        this.pillarGroup.addChild(t);
        this.pillarGroup.addChild(b);
    }
}

PlayState.spawnStar = function(){
    if(this.control.controllerConnected){
        var starX = Math.random() * game.stage.width;
        var starY = Math.random() * game.stage.height;
        var s = new Star(this, starX, starY);

        this.starGroup.addChild(s);
    }
}

PlayState.checkCollsions = function(){

    var pillars = this.pillarGroup.members;
    for (var j = 0; j < pillars.length; j++){ //collides with enemy
            if(this.flappyNyan.physics.overlaps(pillars[j])){
                
                //pillars[j].destroy();

                //SWITCH TO GAME OVER STATE
                this.timer.stop();
                this.timer.clear();
                this.game.huds.defaultHUD.removeWidget(this.scoreText);
                
                game.states.switchState("GameOverState", null, null, {score: this.score});
                break;
            }
            
        }

}