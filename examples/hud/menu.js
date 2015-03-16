var state = new Kiwi.State('Play');

state.create = function () {

    this.menuWidth = 100;

    // Adds a menu widget to the defaultHUD of the game.
    this.myButton1 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Move Left', -this.menuWidth, 0 );
    this.myButton1.style.color = 'white';
    this.myButton1.style.display = 'block';
    this.myButton1.style.boxSizing = 'border-box';
    this.myButton1.style.width = (this.menuWidth * 2).toString() + 'px';
    this.myButton1.style.textAlign = 'center';
    this.myButton1.style.cursor = 'pointer';
    this.myButton1.style.padding = '0.5em 1em';
    this.myButton1.style.backgroundColor = '#9c0';

    this.myButton2 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Move Right', -this.menuWidth, 50 );
    this.myButton2.style.color = 'white';
    this.myButton2.style.display = 'block';
    this.myButton2.style.boxSizing = 'border-box';
    this.myButton2.style.width = (this.menuWidth * 2).toString() + 'px';
    this.myButton2.style.textAlign = 'center';
    this.myButton2.style.cursor = 'pointer';
    this.myButton2.style.padding = '0.5em 1em';
    this.myButton2.style.backgroundColor = '#c09';

    this.myButton3 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Center', -this.menuWidth, 100 );
    this.myButton3.style.color = 'white';
    this.myButton3.style.display = 'block';
    this.myButton3.style.boxSizing = 'border-box';
    this.myButton3.style.width = (this.menuWidth * 2).toString() + 'px';
    this.myButton3.style.textAlign = 'center';
    this.myButton3.style.cursor = 'pointer';
    this.myButton3.style.padding = '0.5em 1em';
    this.myButton3.style.backgroundColor = '#09c';


    this.menu = new Kiwi.HUD.Widget.Menu( this.game, 0, 150 );
    this.menu.addMenuItem( this.myButton1 );
    this.menu.addMenuItem( this.myButton2 );
    this.menu.addMenuItem( this.myButton3 );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.leftButton, this );
    this.menu.getMenuItem(1).input.onDown.add( this.rightButton, this );
    this.menu.getMenuItem(2).input.onDown.add( this.resetButton, this );

    this.resetButton();

}

state.leftButton = function () {
    this.menu.x -= 10;
}

state.rightButton = function () {
    this.menu.x += 10;
}

state.resetButton = function () {
    this.menu.x = this.game.stage.width / 2;
}


var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Menu', state, gameOptions);


