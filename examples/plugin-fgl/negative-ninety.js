
/*
Game state. There is no FGL functionality on this page
*/

var PlayState = new Kiwi.State('PlayState');

PlayState.create = function () {
    this.bg = new Kiwi.GameObjects.StaticImage(this, this.textures.bg, 0, 0);
    this.addChild(this.bg);
    this.game.stage.color = "#fbfcec";

    this.playing = true;
    this.setMaps();
    this.level = 0;
    this.levelTot = 0;
    this.levelMax = 6;

    this.tileX = 20;
    this.tileY = 145;
    this.tileGap = 15;
    this.mw = 5;
    this.mh = 5;
    this.ts = 100;
    this.speedIncrement = 1;
    this.ps = 48;

    this.leftBounds = 5//this.tileX;
    this.upBounds = this.tileY - 15;
    this.rightBounds = this.game.stage.width-5;
    this.downBounds = this.tileY + (this.tileGap * 4) + (this.mh * this.ts) + 15;

    for (var j = 0; j < this.mw; j++) {
        this['tx' + j] = j * this.ts + this.tileX + (this.tileGap * j);
    }

    for (var i = 0; i < this.mh; i++) {
        this['ty' + i] = i * this.ts + this.tileY + (this.tileGap * i);
        for (var j = 0; j < this.mw; j++) {
            var t = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, j*this.ts + this.tileX + (this.tileGap*j), i*this.ts + this.tileY + (this.tileGap*i));
            t.name = 't' + i + '_' + j;
            this.addChild(t);
        }
    }

    var barX = 20;
    var barY = 750;
    var barW = 28;
    var barCount = 20;

    for (var i = 0; i < barCount; i++) {
        this['diff' + i] = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, (i * barW) + barX, barY);
        if (i == 0) {
            this['diff' + i].animation.switchTo(4);
        } else if (i == barCount - 1) {
            this['diff' + i].animation.switchTo(6);
        } else {
            this['diff' + i].animation.switchTo(5);
        }
        this.addChild(this['diff' + i]);
    }
    this.clicks = 0;

    this.clickMax = this.returnClickMax();

    var px = 3;
    var py = 3;
    this.player = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, px * this.ts + this.tileX + (this.tileGap * px) + 26, py * this.ts + this.tileY + (this.tileGap * py) + 26);
    this.addChild(this.player);
    this.player.animation.switchTo(3);

    this.dir = 1;
    this.speed = 2;

    this.preview();

    this.updateDifficultyBar();

    this.startTime = this.game.time.clock.elapsed();

    var currHighScore = 0;
    if (this.game.saveManager.localStorage.exists('negativeNinety')) {
        var currHighScore = this.game.saveManager.localStorage.getData('negativeNinety');
    } else {
        this.game.saveManager.localStorage.add('negativeNinety', 0, true);
        this.game.saveManager.localStorage.edit('negativeNinety', 0, true);
    }

    this.bestTF = new Kiwi.HUD.Widget.TextField(this.game, "Best: " + currHighScore, 230, 86);
    this.bestTF.style.color = "#FFFFFF";
    this.bestTF.style.webkitUserSelect = 'none';
    this.bestTF.style.MozUserSelect = 'none';
    this.bestTF.style.userSelect = 'none';
    this.bestTF.style.fontSize = "18px";
    this.bestTF.style.fontWeight = "bold";
    this.bestTF.style.fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif";

    this.game.huds.defaultHUD.addWidget(this.bestTF);

    this.timeTF = new Kiwi.HUD.Widget.TextField(this.game, "0", 360, 86);
    this.timeTF.style.color = "#FFFFFF";
    this.timeTF.style.webkitUserSelect = 'none';
    this.timeTF.style.MozUserSelect = 'none';
    this.timeTF.style.userSelect = 'none';
    this.timeTF.style.fontSize = "18px";
    this.timeTF.style.fontWeight = "bold";
    this.timeTF.style.fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif";
    this.game.huds.defaultHUD.addWidget(this.timeTF);

    this.diffTF = new Kiwi.HUD.Widget.TextField(this.game, "Difficulty: 0", 490, 86);
    this.diffTF.style.color = "#FFFFFF";
    this.diffTF.style.webkitUserSelect = 'none';
    this.diffTF.style.MozUserSelect = 'none';
    this.diffTF.style.userSelect = 'none';
    this.diffTF.style.fontSize = "18px";
    this.diffTF.style.fontWeight = "bold";
    this.diffTF.style.fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif"
    this.game.huds.defaultHUD.addWidget(this.diffTF);

    this.game.input.onDown.add(this.clickGame, this);
    
}

PlayState.setMaps = function(){
    this.maps = [
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 1, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 1, 0]
        ]
    ]
}

PlayState.returnClickMax = function () {
    return this.level + 2;
    /*switch (this.level) {
        default:
            return 5;
    }*/
}

PlayState.clickGame = function () {
    this.rotatePlayer();
    this.clicks++;
    if (this.clicks >= this.clickMax) {
        this.increaseDifficulty();
    }
    this.updateDifficultyBar();
}

PlayState.rotatePlayer = function () {
    if (this.dir == 0) {
        this.dir = 3;
    } else {
        this.dir--;
    }
}

PlayState.updateDifficultyBar = function () {
    var count = 20;
    var prog = Math.floor((this.clicks / this.clickMax) * 20);
    for (var i = 0; i < 20; i++) {
        if (prog >= i) {
            this['diff' + i].visible = true;
        } else {
            this['diff' + i].visible = false;
        }
    }
    for (var i = 0; i < this.nextLevel.length; i++) {
        var t = this.getChildByName('t' + this.nextLevel[i][1] + '_' + this.nextLevel[i][0]);
        t.transform.scale = 0.2 + (this.clicks / this.clickMax);
        if (t.transform.scale > 1) t.transform.scale = 1;
    }
}

PlayState.increaseDifficulty = function () {
    this.level++;
    if (this.level >= this.levelMax) this.level = 0;
    this.levelTot++;
    this.diffTF.text = 'Difficulty: ' + this.levelTot;
    this.clicks = 0;
    this.clickMax = this.returnClickMax();

    if (this.level == 0) {
        this.speed += this.speedIncrement;
        this.clearLevel();
    } else {
        //turn previews into blocks!
        this.buildLevel();
    }

    if (this.level < this.levelMax - 1) {
        this.preview();
    } else {
        this.nextLevel.length = 0;
    }
}

PlayState.preview = function () {
    this.nextLevel = [];
    this.nextLength = 4;
    this.selectNextBoxes();
}

PlayState.selectNextBoxes = function () {
    this.selectBox();
    if (this.nextLevel.length < this.nextLength) {
        this.selectNextBoxes();
    }
}

PlayState.selectBox = function () {
    var rx = Math.floor(Math.random() * this.mw);
    var ry = Math.floor(Math.random() * this.mh);
    var t = this.getChildByName('t' + ry + '_' + rx);
    if (t.animation.frameIndex == 1) return;
    if (this.player.x + this.player.width > t.x) {
        if (this.player.x < t.x + t.width) {
            if (this.player.y + this.player.height > t.y) {
                if (this.player.y < t.y + t.height) {
                    return;
                }
            }
        }
    }
    //if already in array
    for (var i = 0; i < this.nextLength.length; i++) {
        var cell = this.nextLevel[i];
        if (rx == cell[0] && ry == cell[1]) return;
    }

    t.animation.switchTo(2);
    this.nextLevel.push([rx, ry]);
}

PlayState.update = function () {
    Kiwi.State.prototype.update.call(this);

    if (!this.playing) return;

    this.timeTF.text = Math.floor((this.game.time.clock.elapsed() - this.startTime)*10)/10;

    //move player
    for (var i = 0; i < this.speed; i++) {
        switch (this.dir) {
            case 0:
                this.player.y--;
                if (this.solid(this.player.x, this.player.y) || this.solid(this.player.x + this.player.width, this.player.y)) {
                    this.gameOver();
                }
                break;
            case 1:
                this.player.x++;
                if (this.solid(this.player.x + this.player.width, this.player.y) || this.solid(this.player.x + this.player.width, this.player.y + this.player.height)) {
                    this.gameOver();
                }
                break;
            case 2:
                this.player.y++;
                if (this.solid(this.player.x, this.player.y + this.player.height) || this.solid(this.player.x + this.player.width, this.player.y + this.player.height)) {
                    this.gameOver();
                }
                break;
            case 3:
                this.player.x--;
                if (this.solid(this.player.x, this.player.y) || this.solid(this.player.x, this.player.y + this.player.height)) {
                    this.gameOver();
                }
                break;
        }
    }

}

PlayState.solid = function (px, py) {
    var tx = this.returnTileX(px);
    var ty = this.returnTileY(py);
    var t = this.getChildByName('t' + ty + '_' + tx);
    if (t != undefined) {
        if (t.animation.frameIndex == 1) {
            console.log(tx, ty, t)
            return true;
        }
    }
    if (px < this.leftBounds) return true;
    if (py < this.upBounds) return true;
    if (px > this.rightBounds) return true;
    if (py > this.downBounds) return true;
    return false;
}

PlayState.returnTileX = function (px) {
    for (var j = 0; j < this.mw; j++) {
        if (px >= this['tx' + j]) {
            if (px <= this['tx' + j] + this.ts) {
                //console.log('within tile x: ',px, this['tx'+j], j)
                return j;
            }
        }
    }
    return -1;
}

PlayState.returnTileY = function (py) {
    for (var j = 0; j < this.mh; j++) {
        if (py >= this['ty' + j]) {
            if (py <= this['ty' + j] + this.ts) {
                //console.log('within tile: ', py, this['ty' + j], j)
                return j;
            }
        }
    }
    return -1;
}

PlayState.buildLevel = function () {
    //turn preview into blocks
    for (var i = 0; i < this.nextLevel.length; i++) {
        var t = this.getChildByName('t' + this.nextLevel[i][1] + '_' + this.nextLevel[i][0]);
        t.transform.scale = 1;
        t.animation.switchTo(1);
    }
}

PlayState.clearLevel = function () {
    for (var i = 0; i < this.mh; i++) {
        for (var j = 0; j < this.mw; j++) {
            var t = this.getChildByName('t' + i + '_' + j);
            t.animation.switchTo(0);
        }
    }
}

PlayState.gameOver = function () {
    var myScore = this.timeTF.text;

    this.game.huds.defaultHUD.removeWidget(this.bestTF);
    this.game.huds.defaultHUD.removeWidget(this.timeTF);
    this.game.huds.defaultHUD.removeWidget(this.diffTF);

    this.playing = false;
    this.game.input.onDown.remove(this.clickGame, this);
    game.states.switchState('GameOverState', GameOverState, null, { score: myScore });
}

var GameOverState = new Kiwi.State('GameOverState');

/**
* If cross promotion is enabled, add more games button. Also either submit new high score, or play ad (unless premium)
* @method create
* @param score {number}
* @public
*/
GameOverState.create = function (score) {
    if (fgl.crossPromotionEnabled) {
        this.bg = new Kiwi.GameObjects.StaticImage(this, this.textures.end2, 0, 0);
        this.addChild(this.bg);

        this.shareBtn = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, 121, 436);
        this.addChild(this.shareBtn);
        this.shareBtn.visible = false;
        this.shareBtn.animation.switchTo(7);
        this.shareBtn.input.onUp.add(this.shareGame, this);

        this.playBtn = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, 121, 544);
        this.addChild(this.playBtn);
        this.playBtn.animation.switchTo(7);
        this.playBtn.visible = false;
        this.playBtn.input.onUp.add(this.clickGame, this);

        this.moreBtn = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, 121, 660);
        this.addChild(this.moreBtn);
        this.moreBtn.animation.switchTo(7);
        this.moreBtn.visible = false;
        this.moreBtn.input.onUp.add(this.clickMore, this);

        this.moreTF = new Kiwi.HUD.Widget.TextField(this.game, 'More Games', 0, 685);
        this.moreTF.style.width = '100%';
        this.moreTF.style.color = "#FFFFFF";
        this.moreTF.style.fontSize = "40px";
        this.moreTF.style.fontWeight = "bold";
        this.moreTF.style.textAlign = "center";
        this.moreTF.style.fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif";
        this.game.huds.defaultHUD.addWidget(this.moreTF);

    } else {
        this.bg = new Kiwi.GameObjects.StaticImage(this, this.textures.end, 0, 0);
        this.addChild(this.bg);
        this.shareBtn = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, 121, 456);
        this.addChild(this.shareBtn);
        this.shareBtn.visible = false;
        this.shareBtn.animation.switchTo(7);
        this.shareBtn.input.onUp.add(this.shareGame, this);

        this.playBtn = new Kiwi.GameObjects.Sprite(this, this.textures.tiles, 121, 594);
        this.addChild(this.playBtn);
        this.playBtn.animation.switchTo(7);
        this.playBtn.visible = false;
        this.playBtn.input.onUp.add(this.clickGame, this);
    }

    this.currHighScore = this.game.saveManager.localStorage.getData('negativeNinety');
    if (score > this.currHighScore) {
        this.currHighScore = score;
        this.game.saveManager.localStorage.edit('negativeNinety', score, true);
    }

    this.scoreTF = new Kiwi.HUD.Widget.TextField(this.game, score, 0, 160);
    this.scoreTF.style.width = '100%';
    this.scoreTF.style.color = "#FFFFFF";
    this.scoreTF.style.fontSize = "40px";
    this.scoreTF.style.fontWeight = "bold";
    this.scoreTF.style.textAlign = "center";
    this.scoreTF.style.fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif";
    this.game.huds.defaultHUD.addWidget(this.scoreTF);

    this.bestTF = new Kiwi.HUD.Widget.TextField(this.game, this.currHighScore, 0, 340);
    this.bestTF.style.width = '100%';
    this.bestTF.style.color = "#FFFFFF";
    this.bestTF.style.fontSize = "40px";
    this.bestTF.style.fontWeight = "bold";
    this.bestTF.style.textAlign = "center";
    this.bestTF.style.fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif";
    this.game.huds.defaultHUD.addWidget(this.bestTF);

    this.submitHigh(score);
}

/**
* Post to Twitter
* @method shareGame
* @public
*/
GameOverState.shareGame = function () {
    var myText = "I scored " + this.currHighScore + " points at -90, can you last longer? %20%23negativeNinety via @kiwijsengine"
    var myURL = "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fkiwijs.org%2F2048%2F&text="+myText
    window.open(myURL);
}

/**
* Play again
* @method clickGame
* @public
*/
GameOverState.clickGame = function () {
    this.game.huds.defaultHUD.removeWidget(this.scoreTF);
    this.game.huds.defaultHUD.removeWidget(this.bestTF);
    if (this.moreTF != undefined) this.game.huds.defaultHUD.removeWidget(this.moreTF);
    game.states.switchState('PlayState');
}

/**
* Use FGL cross promotion
* @method clickMore
* @public
*/
GameOverState.clickMore = function () {
    fgl.showMoreGames();
}

/**
* An example of an extended custom function.
* Here, in free mode, the leaderboard is automatically updated.
* @method submitHigh
* @param score {number}
* @public
*/
GameOverState.submitHigh = function (score) {
    fgl.submitScore( score );
    console.log("HIGH SUBMISSION");
}

var IntroState = new Kiwi.State('IntroState');

IntroState.create = function () {
    this.bg = new Kiwi.GameObjects.StaticImage(this, this.textures.start, 0, 0);
    this.addChild(this.bg);
    this.startButton = new Kiwi.GameObjects.Sprite(this, this.textures.startButton, 4, 603);
    this.addChild(this.startButton);
    this.startButton.visible = false;
    this.startButton.input.onDown.add(this.pressGame, this);
    this.startButton.input.onUp.add(this.clickGame, this);

    this.game.stage.color = "EEEEEE";

    // Implement premium content
    if( fgl.unlockEnabled ) {
        this.premiumUnlockButton = new Kiwi.GameObjects.Sprite( this, this.textures.premiumUnlock, 20, 312 );
        this.premiumActive = new Kiwi.GameObjects.Sprite( this, this.textures.premiumActive, 20, 312 );
        this.premiumUnlockButton.box.hitbox = new Kiwi.Geom.Rectangle(0,0, 268,268);
        this.premiumActive.box.hitbox = new Kiwi.Geom.Rectangle(0,0, 268,268);
        this.premiumUnlockButton.visible = false;
        this.premiumActive.visible = false;
        this.addChild( this.premiumUnlockButton );
        this.addChild( this.premiumActive );
        if( fgl.isPremium() ) {
            this.premiumActive.visible = true;
        }
        else {
            this.premiumUnlockButton.visible = true;
            this.premiumUnlockButton.input.onUp.add( this.attemptUnlock, this);
        }
    }

    // Implement more games
    if( fgl.crossPromotionEnabled ) {
        this.moreGamesButton = new Kiwi.GameObjects.Sprite( this, this.textures.moreGames, 310, 312 );
        this.moreGamesButton.box.hitbox = new Kiwi.Geom.Rectangle(0,0, 268,268);
        this.moreGamesButton.input.onUp.add( fgl.showMoreGames, this );
        this.addChild( this.moreGamesButton );
    }

    // Implement FGL sponsor branding
    this.sponsor = this.game.FGL.addBrandingLogo( this, 335, 15 );

    // Implement FGL interstitial advertising
    fgl.showAd();
}

//start button pressed
IntroState.pressGame = function () {
    this.startButton.visible = true;
}

//start game button
IntroState.clickGame = function () {
    this.startButton.input.onDown.remove(this.pressGame, this);
    this.startButton.input.onUp.remove(this.clickGame, this);
    game.states.switchState('PlayState');
}

IntroState.attemptUnlock = function() {
    
    var self = this;

    var unlockSucceeded = function() {
        if( fgl.isPremium() ) {
            // Disable unlock button
            self.premiumUnlockButton.visible = false;
            self.premiumUnlockButton.input.onUp.removeAll();
            // Display premium active button
            self.premiumActive.visible = true;
        }
    }

    var unlockFailed = function() {
        self.premiumActive.visible = false;
        self.premiumUnlockButton.visible = true;
    }

    fgl.inApp.initiateUnlockFunction( unlockSucceeded, unlockFailed );
}

/**
* Since we want to use the custom Kiwi.JS loader with the bobbing kiwi/html5 logo and everything. We need to extend the KiwiLoadingScreen State.  
* The KiwiLoadingScreen State is an extentsion of a normal State but it has some custom code to handle the loading/bobbing/fading of all the items, so if you override a method (like the preload) for example just make sure you call the super method.
*/
var LoadingState = new KiwiLoadingScreen('LoadingState', 'IntroState', './assets/img/plugins/fgl/img/loading/', { width: 600, height: 800 } );
/**
* This preload method is responsible for preloading all your in game assets.
* @method preload
* @private
*/
LoadingState.preload = function () {
    
    //Make sure to call the super at the top.
    //Otherwise the loading graphics will load last, and that defies the whole point in loading them. 
    KiwiLoadingScreen.prototype.preload.call(this);

    this.addTextureAtlas('tiles', './assets/img/plugins/fgl/img/tiles.png', 'tileJSON', 'assets/img/plugins/fgl/tiles.json');
    this.addImage('bg', './assets/img/plugins/fgl/img/bg.png');
    this.addImage('start', './assets/img/plugins/fgl/img/start.png');
    this.addImage('end', './assets/img/plugins/fgl/img/end.png');
    this.addImage('end2', './assets/img/plugins/fgl/img/end2.png');
    this.addImage('moreGames', './assets/img/plugins/fgl/img/moreGames.png');
    this.addImage('premiumActive', './assets/img/plugins/fgl/img/premiumActive.png');
    this.addImage('premiumUnlock', './assets/img/plugins/fgl/img/premiumUnlock.png');
    this.addSpriteSheet('startButton', './assets/img/plugins/fgl/img/start-clicked.png', 591, 140);
    this.game.stage.canvas.style.cssText = "idtkscale:ScaleAspectFit";
};

//Initialise the Kiwi Game. 
var game = new Kiwi.Game('game-container', 'NegativeNinety', null, { width: 600, height: 800, plugins: ['FGL', 'SaveGame'], renderer: Kiwi.RENDERER_WEBGL });
//Add all the States we are going to use.
game.states.addState(LoadingState);
game.states.addState(IntroState);
game.states.addState(PlayState);
game.states.addState(GameOverState);

//Switch to/use the Preloader state. 
console.log( "Switching States Zach" );
game.states.switchState("LoadingState");