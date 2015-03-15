var state = new Kiwi.State('Play');

state.create = function () {
    
    // Adds a TextField widget to the defaultHUD of the game.
    this.myText1 = new Kiwi.HUD.Widget.TextField( this.game, 'Text One', 50, 50 );
    this.game.huds.defaultHUD.addWidget( this.myText1 );
    this.myText1.style.color = '#000';

    this.myText2 = new Kiwi.HUD.Widget.TextField( this.game, 'Text Two', 50, 100 );
    this.game.huds.defaultHUD.addWidget( this.myText2 );

    this.myText2.style.color = '#ff0000';
    this.myText2.style.fontSize = '32px';
    this.myText2.style.textShadow = '2px 2px 5px orange';

}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Button', state, gameOptions);


