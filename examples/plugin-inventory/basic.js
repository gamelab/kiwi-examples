var inventoryManager = Kiwi.Plugins.InventoryManager;


var InventoryExample = new Kiwi.State('InventoryExample');

InventoryExample.preload = function () {
    this.addImage('coin', './assets/img/plugins/inventory/coin.png');
    this.addImage('clock', './assets/img/plugins/inventory/clock.png');
}

InventoryExample.create = function () {
    for (var i = 1; i <= 10; i++) {
        InventoryExample['coin'+i] = new Kiwi.GameObjects.Sprite(this, this.textures.coin);
        InventoryExample['coin' + i].x = Math.floor(Math.random() * this.game.stage.width / 2);
        InventoryExample['coin' + i].y = Math.floor(Math.random() * this.game.stage.height / 2);
        InventoryExample['coin' + i].input.onUp.add(InventoryExample.pressCoin);
        InventoryExample.addChild(InventoryExample['coin' + i]);
    }
    for (var i = 1; i <= 8; i++) {
        InventoryExample['clock' + i] = new Kiwi.GameObjects.Sprite(this, this.textures.clock);
        InventoryExample['clock' + i].x = Math.floor(Math.random() * this.game.stage.width / 2);
        InventoryExample['clock' + i].y = Math.floor(Math.random() * this.game.stage.height / 2);
        InventoryExample['clock' + i].input.onUp.add(InventoryExample.pressClock);
        InventoryExample.addChild(InventoryExample['clock' + i]);
    }

    this.coinText = new Kiwi.GameObjects.Textfield(this, 'Coins: 0', 0, 10, '#000');
    this.addChild(this.coinText);

    this.clockText = new Kiwi.GameObjects.Textfield(this, 'Clocks: 0', 0, 50, '#000');
    this.addChild(this.clockText);

    this.weightText = new Kiwi.GameObjects.Textfield(this, 'Weight: 0 kg', 0, 90, '#000');
    this.addChild(this.weightText);

    //INVENTORY
    //Set new inventory items
    inventoryManager.createItem('coin');
    inventoryManager.createItem('clock');

    //Add new "weight" variable
    inventoryManager.addVariable('weight', 0);

    //Set weight for each item
    inventoryManager.setItemVariable('coin', 'weight', 1);
    inventoryManager.setItemVariable('clock', 'weight', 2);
}

InventoryExample.pressCoin = function (coin) {
    coin.input.onUp.remove(InventoryExample.pressCoin);
    coin.destroy();
    inventoryManager.changeItemCount('coin', 1);
    inventoryManager.outputInventory();

    InventoryExample.coinText.text = 'Coins: ' + inventoryManager.returnItemCount('coin');
    InventoryExample.updateWeight();
}

InventoryExample.pressClock = function (clock) {
    clock.input.onUp.remove(InventoryExample.pressClock);
    clock.destroy();
    inventoryManager.changeItemCount('clock', 1);
    inventoryManager.outputInventory();

    InventoryExample.clockText.text = 'Clocks: ' + inventoryManager.returnItemCount('clock');
    InventoryExample.updateWeight();
}

InventoryExample.updateWeight = function () {
    //Calculate and display tota weight of collected items
    var coinWeight = inventoryManager.returnItemCount('coin') * inventoryManager.returnItemVariable('coin', 'weight');
    //You can also fetch the values directly (Safer to use given functions as they perform an error catch)
    var clockWeight = inventoryManager.Items.clock.count * inventoryManager.Items.clock.weight;
    InventoryExample.weightText.text = 'Weight: ' + (coinWeight + clockWeight) + ' kg';
}

//Create's a new Kiwi.Game.
/*
* Param One - DOMID - String - ID of a DOMElement that the game will reside in.
* Param Two - GameName - String - Name that the game will be given.
* Param Three - State - Object - The state that is to be loaded by default.
* Param Four - Options - Object - Optional options that the game will use whilst playing. Currently this is used to to choose the renderer/debugmode/device to target
*/
if (typeof gameOptions == "undefined") gameOptions = {};

var game = new Kiwi.Game('game-container', 'InventoryExample', InventoryExample, gameOptions);