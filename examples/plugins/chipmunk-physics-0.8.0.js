/**
* Description about the main namespace that the plugin is in.
*
* @module Plugins
* @submodule ChipmunkPhysics
* @namespace Kiwi
*/
Kiwi.Plugins.ChipmunkPhysics = {
  
  /**
  * The name of this plugin.
  * @property name
  * @type String
  * @default 'ChipmunkPhysics'
  * @public
  * @static
  */
  name:'ChipmunkPhysics',

  /**
  * The version of this plugin.
  * @property version
  * @type String
  * @public
  * @static
  */
  version:'0.8.0',

  /**
  * The minimum version of Kiwi.js required to run this plugin in semver (semantic versioning) format
  * @property minimumKiwiVersion
  * @type String
  * @public
  * @static
  */
  minimumKiwiVersion:'1.1.1'

};

/**
* Registers this plugin with the Global Kiwi Plugins Manager if it is avaiable.
* 
*/
Kiwi.PluginManager.register(Kiwi.Plugins.ChipmunkPhysics);


/**
* Checks to see if the core Chipmunk Physics has been included by this stage or not.
* If chipmunk is not found, then we quit at this stage. 
* @method create
* @param game {Kiwi.Game} The game that is current in the boot stage.
* @private 
*/
Kiwi.Plugins.ChipmunkPhysics.create = function(game) {


  //Does the chipmunk physics exists
  if(typeof cp == "undefined") {
    console.error('You need to include the chipmunk library in-order for this plugin to work.');
    return false;
  } 


  // Create the Manager.
  game.chipmunk = new Kiwi.Plugins.ChipmunkPhysics.Manager(game, cp);


  return game.chipmunk;
}
 



/**
*
*
* @module Plugins	
* @submodule ChipmunkPhysics
*/

/**
* A Component which is easily configurable upon creation and attaches to Entities to make adding
* Bodies and Shapes to Kiwi Objects easy as. 
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Component
* @constructor
* @extends Kiwi.Component
* @param owner {Kiwi.Entity} The owner of this Component.
* @param [config] {Object} Configuration information about the body/shapes that are to be generated.
*	@param [config.space] {Kiwi.Plugins.ChipmunkPhysics.Space} The space that the objects should be added to.
* 	@param [config.transform] {Kiwi.Geom.Transform} The transform object that the body should use when created.
*	@param [config.defaultBody] {Kiwi.Plugins.ChipmunkPhysics.Body} The body to use instead of creating a new one. 
*		If defined, then the 'body' param is ignored.
*	@param [config.type='box'] {String} The default type of shape/body that should be created. 
*		Only used if a type is not passed to the 'body' or 'shape' configs below.  
*	@param [config.body] {Object} Contains the settings for the body to be generated. See the 'createBody' static method for more details.
*	@param [config.shape] {Object} Contains settings for a singular shape to be generatated. See 'createShape' static method for more details.
*	@param [config.shapes] {Array} Contains an array of settings for shapes to be generatated. See 'createShape' static method for more details.
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Component = function(owner, config) {

	//Extend the Kiwi Components
	Kiwi.Component.call( this, owner, 'ChipmunkPhysics' );

	//Check to see that the plugin manager exists
	if( typeof this.game.chipmunk == "undefined" ) {
		console.error('Could not find the chipmunk manager attached to the game.'); 
		return;
	}

	/**
	* The Chipmunk Physics manager which should be attached to this game.
	* @property manager
	* @type Kiwi.Plugins.ChipmunkPhysics.Manager
	* @public
	*/
	this.manager = this.game.chipmunk;

	/**
	* A list of all the shapes (hitboxes) attached to this component.
	* @property shapes
	* @type Array
	* @public
	*/
	this.shapes = [];

	this._create( config );

	this._applyVeloDefaults( config );

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Component, Kiwi.Component );


/**
* Calculate the default mass based on a sprites width * height / 1000
* You can override this method to set your own default for physic components.
* 
* @method getDefaultMass
* @param sprite []
* @return {Number}
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.getDefaultMass = function( sprite ) {
	return sprite.width * sprite.height / 1000; 
};


/**
* Executed when the Component is created. 
* Is passed a config parameter and then creates a body/shapes depending on the parameters passed. 
*
* @method _create
* @param params {Object}
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Component.prototype._create = function( config ) {

	config = config || {};

	/**
	* The transformation that the body is using to position itself.
	* 
	* @property transform
	* @type Kiwi.Geom.Transform
	* @public
	*/
	this.transform = config.transform || this.owner.transform;


	/**
	* The space which the shapes/body have been attached to.
	* 
	* @property space
	* @type Any
	* @public
	*/ 
	this.space = config.space || this.manager.space;

	/**
	* The default type of shapes/body that should be created if a type is not passed.
	* 
	* @property defaultType
	* @type String
	* @default 'box'
	* @private
	*/
	this.defaultType = config.type || 'box';


	/**
	* The body of this Component. 
	* 
	* @property body
	* @type Kiwi.Plugins.ChipmunkPhysics.Body
	* @public
	*/ 
	if( typeof config.defaultBody !== "undefined" ) {
	 	this.body = config.defaultBody;
	} else {
		this.body = Kiwi.Plugins.ChipmunkPhysics.Component.createBody( this, config.body );
	}


	if( typeof config.shapes !== "undefined" ) {
		this.shapes.concat( Kiwi.Plugins.ChipmunkPhysics.Component.createShapes( this, config.shapes, config.body ) );
	} else {
		this.shapes.push( Kiwi.Plugins.ChipmunkPhysics.Component.createShape( this, config.shape, config.body ) );
	}

};


/**
* Applys any default velocities passed when this object is created.
* 
* @method _applyDefaults
* @param [params] {Object}
* 	@param [params.velocityX] {Number} Velocity on the x-axis
* 	@param [params.velocityY] {Number} Velocity on the y-axis
* 	@param [params.angularVelo] {Number} Angular velocity
* 	@param [params.maxVelo] {Number} Maximum velocity
* 	@param [params.maxAngularVelo] {Number} Maximum angular velocity
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Component.prototype._applyVeloDefaults = function( params ) {

	if( params.velocityX ) {
		this.velocityX = params.velocityX;
	}

	if( params.velocityY ) {
		this.velocityY = params.velocityY; 
	}

	if( params.angularVelo ) {
		this.angularVelo = params.angularVelo;
	}

	if( params.maxVelo ) {
		this.maxVelocity = params.maxVelo;
	}

	if( params.maxAngularVelo ) {
		this.maxAngVelo = params.maxAngVelo;
	}

};


/**
* Creates a new body based on the configuration parameters passed and the sprite.
*
* A number of different 'types' of bodies can be created and the type you choose changes the parameters you need to pass.
* Also look at 'Kiwi.Plugins.ChipmunkPhysics.Body' for more parameters you can pass.
* 
* - 'box' - Uses the 'Kiwi.Plugins.ChipmunkPhysics.createBoxBody' function
* - 'circle' - Uses the 'Kiwi.Plugins.ChipmunkPhysics.createCircleBody'  function
* - 'segment' - Uses the 'Kiwi.Plugins.ChipmunkPhysics.createSegmentBody'  function
* - 'poly' - Uses the 'Kiwi.Plugins.ChipmunkPhysics.createPolyBody'  function
* - 'static' - Gets the body from the space. 
* - 'custom' - Directly creates a new Kiwi.Plugins.ChipmunkPhysics.Body.
* 
* @method createBody
* @param physComp {Kiwi.Plugins.ChipmunkPhysics.Component} The component which the body is being created for.
* @param [config] {Object}
* 	@param [config.transform] {Kiwi.Geom.Transform} The transform that the body should use. Defaults to the components owners transform. Usually this is as desired.
*	@param [config.mass] {Number} The mass of the body. If not passed, then one is generated by 'getDefaultMass' method.
* 	@param [config.addToSpace=true] {Boolean} If the created body should be added to the space or not.
*	@param [config.owner] {Any} The owner of the body. If not passed then the owner is the components owner.
*	@param [config.type='box'] {String} The type of body that is to be created. This value affects the following parameters that you can pass. Defaults to box. 
*
*	@param [config.width=box.bounds.width] {Number} 'box' types only. The width of the box. Defaults to box.bound.width if a box component is found. Otherwise 100.
*	@param [config.height=box.bounds.height] {Number} 'box' types only. The height of the box. Defaults to box.bound.height if a box component is found. Otherwise 100.
*
*	@param [config.radius=box.bounds.height*0.5] {Number} 'circle' types only. The circles radius. Defaults to half of the box.bounds.height if a box component is found. Otherwise 50.
*
*	@param [config.start] {Object} 'segment' types only. The starting cooridnates of the line.
*		@param [config.start.x=-bounds.width * 0.5] {Number} The starting coordinate on the x-axis.
*		@param [config.start.y=0] {Number} The starting coordinate on the y-axis.
*	@param [config.end] {Object} 'segment' types only. 
*		@param [config.end.x=bounds.width * 0.5] {Number} The end coordinate on the x-axis.
*		@param [config.end.y=0] {Number} The end coordinate on the y-axis.
*
*	@param [config.verts] {Object} 'poly' types only. The vertices for the polygon shape that the body will be attached to.
*	
* @return {Kiwi.Plugins.ChipmunkPhysics.Body} The body
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.createBody = function( phyComp, config ) {

	var body, bounds,
		owner = phyComp.owner;

	if( owner.components.hasComponent('Box') ) {
		bounds = owner.components.getComponent('Box').bounds;

	} else {
		bounds = {
			width: 100,
			height: 100
		};

	}

	config = config || {};


	//Defaults
	config.transform = config.transform || phyComp.transform;
	config.mass = config.mass || Kiwi.Plugins.ChipmunkPhysics.Component.getDefaultMass( owner );
	config.owner = config.owner || owner;
	config.type = config.type || phyComp.defaultType;


	switch( config.type.toLowerCase() ) {
		case 'box':
		case 'rectangle':
		case 'square':

			//Default to the width/height of the owner if no dimensions passed
			config.width = config.width || bounds.width;
			config.height = config.height || bounds.height;

			body = Kiwi.Plugins.ChipmunkPhysics.createBoxBody( config );
			break;

		case 'circle':

			// config.offset = config.offset; 
			config.radius = config.radius || bounds.height * 0.5;

			body = Kiwi.Plugins.ChipmunkPhysics.createCircleBody( config );
			break;

		case 'segment':
		case 'line':

			config.start = config.start || { x: -bounds.width * 0.5, y: 0 };
			config.end = config.end || { x: bounds.width * 0.5, y: 0 };

			body = Kiwi.Plugins.ChipmunkPhysics.createSegmentBody( config );
			break;

		case 'poly':

			if( typeof config.verts == "undefined" ) {
				config.verts = [ 
					0, 
					0, 
					bounds.width, 
					0, 
					bounds.width, 
					bounds.height, 
					0, 
					bounds.height];
			} 
			
			body = Kiwi.Plugins.ChipmunkPhysics.createPolyBody( config );
			break;

		case 'static':
			body = config.space.staticBody;
			break;

		case 'custom':
			config.i = config.i || Infinity;
			body = new Kiwi.Plugins.ChipmunkPhysics.Body( config );
			break;

	}

	//Add to space.
	if( typeof config.addToSpace == "undefined" || config.addToSpace) {
		phyComp.space.addBody( body );
	} 

	return body;
};


/**
* Creates new shapes based on the configuration parameters passed and the sprite.
* Essentually is a wrapper that calls the 'createShape' method multiple times. 
* 
* @method createShapes
* @param physComp {Kiwi.Plugins.ChipmunkPhysics.Component} The component which the body is being created for.
* @param [config] {Array|Object}
* @param [bodyConfig] {Object} The bodies configuration object.
* @return {Array} An array of shapes that have been created.
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.createShapes = function( phyComp, config, bodyConfig ) {

	//Multiple shapes...
	var shape,
		shapes = [],
		manager = phyComp.manager,
		owner = phyComp.owner;

	// Config
	if( typeof config === "undefined" ) {
		config = {};
	} 

	// Array
	if( ! Kiwi.Utils.Common.isArray( config ) ) {
		config = [ config ];
	} 

	//Loop through the shapes
	for (var i = 0, len = config.length; i < len; i++) {
		
		shape = Kiwi.Plugins.ChipmunkPhysics.Component.createShape( phyComp, config[ i ], bodyConfig );

		if( shape ) {
			shapes.push( shape );
		}

	}

	return shapes;
};



/**
* Creates a new shape based on the configuration parameters passed and the sprite.
*
* A number of different types of shapes can be created. The type choosen changes the parameters you need/can pass.
* Generally they are the same as the type you pass to the body, but they can be different. 
*
* - 'none' - No shape will be created.
* - 'box' - See the 'Kiwi.Plugins.ChipmunkPhysics.Shapes.Box' 
* - 'circle' - See the 'Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle' 
* - 'segment' - See the 'Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment'
* - 'poly' - See the 'Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly'
* 
* @method createShapes
* @param physComp {Kiwi.Plugins.ChipmunkPhysics.Component} The component which the body is being created for.
* @param [config] {Object}
* 	@param [config.body] {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape should be a part of.
* 	@param [config.type] {String} The type of shape that should be created. Defaults to the bodies. 
* 	@param [config.addToSpace=true] {Boolean} If the created shape should be added to the space or not.
*
* 	@param [config.width] {Number} 'box' types only. Width of the shape. Defaults to the value used for the body. 
* 	@param [config.height] {Number} 'box' types only. Height of the shape. Defaults to the value used for the body.
*
* 	@param [config.radius] {Number} 'circle' types only. The radius of the shape. Defaults to the value used for the body.
* 	@param [config.offset] {Object} 'circle' types only. Used to offset the shape from the body. 
* 		@param [config.offset.x=0] {Number} Offset of the shape on the x-axis.
* 		@param [config.offset.y=0] {Number} Offset of the shape on the y-axis.
*
*	@param [config.start] {Object} 'segment' types only. The starting coordinates of the line.
*		@param [config.start.x=0] {Number} The starting coordinate on the x-axis.
*		@param [config.start.y=bounds.height*0.5] {Number} The starting coordinate on the y-axis.
*	@param [config.end] {Object} 'segment' types only. The end coordinates of the line.
*		@param [config.end.x=bounds.width] {Number} The end coordinate on the x-axis.
*		@param [config.end.y=bounds.height*0.5] {Number} The end coordinate on the y-axis.
* 	@param [config.radius] {Number} 'segment' types only. The radius of the line.
*
* 	@param [config.verts] {Array} 'poly' types only. The vertices for the polygon shape.
* 	@param [config.offset] {Object} 'poly' types only. Used to offset the shape from the body. 
* 		@param [config.offset.x=0] {Number} Offset of the shape on the x-axis.
* 		@param [config.offset.y=0] {Number} Offset of the shape on the y-axis.
*
* @param [bodyConfig] {Object} The bodies configuration object. Used to assign defaults for values that are not defined on the 'config' object.
* @return {Any} A shapes based on the type parameter passed.
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Component.createShape = function( phyComp, config, bodyConfig ) {

	config = config || {};

	var shape, bounds,
		bodyConfig = bodyConfig || {},
		owner = phyComp.owner;
		
	if( owner.components.hasComponent('Box') ) {
		bounds = owner.components.getComponent('Box').bounds;

	} else {
		bounds = {
			width: 100,
			height: 100
		};

	}

	config.body = config.body || phyComp.body;
	config.type = config.type || bodyConfig.type || phyComp.defaultType;

	switch( config.type.toLowerCase() ) {

		case 'none':
			return null;

		case 'box':
		case 'rectangle':
		case 'square':
			//width
			//height
			config.width = config.width || bodyConfig.width || bounds.width;
			config.height = config.height || bodyConfig.width  || bounds.height;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Box( config ); 
			break;

		case 'circle':
			
			//radius
			//offset - x / y
			config.radius = config.radius || bodyConfig.radius || bounds.height * 0.5;
			config.offset = config.offset || bodyConfig.offset;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle( config );
			break;

		case 'segment':

			// a - x / y
			// b - x / y
			// r
			config.start = config.start || bodyConfig.start;
			config.end = config.end || bodyConfig.end;
			config.radius = config.radius || bodyConfig.radius || 1;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( config );
			break;

		case 'poly':

			//verts
			//offset - x / y
			config.verts = config.verts || bodyConfig.verts;
			config.offset = config.offset || bodyConfig.offset;

			shape = new Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly( config );
			break;

	}

	//Plus others..
	if( typeof config.addToSpace === "undefined" || config.addToSpace ) {
		phyComp.space.addShape( shape );
	}

	return shape;
};


/**
* The mass of the body. 
* 
* @property mass
* @type Number
* @public
*/ 
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, 'mass', {

    get: function () {
        return this.body.mass;
    },

    set: function (val) {
		this.body.setMass(val);
    },

    enumerable: true,

    configurable: true

});


/**
* The velocity of this body on the X axis.
* @property velocityX
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, 'velocityX', {

    get: function () {
        return this.body.velocityX;
    },

    set: function (val) {
    	this.body.velocityX = val;
    },

    enumerable: true,

    configurable: true

});


/**
* The velocity of this body on the Y axis.
* @property velocityY
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, 'velocityY', {

    get: function () {
        return this.body.velocityY;
    },

    set: function (val) {
    	this.body.velocityY = val;
    },

    enumerable: true,

    configurable: true

});


/**
* The maximum velocity of this object.
* @property maxVelocity
* @type Number
* @default Infinity
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, 'maxVelocity', {

    get: function () {
        return this.body.maxVelocity;
    },

    set: function (val) {
    	this.body.maxVelocity = val;
    },

    enumerable: true,

    configurable: true

});



/**
* The angular velocity of this body.
* @property angularVelo
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, 'angularVelo', {

    get: function () {
        return this.body.angularVelo;
    },

    set: function (val) {
    	this.body.angularVelo = val;
    },


    enumerable: true,

    configurable: true

});


/**
* The maximum angular velocity of this object.
* @property maxAngVelo
* @type Number
* @default Infinity
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Component.prototype, 'maxAngVelo', {

    get: function () {
        return this.body.maxAngVelo;
    },

    set: function (val) {
    	this.body.maxAngVelo = val;
    },


    enumerable: true,

    configurable: true

});


/**
* Update method. Not used.
* @method update
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Component.prototype.update = function() {
	
};
/**
* The main namespace for this plugin. All classes that are to be used will be accessable under this main namespace.
* 
* @module Plugins
* @submodule ChipmunkPhysics
* @main
*/

/**
* Create for each Kiwi game using the Chipmunk Physics Plugin.
* In charge of creating new spaces for the game, and updating them each frame.
*
* A default space is included and is used by default by components.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Manager
* @constructor
* @param game {Kiwi.Game} The game that this manager is attached to.
* @param cp {Any} The root namespace which holds the Chipmunk JS functionality. (Usually is 'cp') 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager = function( game, cp ) {


  /**
  * The game that this manager is a part of.
  * @property game
  * @type Kiwi.Game
  * @public
  */
  this.game = game;


  /**
  * The main chipmunk namespace.
  * @property cp
  * @type Any
  * @public
  */  
  this.cp = cp; 


  /**
  * Speed at which all spaces managed by this object are to be updated by each frame.
  * @property updateSpeed
  * @type Number
  * @default 1/60
  * @public
  */
  this.updateSpeed = 1 / 60; 

}; 

/**
* Creates the initial default space.
* Internal use only.
*
* @method boot
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager.prototype.boot = function() {


  /**
  * A list of all the chipmunk spaces manager for this game. 
  * @property spaces
  * @type Array
  * @public
  */
  this.spaces = [];


  /**
  * The default space created at boot time.
  * @property defaultSpace
  * @type Kiwi.Plugins.ChipmunkPhysics.Space
  * @public
  */

  /**
  * The 'main' space which new Components will use when one has not been passed. 
  * By default this is the same as the 'defaultSpace' this can be reassigned.
  * @property space
  * @type Kiwi.Plugins.ChipmunkPhysics.Space
  * @public
  */
  this.defaultSpace = this.space = this.createNewSpace();


  /**
  * If the spaces managed by this plugin should update or not. 
  * @property active
  * @default true
  * @type Boolean
  * @public
  */
  this.active = true;

};


/**
* Creates a new Space Object. 
* Passing a boolean determines whether or not the Space object created is managed by this class
* or not. 
*
* @method createNewSpace
* @param [managed=true] {Boolean} If the space object is to be managed by this class or not.
* @param [spaceConfig] {Object} Default values for the space. See the 'Kiwi.Plugins.ChipmunkPhysics.Space' constructor.
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager.prototype.createNewSpace = function( managed, spaceConfig ) {

  var managed = managed || true;
  var space = new Kiwi.Plugins.ChipmunkPhysics.Space( spaceConfig );

  if(managed) this.spaces.push(space);
  
  return space;

};


/**
* The number of iterations that the space property should update each frame.
* The higher this is the more accurate the physics will be, but the more process intensive it will be also.
*
* @property iterations
* @type Number
* @default 10
* @public
*/
Object.defineProperty(Kiwi.Plugins.ChipmunkPhysics.Manager.prototype, "iterations", {
    get: function () {
      return this.space.iterations;
    },
    set: function(val) {
      this.space.iterations = val;
    },
    enumerable: true,
    configurable: true
});


//Doesn't currently work! :(
Object.defineProperty(Kiwi.Plugins.ChipmunkPhysics.Manager.prototype, "gravity", {
    get: function () {
      return this.space.gravity;
    },

    enumerable: true,

    configurable: true
});



/**
* Update loop which is executed each frame. Updates the space
*
* @method update
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Manager.prototype.update = function() {

  //Update all the spaces each frame...
  var len = this.spaces.length;


  if( this.active ) {
    
    while( len-- ) {
      this.spaces[ len ].step( this.updateSpeed );
    }

  }

}



/**
* 
* @module Plugins
* @submodule ChipmunkPhysics
* @namespace Kiwi.Plugins.ChipmunkPhysics
*
*/


/*
* Static method to help quickly and easily create a new body that would be for a box/rectangle.
* Parameters passed are also used as the parameters for the body.
*
* @method createBoxBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.width {Number} Width of the box.
*   @param params.height {Number} Height of the box.
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
* 
*/
Kiwi.Plugins.ChipmunkPhysics.createBoxBody = function( params ) {

  if( !params && !params.mass && !params.width && !params.height ) {
    console.warn( 'Not all parameters required passed.' );
    return null;
  }

  params.i = cp.momentForBox(
      params.mass, 
      params.width, 
      params.height );

  return new Kiwi.Plugins.ChipmunkPhysics.Body( params );

};



/**
* Static method to help quickly and easily create a new body that would be for a circle.
* Parameters passed are also used as the parameters for the body.
* 
* @method createCircleBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.radius {Number} Radius of the circle.
*   @param [params.offset] {Object} The offset. 
*     @param [params.offset.x=0] {Number} The offset of this on the x-axis.
*     @param [params.offset.y=0] {Number} The offset of this on the y-axis.
*   @param [params.innerRadius=0] {Number} 
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
*
*/
Kiwi.Plugins.ChipmunkPhysics.createCircleBody = function( params ) {

  if( !params && !params.mass && !params.radius ) {
    console.warn( 'Not all parameters required passed.' );
    return null;
  }


  params.innerRadius = params.innerRadius || 0;
  params.offset = params.offset || { x: 0, y: 0 };

  params.i = cp.momentForCircle( 
      params.mass, 
      params.innerRadius, 
      params.radius, 
      params.offset 
      );

  return new Kiwi.Plugins.ChipmunkPhysics.Body( params );

};


/**
* Static method to help quickly and easily create a new body that would be for a segment/line.
* Parameters passed are also used as the parameters for the body.
* 
* @method createSegmentBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.start {Object} The starting location of the segment. 
*     @param params.start.x {Number} The starting location of the segment on the x-axis.
*     @param params.start.y {Number} The starting location of the segment on the y-axis.
*   @param params.end {Object} The end location of the segment. 
*     @param params.end.x {Number} The end location of the segment on the x-axis.
*     @param params.end.y {Number} The end location of the segment on the y-axis.
*   @param [params.innerRadius=0] {Number} 
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
*
*/
Kiwi.Plugins.ChipmunkPhysics.createSegmentBody = function( params ) {

  if( !params && !params.mass && !params.start && !params.end ) {
    console.warn( 'Not all parameters required passed.' );
    return null;
  }

  params.i = cp.momentForSegment(
      params.mass, 
      params.start, 
      params.end 
      );

  return new Kiwi.Plugins.ChipmunkPhysics.Body( params );
};


/**
* Static method to help quickly and easily create a new body that would be used for a polygon.
* Parameters passed are also used as the parameters for the body.
* 
* @method createPolyBody
* @param params {Object}
*   @param params.mass {Number} Mass of the box.
*   @param params.verts {Number} Vertices for the body.
*   @param [params.offset] {Object} The offset. 
*     @param [params.offset.x=0] {Number} The offset of this on the x-axis.
*     @param [params.offset.y=0] {Number} The offset of this on the y-axis.
* @return {Kiwi.Plugins.ChipmunkPhysics.Body}
* @public
* @static
*
*/
Kiwi.Plugins.ChipmunkPhysics.createPolyBody = function( params ) {

  if( !params && !params.mass && !params.verts ) {
    console.warn( 'Not all parameters required passed.' );
    return null;
  }

  params.offset = params.offset || { x: 0, y: 0 };

  params.i = cp.momentForPoly(
      params.mass, 
      params.verts, 
      params.offset
      );

  return new Kiwi.Plugins.ChipmunkPhysics.Body( params );
};
/**
* Namespace containing all the Joints (constraints) which can be used.
* 
* @module ChipmunkPhysics
* @submodule Joints
*
*/
Kiwi.Plugins.ChipmunkPhysics.Joints =  {};



/**
* Used to apply default parameters which function on each constraint (joint).
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @method ParamConstruct
* @param [params] {Object}
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct = function( params ) {

	if( params.maxForce ) {
		this.maxForce = params.maxForce;
	}

	if( params.errorBias ) {
		this.maxForce = params.errorBias;
	}

	if( params.maxBias ) {
		this.maxBias = params.maxBias;
	}

};
/**
* Namespace containing all the Shapes (hitboxes) which can be used.
* 
* @module ChipmunkPhysics
* @submodule Shapes
* @main
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes = {};


/**
* Function used by shapes to apply the parameters passed.   
* Only intended for internal use. 
*
* @method ParamConstruct
* @param [params] {Object}
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct = function( params ) {

	params = params || {};

	if( params.e ) {
		this.setElasticity( params.e );
	} else if( params.elasticity ) {
		this.setElasticity( params.elasticity );
	}

	if( params.u ) {
		this.setFriction( params.u );
	} else if( params.friction ) {
		this.setFriction( params.friction );
	}

	if( params.group ) {
		this.group = params.group;
	}

	if( params.layers ) {
		this.setLayers( params.layers );
	} 

	if( params.sensor ) {
		this.setSensor( params.sensor );
	}

	if( params.collisionType ) {
		this.setCollisionType( params.collisionType ); 
	}
		
};
/**
*
* @module Plugins
* @submodule ChipmunkPhysics
*
*/

/**
* An extended version of the Chipmunk Body class.
* This object has been designed to function with Kiwi Transform Objects and the transformation hierarchy associated with them.
*
* Nice aliases have also been attached :)
*
* Note: Scale on transforms are not taken into account for an objects shape (hitbox). 
* But position due to scale is taken into account.         
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Body
* @extends cp.Body
* @constructor
* @param [params] {Object}
*	@param params.mass {Number} The mass of this body. 
* 	@param params.i {Number} Moment of inertia. Used to resolve collisions.
*   @param [params.transform] {Kiwi.Geom.Transform} The transform that this body will use to position itself by. 
*       If not passed, one is created.
*   @param [params.center] {Object} The location of the bodies centeroid from the transform top left corner. You must either assign both or neither.
* 		@param [params.center.x] {Number} The X location of the centeroid. Defaults to the transforms anchorPointX. 
* 		@param [params.center.y] {Number} The Y location of the centeroid. Defaults to the transforms anchorPointY/
*	@param [params.owner=null] {Any} The owner of this body. Generally assigned to a sprite.
*	@param [params.velocity] {Object} Velocity of the body.
*		@param [params.velocity.x=0] {Number} Velocity of the body on the x-axis.
*		@param [params.velocity.y=0] {Number} Velocity of the body on the y-axis.
*	@param [params.maxVelocity=Infinity] {Number} Maximum velocity of the body. 
*	@param [params.angVelo=0] {Number} Angular velocity of the body.
*	@param [params.maxAngVelo=Infinity] {Number} Maximum angular velocity of the body.
*
*/
Kiwi.Plugins.ChipmunkPhysics.Body = function( params ) {

	params = Kiwi.Plugins.ChipmunkPhysics.Body.parseParams( params );

	/**
	* The transform object that this body will use for positioning.
	* @property transform
	* @type Kiwi.Geom.Transform
	* @public
	*/
	this.transform = params.transform;


	/**
	* The center of the body. From the top left corner of the body.
	* @property center
	* @type Kiwi.Geom.Point
	* @public
	*/ 
	this.center = new Kiwi.Geom.Point( params.center.x, params.center.y );


	/**
	* The owner of this body. Generally is assigned to a GameObject.
	* @property owner
	* @type Any
	* @default null
	* @public
	*/
	this.owner = params.owner;


	cp.Body.call( this, params.mass, params.i );


	if( typeof params.maxVelocity !== "undefined" ) {
		this.maxVelocity = params.maxVelocity;
	}


	if( typeof params.maxAngVelo !== "undefined" ) {
		this.maxAngVelo = params.maxAngVelo;
	}


	if( typeof params.angVelo !== "undefined" ) {
		this.setAngVel( params.angle );
	}


	if( typeof params.velocity !== "undefined" ) {
		this.setVelocity( params.velocity );
	}

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Body, cp.Body );


/**
* Used each time a new Body is created to assign default values to the params object passed.
* Returns the same params object passed but with defaults assigned.
* @method _parseParams
* @param [params] {Object}
* @return {Object}
* @static
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Body.parseParams = function( params ) {

	params = params || {};

	params.transform = params.transform || new Kiwi.Geom.Transform( 0, 0 ); 

	params.center = params.center || { x: params.transform.anchorPointX, y: params.transform.anchorPointY };

	params.owner = params.owner || null;

	if( typeof params.m !== "undefined" ) {
		params.mass = params.m;

	} else if( typeof params.mass == "undefined" ) {
		console.warn('No mass passed. Assigning default.');
		params.mass = 100; 
	
	}

	if( typeof params.i == "undefined" ) {
		console.warn('No moment of inertia passed. Assigning default.');
		params.i = 100;
	}

	return params;
};


/**
* Sets the position of transform that this body is attached to. 
* These values are in WORLD coordinates. See the x/y propreties for more information.
* @method setPos
* @param x {Number}
* @param y {Number}
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Body.prototype.setPos = function( x, y ) {

	this.x = x;
	this.y = y;

};


/**
* The location of the body in the world space on the x-axis. 
* Assigning a value adjusts the transform assigned to position the body at the cooridnates specified.
* @property x
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'x', {

	get: function () {
		return this.transform.worldX + this.center.x;
	},

	set: function (val) {
		this.activate();

		if( this.transform.parent ) {
			var parentRot =  Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent );
			val -= this.x;

			this.transform.x += val * Math.cos( parentRot );
			this.transform.y += val * Math.sin( parentRot * -1 );
		
		} else {
			this.transform.x = val;
		}

		this.p.x = this.x;

	},

	enumerable: true,

	configurable: true

});



/**
* The location of the body in the world space on the y-axis. 
* Assigning a value adjusts the transform assigned to position the body at the cooridnates specified.
* @property y
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'y', {

	get: function () {
		return this.transform.worldY + this.center.y;
	},

	set: function ( val ) {
		this.activate();

		if( this.transform.parent ) {
			var parentRot =  Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent );
			val -= this.y;

			this.transform.x += val * Math.sin( parentRot );
			this.transform.y += val * Math.cos( parentRot );

		} else {
			this.transform.y = val;
		}
		
		this.p.y = this.y;

	},

	enumerable: true,

	configurable: true

});


/**
* Sets the angle (rotation) of the transform attached.
* Value is in worldRotation coordinates.
* @method setAngle
* @param angle {Number}
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Body.prototype.setAngle = function( angle ) {

	this.activate();

	if( this.transform.parent ) {
		var pRot = Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent );
	} else {
		var pRot = 0;
	}

	this.transform.rotation = angle - pRot;

};



/**
* The rotation of the body (and thus the transform) in world coordinates.
* @property rotation
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'rotation', {

	get: function () {
		return Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform );
	},

	set: function ( val ) {
		this.setAngle( val );
	},

	enumerable: true,

	configurable: true

});



/**
* Returns the worldRotation of a transformation passed.
* @method getWorldRotation
* @param transform {Kiwi.Geom.Transform}
* @return {Number} The rotation of the transformation.
* @public
* @static
*/
Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation = function( trans ) {

	var rot = trans.rotation;

	if( trans.parent ) {
		return rot + Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( trans.parent );
	}

	return rot;
};




/**
* The mass of this body.
* @property mass
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'mass', {

	get: function () {
		return this.m;
	},

	set: function (val) {
		this.setMass(val);
	},

	enumerable: true,
	configurable: true

});


/**
* The velocity of this body on the X axis.
* @property velocityX
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'velocityX', {

	get: function () {
		return this.vx;
	},

	set: function ( val ) {
		this.activate();
		this.vx = val;
	},

	enumerable: true,
	configurable: true

});



/**
* The velocity of this body on the Y axis.
* @property velocityY
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'velocityY', {

	get: function () {
		return this.vy;
	},

	set: function ( val ) {
		this.activate();
		this.vy = val;
	},

	enumerable: true,
	configurable: true

});


/**
* The angular velocity of this body.
* @property angularVelo
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'angularVelo', {

	get: function () {
		return this.w;
	},

	set: function ( val ) {
		this.setAngVel( val );
	},

	enumerable: true,
	configurable: true

});


/**
* The maximum velocity of this object.
* @property maxVelocity
* @type Number
* @default Infinity
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'maxVelocity', {

	get: function () {
		return this.v_limit;
	},

	set: function ( val ) {
		this.v_limit = val;
	},

	enumerable: true,

	configurable: true

});



/**
* The maximum angular velocity of this object.
* @property maxAngVelo
* @type Number
* @default Infinity
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Body.prototype, 'maxAngVelo', {

	get: function () {
		return this.w_limit;
	},

	set: function ( val ) {
		this.w_limit = val;
	},

	enumerable: true,

	configurable: true

});



/**
* Overriden version of the function which handles adjusting objects position/rotation after collisions. 
* @method position_func
* @param dt {Number}
* @private
*/
Kiwi.Plugins.ChipmunkPhysics.Body.prototype.position_func = function( dt ) {

	var matrix = this.transform.getConcatenatedMatrix(),
		parentRot =  Kiwi.Plugins.ChipmunkPhysics.Body.getWorldRotation( this.transform.parent ),
		ix = matrix.tx - this.transform.anchorPointX + this.center.x,
		iy = matrix.ty - this.transform.anchorPointY + this.center.y;


	//Set the position of the bodies center.
	this.p.x = ix;
	this.p.y = iy;

	this.a = this.transform.rotation + parentRot; 

	//Update the position as per chipmunk norm
	cp.Body.prototype.position_func.call( this, dt );


	//Calculate the changes in position
	ix = this.p.x - ix;
	iy = this.p.y - iy;


	//Update the transformation information...
	this.transform.rotation += this.a - ( this.transform.rotation + parentRot );
	this.transform.x += ix * Math.cos( parentRot ) + iy * Math.sin( parentRot );
	this.transform.y += ix * Math.sin( parentRot * -1 ) + iy * Math.cos( parentRot );

};
/**
* 
* @module ChipmunkPhysics
* @submodule Joints
*
*/

/**
* Pivot joints hold two points on two bodies together allowing them to rotate freely around the pivot.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Pivot
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Pivot = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	if( params.pivot ) {
		cp.PivotJoint.call( this, params.a, params.b, params.pivot );
	
	} else {
		params.anchorA = params.anchorA || { x: 0, y: 0 };
		params.anchorB = params.anchorB || { x: 0, y: 0 };

		cp.PivotJoint.call( this, params.a, params.b, params.anchorA, params.anchorB );
	} 

	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Pivot, cp.PivotJoint );



/**
* Pin joints hold a set distance between points on two bodies.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Pin
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Pin = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.anchorA = params.anchorA || { x: 0, y: 0 };
	params.anchorB = params.anchorB || { x: 0, y: 0 };

	cp.PinJoint.call( this, params.a, params.b, params.anchorA, params.anchorB );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Pin, cp.PinJoint );



/**
* Groove joints hold a pivot point on one body to line along a line segment on another like a pin in a groove. 
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Groove
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param params.grooveA {Object} The start point of the groove on the first body.
* 		@param params.grooveA.x {Number} The grooves position on the x-axis 
* 		@param params.grooveA.y {Number} The grooves position on the y-axis
* 	@param params.grooveB {Object} The end point of the groove on the first body.
* 		@param params.grooveB.x {Number} The grooves position on the x-axis
* 		@param params.grooveB.y {Number} The grooves position on the y-axis
* 	@param [params.anchor] {Object} The anchor point on the second body.
* 		@param [params.anchor.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchor.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Groove = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	if( !params.grooveA || !params.grooveB ) {
		console.error('You need to pass both groves.');
		return;
	}

	params.anchor = params.anchor || { x: 0, y: 0 };

	cp.GrooveJoint.call( this, params.a, params.b, params.grooveA, params.grooveB, params.anchor );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The start point of the groove on the first body.
	* @property grv_a
	* @type Object
	* @private
	*/ 	

	/**
	* The end point of the groove on the first body.
	* @property grv_b
	* @type Object
	* @private
	*/ 	

	/**
	* Sets the start point of the groove on the first body.
	* @method setGrooveA
	* @param value {Object}
	* @public
	*/ 	

	/**
	* Sets the end point of the groove on the first body.
	* @method setGrooveB
	* @param value {Object}
	* @public
	*/ 	
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Groove, cp.GrooveJoint );


/**
* Gear joints constrain the rotational speed of one body to another. 
* A ratio of 1.0 will lock the rotation of two bodies together, 
* and negative ratios will cause them to spin in opposite directions.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Gear
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.phase=10] {Number} The angular offset in radians.
* 	@param [params.ratio=1] {Number} The ratio of the rotational speeds.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Gear = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.phase = params.phase || 10;
	params.ratio = params.ratio || 1;

	cp.GearJoint.call( this, params.a, params.b, params.phase, params.ratio );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The angular offset in radians.
	* @property phase
	* @type Number
	* @public
	*/ 

	/**
	* Sets the ratio of the rotational speeds.
	* @method setRatio
	* @param value {Number}
	* @public
	*/ 
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Gear, cp.GearJoint );


/**
* A spring with a damper.
* 
* While a spring is not technically a constraint, the damper is. 
* The spring forces are simply a convenience.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class DampedSpring
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.restLength=10] {Number} The length the spring wants to contract or expand to. 
* 	@param [params.stiffness=1] {Number} The young's modulus of the spring. 
*	@param [params.damping=1] {Number} The amount of viscous damping to apply. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.DampedSpring = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.anchorA = params.anchorA || { x: 0, y: 0 };
	params.anchorB = params.anchorB || { x: 0, y: 0 };
	params.restLength = params.restLength || 100;
	params.stiffness = params.stiffness || 50;
	params.damping = params.damping || 1;

	cp.DampedSpring.call( this, 
		params.a, 
		params.b, 
		params.anchorA,
		params.anchorB,
		params.restLength,
		params.stiffness,
		params.damping );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );

	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	

	/**
	* The length the spring wants to contract or expand to. 
	* @property restLength
	* @type Number
	* @public
	*/

	/**
	* The young's modulus of the spring. 
	* @property stiffness
	* @type Number
	* @public
	*/

	/**
	* The amount of viscous damping to apply. 
	* @property damping
	* @type Number
	* @public
	*/

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.DampedSpring, cp.DampedSpring );


/**
* Like a DampedSpring, but operates in a rotational fashion.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class DampedRotarySpring
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.restAngle=10] {Number} The angular offset the spring attempts to keep between the two bodies. 
* 	@param [params.stiffness=1] {Number} The young's modulus of the spring. 
*	@param [params.damping=1] {Number} The amount of viscous damping to apply. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.DampedRotarySpring = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.restAngle = params.restAngle || 100;
	params.stiffness = params.stiffness || 50;
	params.damping = params.damping || 1;

	cp.DampedRotarySpring.call( this, 
		params.a, 
		params.b, 
		params.restAngle,
		params.stiffness,
		params.damping );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	

	/**
	* The angular offset the spring attempts to keep between the two bodies.
	* @property restAngle
	* @type Number
	* @public
	*/

	/**
	* The young's modulus of the spring. 
	* @property stiffness
	* @type Number
	* @public
	*/

	/**
	* The amount of viscous damping to apply. 
	* @property damping
	* @type Number
	* @public
	*/
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.DampedRotarySpring, cp.DampedRotarySpring );


/**
* Ratchet joints create rotary ratches similar to a socket wrench.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Ratchet
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.phase=10] {Number} The angular offset of the ratchet positions in radians. 
* 	@param [params.ratchet=1] {Number} The angle in radians of each ratchet position. Negative values cause the ratchet to operate in the opposite direction.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Ratchet = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.phase = params.phase || 10;
	params.ratchet = params.ratchet || 1;

	cp.RatchetJoint.call( this, params.a, params.b, params.phase, params.ratchet );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The angular offset of the ratchet positions in radians. 
	* @property phase
	* @type Number
	* @public
	*/ 

	/**
	* The angle in radians of each ratchet position. Negative values cause the ratchet to operate in the opposite direction.
	* @property ratchet
	* @type Number
	* @public
	*/ 

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Ratchet, cp.RatchetJoint );


/**
* Constrains the angle between two bodies.
*
* This joint is often used in conjuction with a separate PivotJoint in order to limit the rotation around the pivot.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class RotaryLimit
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param params.min {Number} The minimum angular delta of the joint in radians. 
* 	@param params.max {Number} The maximum angular delta of the joint in radians.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.RotaryLimit = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	cp.RotaryLimitJoint.call( this, params.a, params.b, params.min, params.max );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The minimum angular delta of the joint in radians. 
	* @property min
	* @type Number
	* @public
	*/ 

	/**
	* The maximum angular delta of the joint in radians.
	* @property max
	* @type Number
	* @public
	*/ 
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.RotaryLimit, cp.RotaryLimitJoint );


/**
* Simple motors make two objects spin relative to each other.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class SimpleMotor
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param params.rate {Number} The relative rotation speed of the two bodies in radians per second.
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.SimpleMotor = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.rate = params.rate;

	cp.SimpleMotor.call( this, params.a, params.b, params.rate );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The relative rotation speed of the two bodies in radians per second.
	* @property rate
	* @type Number
	* @public
	*/ 

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.SimpleMotor, cp.SimpleMotor );


/**
* Simple motors make two objects spin relative to each other.
*
* @namespace Kiwi.Plugins.ChipmunkPhysics.Joints
* @class Slide
* @extends cp.Constraint
* @constructor
* @param params {Object}
* 	@param params.bodyA {Kiwi.Plugins.ChipmunkPhysics.Body} The first physics body that this joint is to be attached to.
* 	@param params.bodyB {Kiwi.Plugins.ChipmunkPhysics.Body} The second physics body that this joint is to be attached to. 
* 	@param [params.anchorA] {Object} The anchor point on the first physics body. 
* 		@param [params.anchorA.x=0] {Number} Location of the anchor point on the x-axis.  
* 		@param [params.anchorA.y=0] {Number} Location of the anchor point on the y-axis.  
* 	@param [params.anchorB] {Object} The anchor point on the second physics body. 
* 		@param [params.anchorB.x=0] {Number} Location of the anchor point on the x-axis.
* 		@param [params.anchorB.y=0] {Number} Location of the anchor point on the y-axis. 
* 	@param [params.min=100] {Number} The minimum allowed distance between anchor points. 
* 	@param [params.max=1] {Number} The maximum allowed distance between anchor points. 
* 	@param [params.maxForce] {Number} 
* 	@param [params.errorBias] {Number} 
* 	@param [params.maxBias] {Number} 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Joints.Slide = function( params ) {

	if( !(params.bodyA || params.a) || !(params.bodyB || params.b) ) {
		console.error('You need to pass two bodies. bodyA & bodyB.');
		return;
	}

	params.a = params.bodyA || params.a;
	params.b = params.bodyB || params.b;

	params.anchorA = params.anchorA || { x: 0, y: 0 };
	params.anchorB = params.anchorB || { x: 0, y: 0 };
	params.max = params.max || 100;
	params.min = params.min || 1;

	cp.SlideJoint.call( this, 
		params.a, 
		params.b, 
		params.anchorA,
		params.anchorB,
		params.min,
		params.max );
	
	Kiwi.Plugins.ChipmunkPhysics.Joints.ParamConstruct.call( this, params );
	
	/**
	* The anchor point on the first body.
	* @property anchr1
	* @type Object
	* @public
	*/ 	

	/**
	* The anchor point on the second body.
	* @property anchr2
	* @type Object
	* @public
	*/ 	
	
	/**
	* The minimum angular delta of the joint in radians. 
	* @property min
	* @type Number
	* @public
	*/ 

	/**
	* The maximum angular delta of the joint in radians.
	* @property max
	* @type Number
	* @public
	*/ 
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Joints.Slide, cp.SlideJoint );


/**
*
* @module ChipmunkPhysics
* @submodule Shapes 
*/

/**
* Circle shape. 
* Good to use for balls, wheels or any other circular collisions.
* Requires a body and radius to function.
* The body will be at the center of circle (unless you pass a offset).
* Technically extends 'cp.CircleShape' but modified it to keep docs nice.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Circle
* @constructor
* @extends cp.Shape
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
* 	@param params.radius {Number} The radius of the circle.
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* 	
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle = function( params ) {

	params = params || {};

	if( !params.offset ) {
		params.offset = { x: 0, y: 0 };
	}

	cp.CircleShape.call( this, params.body, params.radius, params.offset );

	Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct.call( this, params );
	
	/**
	* The type of shape this is.
	* 
	* @property type
	* @type String
	* @default 'circle' 
	* @public
	*/

	/**
	* The radius of this circle.
	* 
	* @property r
	* @type Number 
	* @public
	*/

	/**
	* The offset position of this shape from its attached body's position. 
	* 
	* @property offset
	* @type Object
	* @default {x:0,y:0} 
	* @public
	*/

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Circle, cp.CircleShape );


/**
* Segment or line shape. 
* Good to use for walls, floors, platforms. 
* Requires a body at least to function. You should specify the 'start' and 'end' points of the line. 
* Technically extends 'cp.SegmentShape' but modified it to keep docs nice.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Segment
* @constructor
* @extends cp.Shape
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
* 	@param [params.start] {Object} The starting location of the segment. 
* 		@param [params.start.x=0] {Number} The starting location of the segment on the x-axis.
* 		@param [params.start.y=0] {Number} The starting location of the segment on the y-axis.
* 	@param [params.end] {Object} The end location of the segment. 
* 		@param [params.end.x=0] {Number} The end location of the segment on the x-axis.
* 		@param [params.end.y=0] {Number} The end location of the segment on the y-axis.
* 	@param [params.radius=0] {Number} The radius of the segment.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
*
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment = function( params ) {

	params = params || {};

	if( !params.start ) {
		params.start = { x: 0, y: 0 };
	}

	if( !params.end ) {
		params.end = { x: 0, y: 0 };
	}

	params.r = params.r || 0;

	cp.SegmentShape.call( this, params.body, params.start, params.end, params.r );
	
	Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct.call( this, params );

	/**
	* The type of shape this is.
	* 
	* @property type
	* @type String
	* @default 'segment' 
	* @public
	*/

	/**
	* The radius of the segment.
	* 
	* @property r
	* @type Number 
	* @public
	*/

	/**
	* The starting point of the line segment. 
	* 
	* @property a
	* @type Object
	* @default {x:0,y:0} 
	* @public
	*/

	/**
	* The ending point of the line segment. 
	* 
	* @property b
	* @type Object
	* @default {x:0,y:0} 
	* @public
	*/

	/**
	* Sets the new locations for the line.
	*
	* @method setEndpoints
	* @param a {Object} The new starting location of the segment
	* @param b {Object} The ending location of segment
	*/
};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment, cp.SegmentShape );


/**
* Used to create polygon hitboxes. 
* Polygons have to be convex NOT concave.
* Requires a body and a 1D array of vertice coordinates [x1, y1, x2, y2, e.t.c.] 
* The vertices need to be positioned around the body. 
* Technically extends 'cp.PolyShape' but modified it to keep docs nice.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Poly
* @constructor
* @extends cp.Shape
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
* 	@param params.verts {Array} An single dimensional array of vertices for this poly. E.g. [x1, y1, x2, y2, ... ]
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly = function( params ) {

	params = params || {};

	if( !params.offset ) {
		params.offset = { x: 0, y: 0 };
	}

	cp.PolyShape.call( this, params.body, params.verts, params.offset );

	Kiwi.Plugins.ChipmunkPhysics.Shapes.ParamConstruct.call( this, params );

	/**
	* The type of shape this is.
	* 
	* @property type
	* @type String
	* @default 'poly' 
	* @public
	*/

	/**
	* The vertices of this shape.
	* 
	* @property verts
	* @type Array
	* @public
	*/

	/**
	* Sets the vertices for this shape.
	* 
	* @method setVerts
	* @param verts {Array}
	* @public
	*/

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly, cp.PolyShape );


/**
* Alternaive way of defining a box shaped collision area.
* Requires a body and a Chipmunk Bounding Box. 
* Extends the Poly shape.
* The bounding box needs to be positioned around the body. 
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Box2
* @constructor
* @extends Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
*	@param params.box {Object} The bounding box (Chipmunks @see cp.BB) of the box.
*		@param params.box.l {Number} The coordinate of the left most point. 
*		@param params.box.r {Number} The coordinate of the right most point.
*		@param params.box.t {Number} The coordinate of the top most point.
*		@param params.box.b {Number} The coordinate of the bottom most point.
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* 
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2 = function( params ) {

	params = params || {};

	params.verts = [
		params.box.l, params.box.b,
		params.box.l, params.box.t,
		params.box.r, params.box.t,
		params.box.r, params.box.b,
	];

	Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly.call( this, params );

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2, Kiwi.Plugins.ChipmunkPhysics.Shapes.Poly );


/**
* Quick way to create a box based collision area. 
* Requires a body, width and height. 
* Since the body is positioned at the center of the box.
* Extends the Box2 shape which extends Poly.
* The box will be around the bodies position.
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics.Shapes
* @class Box
* @constructor
* @extends Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2
* @param params {Object} Parameters required by this object to function.
* 	@param params.body {Kiwi.Plugins.ChipmunkPhysics.Body} The body that this shape is attached to.
*	@param params.width {Number} The width of the shape.
*	@param params.height {Number} The height of the shape.
* 	@param [params.offset] {Object} The offset of this shape from the body. 
* 		@param [params.offset.x=0] {Number} The offset of this shape on the x-axis.
* 		@param [params.offset.y=0] {Number} The offset of this shape on the y-axis.
* 	@param [params.elasticity] {Number} Elasticity of the shape.
* 	@param [params.friction] {Number} Friction this shape has.
* 	@param [params.layers] {Number} The layers that this shape is a part of.
* 	@param [params.sensor] {Boolean}
*	@param [params.collisionType] {Number} The collision type of this shape. Used with collision handler methods. 
* @public
* 
*/
Kiwi.Plugins.ChipmunkPhysics.Shapes.Box = function( params ) {

	params = params || {};

	var hw = params.width / 2;
	var hh = params.height / 2;
	params.box = new cp.BB( -hw, -hh, hw, hh );

	Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2.call( this, params );

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Shapes.Box, Kiwi.Plugins.ChipmunkPhysics.Shapes.Box2 );

/**
*
* @module Plugins
* @submodule ChipmunkPhysics
*
*/

/**
* An extended version of the Chipmunk Space class.
* This has only been extended to add some nice getters/setters to make it function more Kiwi like :)
* 
* @namespace Kiwi.Plugins.ChipmunkPhysics
* @class Space
* @extends cp.Space
* @constructor
* @param [params] {Object}
*	@param [params.gravity] {Object}
*		@param [params.gravity.x] {Number}
*		@param [params.gravity.y] {Number}
*	@param [params.damping] {Number}
*	@param [params.iterations] {Number}
*	@param [params.collisionSlop] {Number}
*	@param [params.collisionBias] {Number}
*	@param [params.collisionPersistence] {Number}
*	@param [params.idleSpeedThreshold] {Number}
*
*/
Kiwi.Plugins.ChipmunkPhysics.Space = function( params ) {

	cp.Space.call(this);

	params = params || {};

	if( params.gravity ) {
		this.gravity = params.gravity;
	}

	if( params.damping ) {
		this.damping = params.damping;
	}

	if( params.iterations ) {
		this.iterations = params.iterations;
	}

	if( params.collisionSlop ) {
		this.collisionSlop = params.collisionSlop;
	}

	if( params.collisionBias ) {
		this.collisionBias = params.collisionBias;
	}

	if( params.collisionPersistence ) {
		this.collisionPersistence = params.collisionPersistence;
	}

	if( params.idleSpeedThreshold ) {
		this.idleSpeedThreshold = params.idleSpeedThreshold;
	}

};

Kiwi.extend( Kiwi.Plugins.ChipmunkPhysics.Space, cp.Space );


/**
* Gravity to pass to rigid bodies when integrating velocity on the x-axis.
* 
* @property gravityX
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Space.prototype, 'gravityX', {

	get: function () {
		return this.gravity.x;
	},

	set: function ( val ) {
		this.gravity = { 
			x: val, 
			y: this.gravity.y 
		};
	},

	enumerable: true,
	configurable: true

});


/**
* Gravity to pass to rigid bodies when integrating velocity on the y-axis.
* 
* @property gravityY
* @type Number
* @public
*/
Object.defineProperty( Kiwi.Plugins.ChipmunkPhysics.Space.prototype, 'gravityY', {

	get: function () {
		return this.gravity.y;
	},

	set: function ( val ) {
		this.gravity = { 
			x: this.gravity.x, 
			y: val
		};
	},

	enumerable: true,
	configurable: true

});
