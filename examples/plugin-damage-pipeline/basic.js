/**
* How to build a Damage Pipeline
*
* This example demonstrates a functional damage pipeline
* via an interactive scene.
*
* Click the buttons to send damage signals to the target.
*
* Key functions have been commented for edification.
*/


var gameOptions = {
		plugins: [ "DamagePipeline", "Primitives" ],
		width: 800,
		height: 230
	},
	MyGame = {};

MyGame.game = new Kiwi.Game( 'game-container', "Damage Pipeline", null, gameOptions );

MyGame.state = new Kiwi.State( "state" );

MyGame.state.preload = function() {
	Kiwi.State.prototype.preload.call( this );
};

MyGame.state.create = function() {
	console.log( "Test-002" );

	this.buildStatusDisplay();

	this.buildAttackButtons();

	this.pipeline = this.createPipeline( this.bar, this.stunBar );

	Kiwi.State.prototype.create.call( this );

	this.game.stage.color = "eeeeee";
};

MyGame.state.update = function() {

	Kiwi.State.prototype.update.call( this );
	console.log( "Test-003" );

	// Decay stun meter
	this.pipeline.receive( new Kiwi.Plugins.DamagePipeline.Pack( {
		value: 1,
		tags: "STUN"
	}));
};


/**
* Constructs and labels various attack buttons
*
* Button 1 does 5 physical damage, with a rider of 50 poison damage.
*	All physical damage is absorbed by physical armor.
*	When it is discarded, the poison damage goes with it.
*
* Button 2 does 50 physical damage, with a rider of 5 poison damage.
*	Only some physical damage is absorbed by physical armor.
*	The poison damage makes it through, but is absorbed by poison armor.
*	This illustrates the nature of subpacks.
*
* Button 3 applies healing.
*	This illustrates the ability to use ADD mode packs.
*
* All three buttons also create temporary stun.
*	This illustrates SET mode packs.
*/
MyGame.state.buildAttackButtons = function() {

	// Add attack buttons
	this.attackButton1 = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 150,
		height: 30,
		color: [ 0.8, 0.8, 0.8 ],
		drawStroke: true,
		x: 120,
		y: 180,
		enableInput: true
	} );
	this.attackButton1Text = new Kiwi.GameObjects.Textfield( this,
		"5 Physical + 50 Poison",
		130, 190, "#000", 12 );
	this.attackButton1.input.onDown.add( (function( event ) {
		this.pipeline.receive( this.createDaggerPack( {
			physical: 5,
			poison: 50
		}));
	}).bind( this ) );

	this.attackButton2 = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 150,
		height: 30,
		color: [ 0.8, 0.8, 0.8 ],
		drawStroke: true,
		x: 320,
		y: 180,
		enableInput: true
	} );
	this.attackButton2Text = new Kiwi.GameObjects.Textfield( this,
		"50 Physical + 5 Poison",
		330, 190, "#000", 12 );
	this.attackButton2.input.onDown.add( (function( event ) {
		this.pipeline.receive( this.createDaggerPack( {
			physical: 50,
			poison: 5
		}));
	}).bind( this ) );

	this.attackButton3 = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 150,
		height: 30,
		color: [ 0.8, 0.8, 0.8 ],
		drawStroke: true,
		x: 520,
		y: 180,
		enableInput: true
	} );
	this.attackButton3Text = new Kiwi.GameObjects.Textfield( this,
		"Heal 20",
		570, 190, "#000", 12 );
	this.attackButton3.input.onDown.add( (function( event ) {
		this.pipeline.receive( this.createHealPack() );
	}).bind( this ) );

	this.addChild( this.attackButton1 );
	this.addChild( this.attackButton1Text );
	this.addChild( this.attackButton2 );
	this.addChild( this.attackButton2Text );
	this.addChild( this.attackButton3 );
	this.addChild( this.attackButton3Text );
};


/**
* Creates health bars and status display fields
*/
MyGame.state.buildStatusDisplay = function() {
	this.bar = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 600,
		height: 25,
		drawStroke: false,
		color: [ 0.9, 0.1, 0.1 ],
		x: 100,
		y: 30,
		anchorPointX: 0
	} );
	this.barShadow = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 602,
		height: 27,
		drawStroke: false,
		color: [ 0.8, 0.8, 0.8 ],
		x: 100,
		y: 30,
		anchorPointX: 0
	} );

	this.stunBar = new Kiwi.Plugins.Primitives.Rectangle( {
		state: this,
		width: 600,
		height: 10,
		drawStroke: false,
		color: [ 0.7, 0.8, 0.9 ],
		x: 100,
		y: 60,
		anchorPointX: 0,
		scaleX: 0
	} );

	this.textBar = new Kiwi.GameObjects.Textfield( this,
		"Health Max 100, 10 Armor (Physical), 10 Armor (Poison)",
		this.game.stage.width / 2, 10, "#000", 12 );
	this.textBar.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	this.textStatus = new Kiwi.GameObjects.Textfield( this,
		"100 Fine",
		120, 80, "#000", 16 );

	this.textStunStatus = new Kiwi.GameObjects.Textfield( this,
		"0 Stun",
		120, 100, "#000", 16 );

	this.textNotify = new Kiwi.GameObjects.Textfield( this,
		"",
		320, 80, "#000", 16 );

	this.textDamage = new Kiwi.GameObjects.Textfield( this,
		"Click buttons to do damage",
		this.game.stage.width / 2, 150, "#000", 12 );
	this.textDamage.textAlign = Kiwi.GameObjects.Textfield.TEXT_ALIGN_CENTER;

	this.addChild( this.barShadow );
	this.addChild( this.bar );
	this.addChild( this.textBar );
	this.addChild( this.stunBar );
	this.addChild( this.textStatus );
	this.addChild( this.textStunStatus );
	this.addChild( this.textNotify );
	this.addChild( this.textDamage );
};


MyGame.state.createDaggerPack = function( params ) {

	// Create some damage objects
	var damagePoison = new Kiwi.Plugins.DamagePipeline.Pack( {
			value: params ? params.poison || 60 : 60,
			tags: "POISON",
		}),
		damageStun = new Kiwi.Plugins.DamagePipeline.Pack( {
			value: params ? params.stun || 50 : 50,
			tags: "STUN",
			mode: "SET"
		}),
		damageDagger = new Kiwi.Plugins.DamagePipeline.Pack( {
			value: params ? params.physical || 5 : 5,
			tags: "PHYSICAL",
			subPacks: [ damagePoison, damageStun ]
		});

	return damageDagger;
};


MyGame.state.createHealPack = function( params ) {

	// Create some damage objects
	var stun = new Kiwi.Plugins.DamagePipeline.Pack( {
			value: params ? params.stun || 20 : 20,
			tags: "STUN",
			mode: "SET"
		}),
		heal = new Kiwi.Plugins.DamagePipeline.Pack( {
			value: params ? params.heal || 20 : 20,
			tags: "HOLY",
			mode: "ADD",
			subPacks: stun
		});

	return heal;
};

/**
* Returns the top node of a damage pipeline.
*
* The pipeline looks like this:
*
*	nodeStunChecker
*		|
*		V
*	nodePhysicalArmor
*		|
*		V
*	nodePoisonArmor
*		|
*		V
*	nodeStunSplitter
*		|---------------|
*		v				V
*	healthMeter		stunMeter
*
* Stun Checker will only pass damage if the stun meter is empty.
* This prevents rapid-fire damage from quickly shredding health.
* It still admits STUN packs, so as to cause stun decay.
*
* Physical and Poison Armor reduce damage. This is key to understanding
* subpacks. Our damage is set up to have a main physical pack, plus
* a poison subpack. In other words, if the dagger scratches your skin,
* you get poisoned. If all the damage from the dagger is prevented,
* the poison does not carry over. The inverse is not true;
* if the poison is nullified it has no effect on the physical damage.
*
* Stun Splitter redirects STUN packs to the Stun Meter.
*
* The Health Meter is a default meter. The only customisation
* here is a link to the health bar, and this could easily
* be done elsewhere.
*
* The Stun Meter is likewise a default meter customised to update
* its GUI element. The game update loop sends it a stream of tiny
* reduction packs, so it naturally decays over time.
*/
MyGame.state.createPipeline = function( bar, stunBar ) {
	var nodePhysicalArmor = new Kiwi.Plugins.DamagePipeline.PipelineNode( {
			name: "Physical Armor",
			tags: "PHYSICAL",
			operation: function( pack ) {
				pack.value -= 10;
			}
		}),
		nodePoisonArmor = new Kiwi.Plugins.DamagePipeline.PipelineNode( {
			name: "Poison Armor",
			tags: "POISON",
			operation: function( pack ) {
				pack.value -= 10;
			}
		}),
		healthMeter = new Kiwi.Plugins.DamagePipeline.MeterNode( {
			name: "Health Meter",
			doOnReceive: function( pack ) {

				// doOnReceive contains the default functionality of 
				// applying the packs damage which we do want to override.
				// If you did not call the super you would have to add
				// your own meter management algorthim
				Kiwi.Plugins.DamagePipeline.MeterNode.
					prototype.doOnReceive.call ( this, pack );

				var tween = MyGame.game.tweens.create( bar );
				tween.to( { scaleX: this.valueNormalized }, 500,
					Kiwi.Animations.Tweens.Easing.Sinusoidal.Out, true );
				tween.start();

				MyGame.state.textStatus.text = this.value + " Ouch";
			},
			doOnMax: function( pack ) {
				MyGame.state.textStatus.text = this.value + " Fine";
			},
			doOnOverflow: function( pack ) {
				MyGame.state.textStatus.text = this.value + " Fine";
			},
			doOnBreak: function( pack ) {
				MyGame.state.textStatus.text = this.value + " KO";
			},
			doOnZero: function( pack ) {
				MyGame.state.textStatus.text = this.value + " KO";
			}
		}),
		nodeStunSplitter = new Kiwi.Plugins.DamagePipeline.PipelineNode( {
			name: "Stun Splitter",
			tags: "STUN",
			processTopDown: true,
			operation: function( pack ) {
				this.dispatch( pack, this.getChildByName( "Stun Meter") );
			}
		}),
		stunMeter = new Kiwi.Plugins.DamagePipeline.MeterNode( {
			name: "Stun Meter",
			tags: "STUN",
			value: 0,
			doOnReceive: function( pack ) {
				Kiwi.Plugins.DamagePipeline.MeterNode.
					prototype.doOnReceive.call ( this, pack );

				var tween = MyGame.game.tweens.create( stunBar );
				tween.to( { scaleX: this.valueNormalized }, 100,
					Kiwi.Animations.Tweens.Easing.Sinusoidal.Out, true );
				tween.start();

				MyGame.state.textStunStatus.text = this.value + " Stun";
			}
		}),
		nodeStunChecker = new Kiwi.Plugins.DamagePipeline.PipelineNode( {
			name: "Stun Checker",
			operation: function( pack ) {
				if ( stunMeter.value > 0 && !pack.hasTag( "STUN" ) ) {
					this.extractPack( pack );
				}
			}
		})
		;

	nodePhysicalArmor.onExhaust.add( (function() {
				this.notify( "Physical damage nullified!" );
			}).bind( this ) );
	nodePoisonArmor.onExhaust.add( (function() {
				this.notify( "Poison damage nullified!" );
			}).bind( this ) );

	nodeStunChecker.addChild( nodePhysicalArmor );
	nodePhysicalArmor.addChild( nodePoisonArmor );
	nodePoisonArmor.addChild( nodeStunSplitter );
	nodeStunSplitter.addChild( healthMeter );
	nodeStunSplitter.addChild( stunMeter );

	return nodeStunChecker;
};


/**
* Prints a temporary notification message
*/
MyGame.state.notify = function( string ) {
	this.textNotify.text = string;
	this.textNotify.alpha = 1;

	// Fade out notification text
	var tween = this.game.tweens.create( this.textNotify );
	tween.to( { alpha: 0 }, 3000,
		Kiwi.Animations.Tweens.Easing.Sinusoidal.Out, true );
	tween.start();
};


console.log( "Test-001" );
MyGame.game.states.addState( MyGame.state );
MyGame.game.states.switchState( "state" );
