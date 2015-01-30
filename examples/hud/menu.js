var state = new Kiwi.State('Play');

state.create = function () {

    
    this.myButton1 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Move Menu Left', 50, 50 );
    this.myButton1.style.color = 'blue';
    this.myButton1.style.backgroundColor = 'red';

    this.myButton2 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Move Menu Right', 50, 150 );
    this.myButton2.style.color = 'green';
    this.myButton2.style.backgroundColor = 'pink';

    this.myButton3 = new Kiwi.HUD.Widget.MenuItem( this.game, 'Move Menu To Center', 50, 250 );
    this.myButton3.style.color = 'orange';
    this.myButton3.style.backgroundColor = 'yellow';


    this.menu = new Kiwi.HUD.Widget.Menu( this.game, 100, 100 );
    this.menu.addMenuItem( this.myButton1 );
    this.menu.addMenuItem( this.myButton2 );
    this.menu.addMenuItem( this.myButton3 );
    this.game.huds.defaultHUD.addWidget( this.menu );
    
    this.menu.getMenuItem(0).input.onDown.add( this.leftButton, this );
    this.menu.getMenuItem(1).input.onDown.add( this.rightButton, this );
    this.menu.getMenuItem(2).input.onDown.add( this.resetButton, this );


};

state.leftButton = function () {
    this.menu.x -= 10;
}

state.rightButton = function () {
    this.menu.x += 10;
}

state.resetButton = function () {
    this.menu.x = this.game.stage.width / 2 - 75;
}


state.update = function () {
	Kiwi.State.prototype.update.call( this );

}

var gameOptions = {
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'Button', state, gameOptions);


