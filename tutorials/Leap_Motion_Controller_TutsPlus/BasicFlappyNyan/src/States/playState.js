var PlayState = new Kiwi.State('PlayState');

PlayState.create = function () {
    //Create Finger Objects
    //Add To stage
    this.control = Kiwi.Plugins.LEAPController.createController();



    this.streamerGroup = new Kiwi.Group(this);
    this.addChild(this.streamerGroup);
    this.flappyNyan = new FlappyNyan(this, 100, 100);
    this.addChild(this.flappyNyan);

    this.fingersActiveCounter = new Kiwi.HUD.Widget.TextField(this.game, "Active Fingers: 0" , 10, 10);
    this.fingersActiveCounter.style.color = "#ffffff";
    this.fingersActiveCounter.style.fontWeight = "bolder";
    this.fingersActiveCounter.style.fontSize = "20px";
    this.fingersActiveCounter.style.fontFamily = "Roboto"
    this.fingersActiveCounter.style.letterSpacing = "1px"
    this.game.huds.defaultHUD.addWidget(this.fingersActiveCounter);

    this.handActiveCounter = new Kiwi.HUD.Widget.TextField(this.game, "Active Hands: 0" , 10, 35);
    this.handActiveCounter.style.color = "#ffffff";
    this.handActiveCounter.style.fontWeight = "bolder";
    this.handActiveCounter.style.fontSize = "20px";
    this.handActiveCounter.style.fontFamily = "Roboto"
    this.handActiveCounter.style.letterSpacing = "1px"
    this.game.huds.defaultHUD.addWidget(this.handActiveCounter);

    


   

}


PlayState.update = function () {
    Kiwi.State.prototype.update.call(this);
    if(this.control.controllerConnected){
        this.flappyNyan.x = this.control.hands[0].posX + game.stage.width * 0.5;
        this.flappyNyan.y = -this.control.hands[0].posY + game.stage.height;
        
        
        this.updateText();
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


    this.fingersActiveCounter.text = "Active Fingers: " + activeFingers;
    this.handActiveCounter.text = "Active Hands: " + activeHands;




}