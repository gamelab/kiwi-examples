
//Our custom physics gameobject.
var PhysicsGO = function(state, textureName, x, y, config) {


	Kiwi.GameObjects.StaticImage.call(this, state, state.textures[textureName], x, y);

	this.physics = this.components.add( new Kiwi.Plugins.ChipmunkPhysics.Component( this, config ) );
	
}

Kiwi.extend( PhysicsGO, Kiwi.GameObjects.StaticImage );


var State = new Kiwi.State('GameState');

//Large Preload to load all of the assets in. Would definately be better to use a texture atlas.
State.preload = function() {


	//kiwi.js
	this.addImage('k', './assets/img/logo/k.png');
	this.addImage('i', './assets/img/logo/i.png');
	this.addImage('w', './assets/img/logo/w.png');
	this.addImage('dot', './assets/img/logo/dot.png');
	this.addImage('j', './assets/img/logo/j.png');
	this.addImage('s', './assets/img/logo/s.png');
	this.addImage('underline', './assets/img/logo/underline.png');


	//Logo
	this.addImage('bomb', './assets/img/logo/bomb.png');
	this.addImage('castle', './assets/img/logo/castle.png');
	this.addImage('controller-1', './assets/img/logo/controller-1.png');
	this.addImage('controller-2-left', './assets/img/logo/controller-2-left.png');
	this.addImage('controller-2-right', './assets/img/logo/controller-2-right.png');
	this.addImage('crown', './assets/img/logo/crown.png');

	this.addImage('fingers', './assets/img/logo/fingers.png');

	this.addImage('heart-1', './assets/img/logo/heart.png');
	this.addImage('heart-2', './assets/img/logo/heart-2.png');
	this.addImage('jigsaw-1', './assets/img/logo/jigsaw.png');
	this.addImage('jigsaw-2', './assets/img/logo/jigsaw-2.png');

	this.addImage('key', './assets/img/logo/key.png');

	this.addImage('lighting-1-left', './assets/img/logo/lighting-bolt-left.png');
	this.addImage('lighting-1-right', './assets/img/logo/lighting-bolt-right.png');
	this.addImage('lighting-2-left', './assets/img/logo/lighting-bolt-2-left.png');
	this.addImage('lighting-2-right', './assets/img/logo/lighting-bolt-2-right.png');
	this.addImage('lighting-3', './assets/img/logo/lighting-bolt-3.png');

	this.addImage('mouse', './assets/img/logo/mouse.png');
	this.addImage('pacman', './assets/img/logo/pacman.png');
	this.addImage('rocket', './assets/img/logo/rocket.png');
	this.addImage('shield', './assets/img/logo/shield.png');
	this.addImage('spade', './assets/img/logo/spade.png');
	this.addImage('speech', './assets/img/logo/speech-bubble.png');

	this.addImage('sword', './assets/img/logo/sword.png');
	this.addImage('sword-2-left', './assets/img/logo/sword-2-left.png');
	this.addImage('sword-2-right', './assets/img/logo/sword-2-right.png');

}


State.create = function() {

	this.toggleDebug();

	//Create the kiwi 
	this.createKiwi();


	
	//TODO: Sexier way to add?
	this.space = this.game.chipmunk.space;


	this.floor =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody, 
		start: { 
			x: 0,
			y: this.game.stage.height
		}, 
		end: {
			x: this.game.stage.width, 
			y: this.game.stage.height
		},
		elasticity: 0.8,
		friction: 1
	});
	this.space.addShape( this.floor );


	this.leftWall =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody, 
		start: { 
			x: 0,
			y: 0
		}, 
		end: {
			x: 0, 
			y: this.game.stage.height
		},
		elasticity: 0.8,
		friction: 1
	});
	this.space.addShape( this.leftWall );


	this.rightWall =  new Kiwi.Plugins.ChipmunkPhysics.Shapes.Segment( {
		body: this.space.staticBody, 
		start: { 
			x: this.game.stage.width,
			y: 0
		}, 
		end: {
			x: this.game.stage.width, 
			y: this.game.stage.height
		},
		elasticity: 0.8,
		friction: 1
	});
	this.space.addShape( this.rightWall )

	

	var self = this;
	//The box which the user needs to click in to apply gravity
	var clickBox = new Kiwi.Geom.Rectangle(
		100, 
		50, 
		this.game.stage.width - 150, 
		this.game.stage.height - 100);
	
	//Mouse event to enable gravity when the user releases the mouse within the boundaries of the screen.
	//This event will fire before the 'onUp' event below (due to use setting its priority level higher)
	// So we can then not enable gravity if the user is dragging an item.
	this.game.input.onUp.add( function( x, y ) {
		
		if( !this.mouseJoint && clickBox.contains(x, y) ) {
			self.space.gravityY = 400;
		}

	}, this, 2 );
	
	//Add mouse events for press/release. 
	//These control the dragging of shapes.
	this.game.input.onUp.add( this.released, this, 1 );
	this.game.input.onDown.add( this.pressed, this );

	//Variables used to control the dragging of shapes. 
	this.mouseJoint = null;
	this.mousePointVector = { x: 0, y: 0 };

	//We don't want the body we use for the mouse to be affected by gravity,
	// so we will not add it to space.
	this.mouseBody = new Kiwi.Plugins.ChipmunkPhysics.Body( {
		i: Infinity,
		mass: Infinity
	} ); 
}

//Fired when the mouse is released.
//Updates the mouse vector position and removes the mouseJoint if it exists.
State.released = function(x,y) {
	this.updateMouseVector();
	if( this.mouseJoint ) {
		this.space.removeConstraint(this.mouseJoint);
		this.mouseJoint = null;		
	}
};

//Fired when the mouse is pressed.
State.pressed = function(x,y) {
	//Updates the mouse vector position
	this.updateMouseVector();

	//Query space to see if a shape exists at the location of the mouse
	var shape = this.space.pointQueryFirst( this.mousePointVector, -1 );

	//If one does 
	if(shape) {
		//Get the shapes body
		var body = shape.body;
		
		//Calculate the difference between the mouse position and the bodies centeral point.
		//We will use this for the anchor position of the pivot joint.
		var sp = body.world2Local( this.mousePointVector );

		//Create the pivot joint.
		this.mouseJoint = new Kiwi.Plugins.ChipmunkPhysics.Joints.Pivot({
			bodyA: this.mouseBody,
			bodyB: body,
			anchorB: sp,
			maxForce: 50000
		});
		//Start the simulation.
		this.space.addConstraint( this.mouseJoint );
	}
};

//Updates the mouse point vector to the position of the mouse
State.updateMouseVector = function() {
	this.mousePointVector.x = this.game.input.mouse.cursor.point.x;
	this.mousePointVector.y = this.game.input.mouse.cursor.point.y;
};


//Executed each frame.
State.update = function() {
	Kiwi.State.prototype.update.call( this );

	//Update mouse vector
	this.updateMouseVector();

	//Set the bodies position to the mouse point vector
	this.mouseBody.x = this.mousePointVector.x;
	this.mouseBody.y = this.mousePointVector.y;

};


//Create the kiwijs gameobjects. 
State.createKiwi = function() {

	// Note: With Polygons you have to make sure that they are convex not concave.
	// Also whilst creating make sure to create them in an anti-clockwise direction

	var x = 390;
	var y = 270;

	//Kiwi JS
	this.createObj('k', x, y, {
		type: 'poly',
		body: {
			verts: [20, -20, -20, -20, -20, 24, 20, 24]
		}
	});
	this.createObj('i', x + 44, y, {
		type: 'poly',
		body: {
			verts: [5, -20, -5, -20, -5, 24, 5, 24]
		}
	});
	this.createObj('w', x + 63, y, {
		type: 'poly',
		body: {
			verts: [28, -20, -28, -20, -18, 24, 18, 24]
		}
	});
	this.createObj('i', x + 122, y, {
		type: 'poly',
		body: {
			verts: [5, -20, -5, -20, -5, 24, 5, 24]
		}
	});
	this.createObj('dot', x + 138, y + 39,  {
		type: 'poly',
		body: {
			verts: [5, -5, -5, -5, -5, 5, 5, 5]
		}
	});
	this.createObj('j', x + 150, y,  {
		type: 'poly',
		body: {
		verts: [8, -20, 0, -20, -20, 17, -13, 25, 7, 24],
			center: {
				x: 32,
				y: 35
			}
		}
	});
	this.createObj('s', x + 180, y,  {
		type: 'poly',
		body: {
			verts: [18, -18, 0, -24, -14, -20, -14, 18, 0, 24, 18, 18]
		}
	});
	this.createObj('underline', x - 3, y + 57, {
		type: 'poly',
		body: {
			verts: [110, -5, -105, -5, -105, 5, 110, 5]
		}
	});

	var x = 230;
	var y = 75;
 
	//The Kiwi Head
	this.createObj('mouse', x + 118, y + 0,  {
		type: 'poly',
		body: {
			verts: [25, -23, -13, -7, -30, 5, -20, 22, -5, 22, 12, 4]
		}
	});
	this.createObj('controller-1', x + 168, y + 5, {
		type: 'poly',
		body: {
			verts: [22, -10, -11, -18, -27, 3, 28, 15]
		}
	});
	this.createObj('heart-1', x + 158, y + 32, {
		type: 'poly',
		body: {
			verts: [20, -18, 0, -20, -18, -16, -17, 5, 2, 20, 10, 15, 20, 5]
		}
	});
	this.createObj('lighting-1-left', x + 218, y + 18, {
		type: 'poly',
		body: {
			verts: [-5, 20, 0, 10, -15, 0]
		}
	});
	this.createObj('lighting-1-right', x + 218, y + 18, {
		type: 'poly',
		body: {
			verts: [15, 18, 0, -20, 3, 13]
		}
	});
	this.createObj('sword', x + 200, y + 60, {
		type: 'poly',
		body: {
			verts: [-10, -50, -45, -60, -55, -50, -50, -15, 47, 48]
		}
	});
	this.createObj('jigsaw-1', x + 150, y + 80, {
		type: 'poly',
		body: {
			verts: [6, -25, -26, 0, -5, 22, 25, 10, 25, -18]
		}
	});
	this.createObj('shield', x + 105, y + 40, {
		type: 'poly',
		body: {
			verts: [12, -24, -28, -30, -32, 8, -24, 32, 14, 24, 33, 5]
		}
	});

	//The Kiwi Body
	this.createObj('crown', x + 35, y + 70, {
		type: 'poly',
		body: {
			verts: [29, -26, -34, -8, -25, 27, 34, 14]
		}
	});
	
	
	this.createObj('controller-2-left', x + 26, y + 112, {
		type: 'poly',
		body: {
			verts: [25, -30, -30, -10, -25, 30, 5, 40, 35, 20]
		}
	}); 
	this.createObj('controller-2-right', x + 87, y + 112, {
		type: 'poly',
		body: {
			verts: [-22, 15, 10, 23, 35, 10, 35, -20, 10, -40, -35, -30]
		}
	});
	this.createObj('lighting-2-left', x + 105, y + 175, {
		type: 'poly',
		body: {
			verts: [7, -10, -3, -17, -23, 26]
		}
	}); 
	this.createObj('lighting-2-right', x + 105, y + 175, {
		type: 'poly',
		body: {
			verts: [23, -20, 6, -5, 8, 14]
		}
	}); 
	this.createObj('key', x + 68, y + 175, {
		type: 'poly',
		body: {
			verts: [19, -30, 5, -25, -23, 26, -19, 32, -11, 32, 20, -15]
		}
	});
	this.createObj('sword-2-left', x + 50, y + 205, {
		type: 'poly',
		body: {
			verts: [0, 0, -40, 15, -38, 40, 3, 29]
		}
	});
	this.createObj('sword-2-right', x + 50, y + 205, {
		type: 'poly',
		body: {
			verts: [35, -35, 5, 5, 10, 20, 30, 0]
		}
	});
	this.createObj('castle', x + 32, y + 198, {
		type: 'poly',
		body: {
			verts: [20, -20, -10, -25, -17, 24, 10, 26]
		}
	}); 
	this.createObj('spade', x + 7, y + 180, {
		type: 'poly',
		body: {
			verts: [13, 5, -0, -18, -15, 4, -8, 15, 8, 16]
		}
	});
	this.createObj('bomb', x - 25, y + 132, {
		type: 'poly',
		body: {
			verts: [20, -20, -20, -10, -25, 17, -15, 25, 5, 25, 17, 10]
		}
	});
	this.createObj('speech', x - 18, y + 92, {
		type: 'poly',
		body: {
			verts: [20, -25, -26, -13, -17, 20, 25, 6]
		}
	});
	this.createObj('jigsaw-2', x - 60, y + 105, {
		type: 'poly',
		body: {
			verts: [12, -20, -20, 0, 0, 25, 25, 12]
		}
	});
	this.createObj('rocket', x - 80, y + 136,{
		type: 'poly',
		body: {
			verts: [40, 15, -25, -63, -38, 35, 10, 65]
		}
	});
	this.createObj('fingers', x - 20, y + 220, {
		type: 'poly',
		body: {
			verts: [14, -38, -15, -32, -30, 20, -25, 35, 15, 35, 30, 15]
		}
	});
	this.createObj('pacman', x - 45, y + 270, {
		type: 'circle',
		body: {
			radius: 10
		}
	});
	this.createObj('heart-2', x - 69, y + 257, {
		type: 'circle',
		body: {
			radius: 10
		}
	});
	this.createObj('lighting-3', x - 100, y + 145, {
		type: 'poly',
		body: {
			verts: [13, -55, -15, 7, -0, 55]
		}
	});


}

// Handles the needed steps to create a singular physics gameobject 
// and attach it to the game.
State.createObj = function(texture, x, y, config) {

	config.shape = config.shape || {};
	
	//Set the elasticity of the objects
	config.shape.elasticity = 0.8;
	config.shape.friction = 0.5;
	

	var obj = new PhysicsGO(this, texture, x, y, config);
	this.addChild(obj);
}

//Handles toggling the debug overlay on top of the game.
State.toggleDebug = function() {

	//Initialise the physics debugger
	this.game.chipmunkDebug.init();	

	//Hide the debug canvas by default
	this.game.stage.toggleDebugCanvas();

	//Create a hud button and add it.
	var button = new Kiwi.HUD.Widget.Button( this.game, 'Toggle Debug', 5, 5 );
	button.class = 'toggle-debug';
	this.game.huds.defaultHUD.addWidget( button );

	//When pressed execute the toggleDebugCanvas method on the stage.
	button.input.onUp.add( this.game.stage.toggleDebugCanvas, this.game.stage );

};


var gameoptions = {
	width: 700,
	height: 550,
	plugins: ['ChipmunkPhysics', 'ChipmunkPhysicsDebug']
};


var game = new Kiwi.Game('game-container', 'KiwimunkPhysics', State, gameoptions);
