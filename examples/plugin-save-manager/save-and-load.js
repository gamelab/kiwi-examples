var state = new Kiwi.State( "Play" );

state.preload = function () {
	this.addImage( "object", "./assets/img/anime/gem-fire.png" );
};

state.create = function () {
	var text = new Kiwi.GameObjects.Textfield(
		this, "Click/Touch to add a Object!", this.game.stage.width / 2, 10,
		"#000", 12);
	var text2 = new Kiwi.GameObjects.Textfield(
		this, "Close and reopen the browser to see all of the your objects still there!", this.game.stage.width / 2, 30,
		"#000", 12);

	text.textAlign = "center";
	text2.textAlign = "center";

	this.addChild(text);
	this.addChild(text2);

	// Create an array of objects
	this.objects = [];
	this.objectData = [];

	if ( this.game.saveManager.localStorage.exists( "objects" ) ) {

		// Get the data
		this.objectData =
			this.game.saveManager.localStorage.getData( "objects" );

		// Create each jeep
		for ( var i = 0; i < this.objectData.length; i++ ) {
			this.createObject(
				this.objectData[ i ].x, this.objectData[ i ].y, false );
		}

	// Create default state
	} else {
		this.game.saveManager.localStorage.add( "objects", [], true );
		this.createObject( 0, 0, true );
	}

	// Add Event
	this.game.input.onUp.add( this.newObject, this );
};

state.newObject = function( x, y, timeup, timedown, duration, pointer ) {

	var overlap = false;
	for ( var i = 0; i < this.objects.length; i++ ) {

		//If it overlaps then remove the object
		if ( Kiwi.Geom.Intersect.circleToRectangle(
				pointer.circle, this.objects[ i ].box.hitbox ).result ) {
			overlap = true;
			this.removeChild( this.objects[ i ] );
			this.objects.splice( i, 1 );
			this.objectData.splice( i, 1 );
			this.game.saveManager.localStorage.edit(
				"objects", this.objectData, true );
			i--;
		}

	}

	// If no overlaps create a object 
	if ( overlap === false ) {
		this.createObject( x, y, true );
	}
};

// Creates a new object and then updates localStorage.
state.createObject = function( x, y, save ) {
	var p = new Kiwi.GameObjects.Sprite(
			this, this.textures.object, x, y, false );
	this.addChild(p);


	if ( save ) {
		this.objectData.push( { x: x, y: y } );
		this.game.saveManager.localStorage.add(
			"objects", this.objectData, true );
	}

	this.objects.push(p);
};

var gameOptions = {
	width: 768,
	height: 512,
	plugins: [ "SaveGame" ]
};

var game = new Kiwi.Game(
		"game-container", "Save and Load", state, gameOptions );
