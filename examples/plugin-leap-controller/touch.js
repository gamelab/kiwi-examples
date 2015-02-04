var myGame = new Kiwi.Game("game-container","testGame",myState,{plugins:["LEAPController"]});

var myState = new Kiwi.State('myState');
var loadingState = new Kiwi.State('loadingState');
var preloader = new Kiwi.State('preloader');

myState.preload = function(){
	Kiwi.State.prototype.preload.call(this);
}

myState.create = function(){
    this.button = new Button(this,265,255);
    this.addChild(this.button);


    this.finger1 = new Finger(this,300,300);
    this.addChild(this.finger1);


    this.control = Kiwi.Plugins.LEAPController.createController();
    // console.log(this.control.handsMap[0].hand);

    this.warningText1 = new Kiwi.GameObjects.TextField( this, "This plugin is out of date with the latest Leap Motion Controller API.", 50, 50, "#FF0000", 16, 'normal' );
    this.addChild( this.warningText1 );

    this.warningText2 = new Kiwi.GameObjects.TextField( this, "We intend to update this plugin soon.", 50, 70, "#FF0000", 16, 'normal' );
    this.addChild( this.warningText2 );



}

myState.update = function(){
	Kiwi.State.prototype.update.call(this);



    this.finger1.x = (this.control.hands[0].pointables[0].tipX* 1.7) + 400;
    this.finger1.y =((-1 * this.control.hands[0].pointables[0].tipY)*1.7) + 600;

    this.finger1.scaleX = (this.control.hands[0].pointables[0].touchDistance + 1) / 2;
    this.finger1.scaleY = (this.control.hands[0].pointables[0].touchDistance + 1) / 2;

    if(this.control.hands[0].pointables[0].touchZone == "none"){
        //this.finger1.animation.play('up');

        if(this.finger1.physics.overlaps(this.button)){
            this.button.animation.play('over');
        } else this.button.animation.play('up');


    }else if(this.control.hands[0].pointables[0].touchZone == "hovering"){
        //this.finger1.animation.play('over');
        if(this.finger1.physics.overlaps(this.button)){
            this.button.animation.play('over');
        } else this.button.animation.play('up');



    } else if(this.control.hands[0].pointables[0].touchZone == "touching"){
        //this.finger1.animation.play('down');
        if(this.finger1.physics.overlaps(this.button)){
            this.button.animation.play('down');
            this.buttonHit();
        } else this.button.animation.play('up');



    } 


   
}
myState.buttonHit = function () {
    console.log('Do something fun');
}



var Button = function (state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['button'], x, y);

    this.animation.add('up', [0], 0.1, false);  
    this.animation.add('over', [1], 0.1, false); 
    this.animation.add('down', [2], 0.1, false);   
    this.animation.play('up');

    this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
    Button.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);
        this.physics.update();

    }
}
Kiwi.extend(Button,Kiwi.GameObjects.Sprite);


var Finger = function (state, x, y){
    Kiwi.GameObjects.Sprite.call(this, state, state.textures['finger'], x, y);

    this.animation.add('up', [0], 0.1, false);  
    this.animation.add('over', [1], 0.1, false); 
    this.animation.add('down', [2], 0.1, false);   
    this.animation.play('up');

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
    this.addSpriteSheet('finger', './assets/img/plugins/leap-controller/touchFinger.png', 70, 70);
    this.addSpriteSheet('button', './assets/img/plugins/leap-controller/button.png', 250, 100);
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