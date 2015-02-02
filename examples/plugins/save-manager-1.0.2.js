/**
* @module Kiwi
* @submodule Kiwi.Plugins
* @namespace Kiwi.Plugins
* @class ParticlePack1
* @main
*/
Kiwi.Plugins.SaveGame = {
  
    /**
    * The name of this plugin.
    * @property name
    * @type String
    * @public
    */
    name: 'SaveGame',   

    /**
    * The version of this plugin in semver (semantic versioning) format
    * @property version
    * @type String
    * @public
    */
    version: '1.0.2',
    
    /**
    * The minimum version of Kiwi.js required to run this plugin in semver (semantic versioning) format
    * @property minimumKiwiVersion
    * @type String
    * @public
    */
    minimumKiwiVersion:'1.0.0'
};

Kiwi.PluginManager.register(Kiwi.Plugins.SaveGame);


/** 
* The create method that the plugin manager will execute when the game this plugin is on is created.
* @method SaveGame.create
* @param game {Game} The game that this Plugin is being created on/should be created on.
* @return SaveManager
*/
Kiwi.Plugins.SaveGame.create = function(game) {
    
    var saveManager = new Kiwi.Plugins.SaveGame.SaveManager(game);
    game.saveManager = saveManager;

    //Tells the Plugin Manager to execute the boot method that is on the saveManager that was just created.
    return game.saveManager;	
}

/**
* Is the section of the Plugins that holds the various ways that deal with the saving of information. 
* The area in the information is stored can be a varierty of places (e.t.c LocalStorage, on a Server)
* and as such when saving you have to go through the SaveManager first
* 
* @module Plugins
* @submodule SaveGame
* @main SaveGame
*/

/**
* Is responsible for the storage and management of the various ways a Developer can save game information.
* This is useful as in the future there will be a variety of different ways/locations you can save information in. 
* Example: You may want to save information locally so you would use the localStorage area on this saveManager but if you wanted the information saved on a server then you would use a different 'plugin' that would save it onto a server. 
* 
* @class SaveManager
* @constructor
* @param game {Game}
* @return SaveManager
*/
Kiwi.Plugins.SaveGame.SaveManager = function(game) {

    /**
    * The game that this SaveManager belongs to.
    * @property game
    * @type Game
    * @public
    */
	this.game = game;
}


/**
* Returns the type of object that this is.
* @method objType
* @return string
* @public
*/
Kiwi.Plugins.SaveGame.SaveManager.prototype.objType = function() {
    return 'SaveManager';
}

/**
* The boot method for this SaveManager is executed when the game is in the process of starting up.
* This is an internal method used by Kiwi and as such a Dev should not need to use it.
* @method boot
* @protected
*/
Kiwi.Plugins.SaveGame.SaveManager.prototype.boot = function() {

    /**
    * Contains the object that handles localStorage saving of data for this game. 
    * @property localStorage 
    * @public
    */
    this.localStorage = new Kiwi.Plugins.SaveGame.LocalStorage(this.game);

    /**
    * Refer's to the current saving 'method' that is being. More useful if you have multiple different ways of saving information and you want to switch between them. 
    * @property current
    * @public
    */
    this.current = this.localStorage;

}

/**
* Switches the current method of saving that being used to a different one based on the type passed. 
* @method switchCurrent
* @param type {Number}
* @public
*/
Kiwi.Plugins.SaveGame.SaveManager.prototype.switchCurrent = function(type) {
    if(typeof type === "undefined") return;

    switch(type) {

        case Kiwi.Plugins.SaveGame.SaveManager.LOCAL_STORAGE:
            this.current = this.localStorage;
            break;
    
    }

}

/**
* Returns add method on the current saving method that is being used. 
* @method add
* @param key {String}
* @param data {Any}
* @param save {Boolean}
* @return {Boolean}
* @public
*/
Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype, "add", {
    get: function () {
        return this.current.add.bind(this.current);
    },
    enumerable: true,
    configurable: true
});

/**
* Returns edit method on the current saving method that is being used.
* @method edit
* @param key {String}
* @param data {Any}
* @param save {Boolean}
* @return {Boolean}
* @public
*/
Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype, "edit", {
    get: function () {
        return this.current.edit.bind(this.current);
    },
    enumerable: true,
    configurable: true
});

/**
* Returns remove method on the current saving method that is being used.
* @method remove
* @param key {String}
* @param save {Boolean}
* @return {Boolean}
* @public
*/
Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype, "remove", {
    get: function () {
        return this.current.remove.bind(this.current);
    },
    enumerable: true,
    configurable: true
});

/**
* Returns getData method on the current saving method that is being used.
* @method getData
* @param key {String}
* @return {Boolean}
* @public
*/   
Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype, "getData", {
    get: function () {
        return this.current.getData.bind(this.current);
    },
    enumerable: true,
    configurable: true
});

/**
* Returns save method on the current saving method that is being used.
* @method save
* @return {Boolean}
* @public
*/
Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype, "save", {
    get: function () {
        return this.current.save.bind(this.current);
    },
    enumerable: true,
    configurable: true
});

/**
* Returns the exists method on the current saving method that is being used.
* @method exists
* @return {Boolean}
* @public
*/
Object.defineProperty(Kiwi.Plugins.SaveGame.SaveManager.prototype, "exists", {
    get: function () {
        return this.current.exists.bind(this.current);
    },
    enumerable: true,
    configurable: true
});

/**
* A Static property with the number associated with the used of localstorage method.
* @property LOCAL_STORAGE
* @type number
* @static
* @default 1
* @public
*/
Kiwi.Plugins.SaveGame.SaveManager.LOCAL_STORAGE = 1;

/**
* 
* @module Plugins
* @submodules SaveGame 
* 
*/

/**
* Handles the saving of information through localStorage for a Kiwi Game.
* All of the information that is saved using this object is stored based on the name of the Game.
* So be careful when dealing with multiple games of the same name, as the data can conflict. 
* 
* @class LocalStorage
* @param game {Game}
* @return LocalStorage
*/
Kiwi.Plugins.SaveGame.LocalStorage = function(game) {
    this.game = game;

    /**
    * Holds all of the data that is currently in OR that is to be saved in localStorage. Private modification only.
    * @property _data
    * @type Object
    * @private
    */
    this._data = {};

    /**
    * If the localStorage method of saving is supported on this game or not.
    * This can be due to the browser not supporting localStorage or localStorage being full when the game was loading.
    * @property _supported
    * @type Boolean
    * @private
    */
    this._supported = Kiwi.DEVICE.localStorage;

    if(this.supported) 
        this._retrieveData();
}

/**
* Returns the data object, note that this is a READ only property. 
* @property data
* @type Object
* @public
*/
Object.defineProperty(Kiwi.Plugins.SaveGame.LocalStorage.prototype, "data", {
    get: function () {
        return this._data;
    },
    enumerable: true,
    configurable: true
});

/**
* Returns whether or not the localStorage method of saving information is supported or not.
* @property supported
* @type Boolean
* @public
*/
Object.defineProperty(Kiwi.Plugins.SaveGame.LocalStorage.prototype, "supported", {
    get: function () {
        return this._supported;
    },
    enumerable: true,
    configurable: true
});

/**
* Returns the type of object that this is.
* @method objType
* @return String
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.objType = function() {
    return 'LocalStorage';
}

/**
* This method is executed upon the creation of the localStorage object and is used internall only!
* @method _retrieveData
* @private
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype._retrieveData = function() {

    if (localStorage.getItem(this.game.stage.name) !== null) {
        var temp = localStorage.getItem(this.game.stage.name);
        this._data = JSON.parse(temp);

    } else {
        this._create();
    }

}

/**
* Creates (or tried to create) a new localStroage object for this game. If it fails it is due to lack of memory.
* @method _create
* @Private
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype._create = function() {
    try {
        this._data = {name: this.game.stage.name};
        localStorage.setItem(this.game.stage.name, JSON.stringify(this._data));
    
    } catch (e) {

        console.log('Can not use localstorage due to memory limitations.');
        this._supported = false;
    }    
}

/**
* Adds a new piece of data/information to the data object to be saved. 
* Note: Does not check to see if the information already exists, so if it does that information is overriden. 
* @method add
* @param key {String} The key for the piece of information you want to save. So that you can access it later.
* @param data {Any} The data that you want to save.
* @param save {Boolean} If you want to save the information immediately.
* @return {Boolean} Whether the information was successfully added or not. 
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.add = function(key, data, save) {
    if(typeof save == "undefined") save = false;

    if (this.supported === true) {
        
        this._data[key] = data;
        
        if(save === true) {
            return this.save();
        } else {
            return true;
        }
        
    }

    return false;
}

/**
* Edits a currently existing piece of information that has been saved. 
* @method edit
* @param key {String} The piece of information you want to edit.
* @param data {Any} The new information to save.
* @param save {Boolean} If the information should be immediately saved or not.
* @return {Boolean} A boolean indicating whether or not the information was succesfully modified or not.
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.edit = function(key, data, save) {
    if(typeof save == "undefined") save = false;

    if (this.supported === true) {
        if (this._data[key] !== null) {
            this._data[key] = data;
            
            if(save === true) {
                this.save();
            } else {
                return true;
            }
        }
    }
    return false;
}

/**
* Returns a piece of information/data that is stored based on the key that is provided. 
* If that key does not exist then null is returned.
* @method getData
* @param key {String} The key for the piece of information you want to retrieve.
* @return {Boolean}
* @public
*/        
Kiwi.Plugins.SaveGame.LocalStorage.prototype.getData = function(key) {
    if (this.supported === true) {

        if (typeof this._data[key] !== 'undefined') {
            return this._data[key];
        }
    }
    return null;
}

/**
* Returns a boolean indicating whether or a piece of information exists (has been saved or will be saved) based on a key that is provided.
* @method exists
* @param key {String} The key for the piece of information you want to check.
* @return {Boolean}
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.exists = function(key) {
    return (this._data[key] !== undefined);
}

/**
* Removes/deletes a piece of information.  
* @method remove
* @param key {String} The key of the information you want to remove.
* @param save {Boolean} If the save method should be executed right away or not.
* @return {Boolean} If it was successful.
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.remove = function(key, save) {
    if(typeof save == "undefined") save = false;

    if (this.supported === true) {
        if (this._data[key] !== null) {
            delete this._data[key];
            
            if(save === true) {
                this.save();
            } else {
                return true;
            }
        }
    }
}

/**
* Used to remove all developer saved values from localStorage. 
* @method clear
* @param save {Boolean} If the save method should be executed or not.
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.clear = function(save) {
    if(typeof save == "undefined") save = false;

    if (this.supported === true) {
        this._data = {};
        if(save === true) this.save();
    }
}

/**
* Saves the information that is stored in the _data property into localStorage. 
* Returns a boolean indicating whether or not the save was successful. 
* If it was unsuccessful then localStorage is full and cannot be used until cleared.
* @method save
* @return {Boolean} If the saving was successful
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.save = function() {

    //Try to save the information in localStorage. 
    try {

        //Using setItem as it is more persistent in Cocoon.
        localStorage.setItem([this.game.stage.name], JSON.stringify(this._data));
        return true;

    } catch (e) {
        console.log('Localstorage is full. Could not update.');
        return false;
    }

}

/**
* Loads all of the information from LocalStorage. 
* Note: Reset's all of the information currently saved in the _data object to the information saved in localStorage.  
* @method load
* @return {Boolean} If the loading was succesful or not.
* @public
*/
Kiwi.Plugins.SaveGame.LocalStorage.prototype.load = function() {

    if(this.supported === true) {

        this._data = JSON.parse(localStorage.getItem(this.game.stage.name));
        
        return true;
    }

    return false;
}
