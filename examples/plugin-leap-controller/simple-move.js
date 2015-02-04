var myGame = new Kiwi.Game("game-container","testGame",myState,{plugins:["LEAPController"]});

var myState = new Kiwi.State('myState');
var loadingState = new Kiwi.State('loadingState');
var preloader = new Kiwi.State('preloader');

myState.preload = function(){
	Kiwi.State.prototype.preload.call(this);
}

myState.create = function(){
    this.player1 = new Player(this,300,300);
    this.addChild(this.player1);



    this.finger1 = new Finger(this,300,300);
    this.addChild(this.finger1);
    this.finger2 = new Finger(this,300,300);
    this.addChild(this.finger2);
    this.finger3 = new Finger(this,300,300);
    this.addChild(this.finger3);
    this.finger4 = new Finger(this,300,300);
    this.addChild(this.finger4);

    this.finger5 = new Finger(this,300,300);
    this.addChild(this.finger5);

    this.warningText1 = new Kiwi.GameObjects.TextField( this, "This plugin is out of date with the latest Leap Motion Controller API.", 50, 50, "#FF0000", 16, 'normal' );
    this.addChild( this.warningText1 );

    this.warningText2 = new Kiwi.GameObjects.TextField( this, "We intend to update this plugin soon.", 50, 70, "#FF0000", 16, 'normal' );
    this.addChild( this.warningText2 );



    this.control = Kiwi.Plugins.LEAPController.createController();
}

myState.update = function(){


	Kiwi.State.prototype.update.call(this);
    this.player1.x = (this.control.hands[0].posX* 1.7) + 400;
    this.player1.y =((-1 * this.control.hands[0].posY)*1.7) + 600;
    // this.player1.scaleX = this.control.hands[0].roll+1;
    // this.player1.scaleY = this.control.hands[0].pitch+ 1;


    this.finger1.x = (this.control.hands[0].pointables[0].tipX* 1.7) + 400;
    this.finger1.y =((-1 * this.control.hands[0].pointables[0].tipY)*1.7) + 600;

    this.finger2.x = (this.control.hands[0].pointables[1].tipX* 1.7) + 400;
    this.finger2.y =((-1 * this.control.hands[0].pointables[1].tipY)*1.7) + 600;


    this.finger3.x = (this.control.hands[0].pointables[2].tipX* 1.7) + 400;
    this.finger3.y =((-1 * this.control.hands[0].pointables[2].tipY)*1.7) + 600;


    this.finger4.x = (this.control.hands[0].pointables[3].tipX* 1.7) + 400;
    this.finger4.y =((-1 * this.control.hands[0].pointables[3].tipY)*1.7) + 600;

    this.finger5.x = (this.control.hands[0].pointables[4].tipX* 1.7) + 400;
    this.finger5.y =((-1 * this.control.hands[0].pointables[4].tipY)*1.7) + 600;
    





   
}
var Player = function (state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['player'], x, y);

    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    Player.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.physics.update();

    }
}
Kiwi.extend(Player,Kiwi.GameObjects.Sprite);


var Finger = function (state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['finger'], x, y);

    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    Finger.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.physics.update();

    }
}
Kiwi.extend(Finger,Kiwi.GameObjects.Sprite);











//////////////////////////////////////////////////////
//LOADING ASSETS
preloader.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    this.addImage('loadingImage', './assets/img/plugins/leap-controller/loadingImage.png', true);
}
preloader.create = function(){
    Kiwi.State.prototype.create.call(this);
    //this.game.stage.resize(800, 800);
    this.game.states.switchState('loadingState');

}

loadingState.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    this.game.states.rebuildLibraries();
    this.game.stage.color = '#E0EDF1';
    this.logo = new Kiwi.GameObjects.StaticImage(this, this.textures['loadingImage'], 150, 50);
    
    this.addChild(this.logo);

    this.logo.alpha = 0;
    this.tweenIn = new Kiwi.Animations.Tween;
    this.tweenIn = this.game.tweens.create(this.logo);
    this.tweenIn.to({ alpha: 1 }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);
    this.tweenIn.start();


    ////////////////
    //ASSETS TO LOAD
    this.addImage('finger', './assets/img/plugins/leap-controller/finger.png');
    this.addImage('player', './assets/img/plugins/leap-controller/player.png');
}
loadingState.update = function(){
    Kiwi.State.prototype.update.call(this);
}


loadingState.create = function(){
    Kiwi.State.prototype.create.call(this);
    console.log("inside create of loadingState");
    this.tweenOut = this.game.tweens.create(this.logo);
    this.tweenOut.to({alpha: 0}, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);
    this.tweenOut.onComplete(this.switchToMain, this);
    this.tweenOut.start();
}
loadingState.switchToMain = function(){
    this.game.states.switchState('myState');
}


myGame.states.addState(myState);
myGame.states.addState(loadingState);
myGame.states.addState(preloader);
myGame.states.switchState('preloader');