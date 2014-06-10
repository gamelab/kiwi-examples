var GameOverState = new Kiwi.State('GameOverState');


GameOverState.create = function (score) {
    // game.states.switchState("PlayState");

    this.scoreText = new Kiwi.HUD.Widget.TextField(this.game, "Score:" + score , 247, 200);
    this.scoreText.style.color = "#ffffff";
    this.scoreText.style.fontWeight = "bolder";
    this.scoreText.style.fontSize = "20px";
    this.scoreText.style.fontFamily = "Roboto"
    this.scoreText.style.letterSpacing = "1px"
    this.game.huds.defaultHUD.addWidget(this.scoreText);

    console.log("inside Create");
    this.gameOver = new Kiwi.GameObjects.Sprite(this, this.textures.gameOver, 240, 120);
    this.gameOver.alpha = 0;
    this.addChild(this.gameOver);

    showTween = this.game.tweens.create(this.gameOver);
    showTween.to({alpha: 1}, 750);

    fadeTween = this.game.tweens.create(this.gameOver);
    fadeTween.to({alpha: 0}, 750);
    showTween.chain(fadeTween);
    showTween.start();
    fadeTween.onComplete(function(){

        this.game.huds.defaultHUD.removeWidget(this.scoreText);
    	game.states.switchState("PlayState");
     }, this);
}


