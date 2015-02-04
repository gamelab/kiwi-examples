var myGame = new Kiwi.Game("game-container","testGame",myState,{plugins:["LEAPController"]});
var myState = new Kiwi.State('myState');
var loadingState = new Kiwi.State('loadingState');
var preloader = new Kiwi.State('preloader');

myState.preload = function(){
	Kiwi.State.prototype.preload.call(this);
	
}

myState.create = function(){

	this.control = Kiwi.Plugins.LEAPController.createController();

	this.ground = new Platform(this, 0, 505);	

	this.bombGroup = new Kiwi.Group(this);

	//////////////////////////////
	//Parallax Environment Groups
	this.grassGroup = new Kiwi.Group(this);
	this.bg1 = new Kiwi.Group(this);
	this.bg2 = new Kiwi.Group(this);
	this.bg3 = new Kiwi.Group(this);
	this.bg4 = new Kiwi.Group(this);
	this.bg5 = new Kiwi.Group(this);
	this.bg6 = new Kiwi.Group(this);
	this.bg7 = new Kiwi.Group(this);

	this.bombDropped = false;
	
	this.missileGroup = new Kiwi.Group(this);
	this.explodeGroup = new Kiwi.Group(this);
	

	///////////////////
	//Plane and Bomb Door
	this.plane = new Airplane(this,this.textures['plane'], 250, 20);
	

	
	/////////////////////////
	//Timers for enemy spawns
	this.timer = this.game.time.clock.createTimer('spawnTroop', .3, -1, true);
	this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnMissile, this);


	this.pauseImage = new Kiwi.GameObjects.StaticImage(this, this.textures['pauseImage'], 0, 0);


  	////////////////////////
  	//Creating parallax bacground assets  
    for(var i = 0; i < 20; i++){//grass
    	this.grassGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['grass'], i * 48, 504, true));
    	this.grassGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['dirt'], i * 48, 552, true));

    }
    for(var i = 0; i < 4; i++){
    	this.bg7.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg7'], i*434, 0, true));//bg7
    }    
    for(var i = 0; i < 5; i++){
    	this.bg6.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg6'], i*346, 185, true));//bg6
    }    
    for(var i = 0; i < 10; i++){
    	this.bg5.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg5'], i*96, 253, true));//bg5
    	this.bg4.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg4'], i*96, 279, true));//bg4
    }    
    for(var i = 0; i < 3; i++){
    	this.bg3.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg3'], i*460, 305, true));//bg3
    	this.bg2.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg2'], i*460, 335, true));//bg2
    	this.bg1.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg1'], i*460, 381, true));//bg1
    } 
    //Background
    this.addChild(this.ground);
    this.addChild(this.bg7);
    this.addChild(this.bg6);
    this.addChild(this.bg5);
    this.addChild(this.bg4);
    this.addChild(this.bg3);
    this.addChild(this.bg2);
    this.addChild(this.bg1);

    //
    this.addChild(this.missileGroup);
    this.addChild(this.plane);
    this.addChild(this.explodeGroup);

    //Foreground
    this.addChild(this.grassGroup);
    this.addChild(this.pauseImage);

    this.warningText1 = new Kiwi.GameObjects.TextField( this, "This plugin is out of date with the latest Leap Motion Controller API.", 50, 50, "#FF0000", 16, 'normal' );
    this.addChild( this.warningText1 );

    this.warningText2 = new Kiwi.GameObjects.TextField( this, "We intend to update this plugin soon.", 50, 70, "#FF0000", 16, 'normal' );
    this.addChild( this.warningText2 );
    

}
myState.update = function(){
	Kiwi.State.prototype.update.call(this);

	if(this.control.controllerConnected){
		//console.log("ControllerConnected");
		this.pauseImage.alpha = 0;


		this.control.update();
		this.plane.x = (this.control.hands[0].posX* 1.7) + 400;
		this.plane.y =((-1 * this.control.hands[0].posY)*1.7) + 600;

	// this.plane.scaleX = this.control.hands[0].posZ /250;
	// this.plane.scaleY = this.control.hands[0].posZ / 250;

	// this.plane.rotation = -1 * (this.control.hands[0].palmNormalX);

	if(this.game.input.isDown){
		//console.log(this.control.currentHand);
		this.game.input.reset();
	}

	this.updateParallax();
	this.checkMissiles();
} else {
	this.pauseImage.alpha = 1;
}



}





myState.checkMissiles = function(){
	var bombs = this.bombGroup.members;
	var missiles = this.missileGroup.members;

		for (var j = 0; j < missiles.length; j++){ //collides with enemy
			if(this.plane.physics.overlaps(missiles[j])){
				missiles[j].health --;
				this.explodeGroup.addChild(new Explosion(this, missiles[j].x -30, missiles[j].y-70));
				missiles[j].destroy();
				break;
			}
			if(missiles[j].x < -200){
				missiles[j].destroy();
				break;
			}
		}
}

myState.spawnMissile = function(){
	if(this.control.controllerConnected){
	var s = new EnemyMissile(this, this.game.stage.width + 50, Math.random() * 450);
	this.missileGroup.addChild(s);
}

}








myState.updateParallax = function(){
	//Ground
	for(var i =0; i < this.grassGroup.members.length;i++){
		this.grassGroup.members[i].transform.x -= 6;		
		if(this.grassGroup.members[i].transform.worldX <= -48){
			this.grassGroup.members[i].transform.x = 48*19;
		}
	}
	//bg1
	for(var i =0; i < this.bg1.members.length;i++){
		this.bg1.members[i].transform.x -= 6;		
		if(this.bg1.members[i].transform.worldX <= -460){
			this.bg1.members[i].transform.x = 460* (this.bg1.members.length - 1) ;
		}
	}
	//bg2
	for(var i =0; i < this.bg2.members.length;i++){
		this.bg2.members[i].transform.x -= 4;		
		if(this.bg2.members[i].transform.worldX <= -460){
			this.bg2.members[i].transform.x = 460*(this.bg2.members.length - 1);
		}
	}
	//bg3
	for(var i =0; i < this.bg3.members.length;i++){
		this.bg3.members[i].transform.x -= 3;		
		if(this.bg3.members[i].transform.worldX <= -460){
			this.bg3.members[i].transform.x = 460*(this.bg3.members.length - 1);
		}
	}
	//bg4
	for(var i =0; i < this.bg4.members.length;i++){
		this.bg4.members[i].transform.x -= 1;
		if(this.bg4.members[i].transform.worldX <= -96){
			this.bg4.members[i].transform.x = 96*(this.bg4.members.length - 1);
		}
	}
	//bg5
	for(var i =0; i < this.bg4.members.length;i++){
		this.bg5.members[i].transform.x -= 0.5;		
		if(this.bg5.members[i].transform.worldX <= -96){
			this.bg5.members[i].transform.x = 96*(this.bg5.members.length - 1);
		}
	}
	
	//bg7
	for(var i =0; i < this.bg7.members.length;i++){
		this.bg7.members[i].transform.x -= .25;		
		if(this.bg7.members[i].transform.worldX <= -434){
			this.bg7.members[i].transform.x = 434*(this.bg7.members.length - 1);
		}
	}





}




////////////////////////////////////////
//CLASSES


var Airplane = function(state, x, y){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['plane'], x, y, true);

	//this.box.hitbox = new Kiwi.Geom.Rectangle(30, 80, 130, 40);
	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

	this.animation.add('walk', [0,1], 0.1, true);    
	this.animation.play('walk');



	Airplane.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		//Update ArcadePhysics
		this.physics.update();
	}	
}
Kiwi.extend(Airplane,Kiwi.GameObjects.Sprite);


var Platform = function (state, x, y){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['ground'], x, y, true);
	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
	this.physics.immovable = true;

	Platform.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		this.physics.update();
	}

}
Kiwi.extend(Platform,Kiwi.GameObjects.Sprite);

var EnemyMissile = function (state, x, y){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['missile'], x, y);

	this.animation.add('walk', [0,1], 0.1, true);    
	this.animation.play('walk');

	//this.box.hitbox = new Kiwi.Geom.Rectangle(50, 34, 50, 84);	
	this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
	this.health = 1;
	this.scaleX = 1;

	EnemyMissile.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		this.physics.update();


		this.x -= 10;
		

		if(this.health <= 0){
			this.destroy();
		}

		if (this.x < -100){
			this.destroy();
		}
	}
}
Kiwi.extend(EnemyMissile,Kiwi.GameObjects.Sprite);






var Explosion = function (state, x, y){
	Kiwi.GameObjects.Sprite.call(this, state, state.textures['explosion'], x, y);
	this.animation.add('explode', [0, 1, 2, 3, 4], 0.1, false);    
	this.animation.play('explode');

	Explosion.prototype.update = function(){
		Kiwi.GameObjects.Sprite.prototype.update.call(this);
		this.x -= 2;
		if(this.animation.currentCell == 4){
			this.destroy();
		}
	}
}
Kiwi.extend(Explosion,Kiwi.GameObjects.Sprite);



//////////////////////////////////////////////////////
//LOADING ASSETS
preloader.preload = function(){
    Kiwi.State.prototype.preload.call(this);
    this.addImage('loadingImage', './assets/img/plugins/leap-controller/loadingImage.png', true);


}
preloader.create = function(){
    Kiwi.State.prototype.create.call(this);
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
///////////////////////////////////////
	//Environment Assets
	this.addImage('ground', './assets/img/plugins/leap-controller/ground.png');
	this.addImage('grass', './assets/img/plugins/leap-controller/ground-tiles/grass.png');
	this.addImage('dirt', './assets/img/plugins/leap-controller/ground-tiles/dirt.png');
	this.addImage('bg1', './assets/img/plugins/leap-controller/bg-layers/1.png');
	this.addImage('bg2', './assets/img/plugins/leap-controller/bg-layers/2.png');
	this.addImage('bg3', './assets/img/plugins/leap-controller/bg-layers/3.png');
	this.addImage('bg4', './assets/img/plugins/leap-controller/bg-layers/4.png');
	this.addImage('bg5', './assets/img/plugins/leap-controller/bg-layers/5.png');
	this.addImage('bg6', './assets/img/plugins/leap-controller/bg-layers/6.png');
	this.addImage('bg7', './assets/img/plugins/leap-controller/bg-layers/7.png');
	this.addImage('pauseImage', './assets/img/plugins/leap-controller/pauseImage.png')
	///////////////////////////////////
	//SpriteSheet and Objects
	this.addSpriteSheet('plane', './assets/img/plugins/leap-controller/plane.png', 166, 83);
	this.addSpriteSheet('explosion', './assets/img/plugins/leap-controller/explosion.png', 129, 133);
	this.addSpriteSheet('missile', './assets/img/plugins/leap-controller/rocket.png', 62, 26);

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

myGame.states.addState(loadingState);
myGame.states.addState(preloader);
myGame.states.addState(myState);
myGame.states.switchState('preloader');