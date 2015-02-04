// var state = new Kiwi.State('Play');


//Create the state that we are going to use for this game.
var LoginState = new Kiwi.State("LoginState");
	

//On the States initialisiation (first time the state is switched to).
LoginState.init = function() {

	//Initalise the facebook SDK
	this.game.social.facebook.init( {

		//You should use your own appId here...
		appId: 'XXXXXXXXXXXXXXXXXXXXX'
	
	} );

};


//Preload any assets that we are going to use...
LoginState.preload = function() {

	//Load in the login button.
	this.addSpriteSheet( 'login', './assets/img/plugins/social-connect/login-with-facebook.png', 396, 146 );


};


//Once asset loading has completed
LoginState.create = function() {	


	//Nice Text to display at the top.
	this.statusText = new Kiwi.GameObjects.Textfield(this, '');
	this.statusText.x = this.game.stage.width * 0.5;
	this.statusText.y = 10;
	this.statusText.textAlign = 'center';
	this.statusText.fontSize = 12;
	this.addChild( this.statusText );


	//Create the facebook login button. 
	this.facebookLoginButton = new Kiwi.GameObjects.StaticImage( this, this.textures.login );
	this.facebookLoginButton.x = ( this.game.stage.width - this.facebookLoginButton.width ) * 0.5;
	this.facebookLoginButton.y = this.game.stage.height - this.facebookLoginButton.height - 10;
	this.addChild( this.facebookLoginButton );


	//Hide the button until we know if the user is logged in or not.
	this.facebookLoginButton.visible = false;


	//Check to see if the facebook API is ready to use.
	if( this.game.social.facebook.ready ) {

		//Check to see if we are logged in with facebook or not.
		this.game.social.facebook.loginApproved( {
			callback: this.updateLoginStatus,
			context: this
		} );

		this.awaitingLoad = false;

	} else {

		//It is not, so wait for to finish loading first.
		this.awaitingLoad = true;
	
	}


	//Add the click event
	this.game.input.onUp.add( this.processInput, this );
	
};


//Each frame check to see if facebook API has finished loading or not.
LoginState.update = function() {

	Kiwi.State.prototype.update.call( this );

	//If it has finished loading, then get the users login status.
	if( this.awaitingLoad && this.game.social.facebook.ready ) {
		
		//If it has, then get the login status.
		this.game.social.facebook.loginApproved( {
			callback: this.updateLoginStatus,
			context: this
		} );

		this.awaitingLoad = false;
	}

};


//When we recieve a status about the users login.
//This function is used as a callback for the 'loginApproved' / 'login' functions. 
LoginState.updateLoginStatus = function( loggedIn ) {

	//Has the user successfully logged in
	if( loggedIn ) {

		//Check if the user have the permissions we need...
		this.game.social.facebook.hasPermissions( {
			permissions: ['public_profile', 'email', 'user_friends'],
			context: this,
			callback: this.permissionsRecieved
		} );

	} else {

		this.statusText.text = 'Login to see your Facebook Information.';

		//No, so display the login button
		this.facebookLoginButton.visible = true;
		this.facebookLoginButton.cellIndex = 0;

	}

};


//Executed when we initially detect a user is logged in.
// Used to see if the user has accepted all of our permissions or not. 
LoginState.permissionsRecieved = function( match ){

	if( match ) {
		
		//Update the status text..
		this.statusText.text = 'Logging you in.';


		//Load the users facebook information
		this.game.social.facebook.me( {
			fields: 'first_name, last_name',
			autoLoadPicture: true
		} );

		//And load in the users facebook image.
		this.game.social.facebook.myImage( {
			pictureKey: 'currentUsersProfileImage',
			width: 100,
			height: 100,
			callback: this.userDetailsLoaded, 
			context: this
		} );

	} else {

		//The user has not accepted all of the permissions
		this.statusText.text = 'Login and accept all the permissions, to continue.';

		//No, so display the login button
		this.facebookLoginButton.visible = true;
		this.facebookLoginButton.cellIndex = 0;

	}

};


//When the users details have been recieved
LoginState.userDetailsLoaded = function( resp ) {

	//Switch to the logged in state
	this.game.states.switchState('LoggedInState', LoggedInState);

};


//When the user clicks on screen,
LoginState.processInput = function( x, y ) {

	//Don't continue if the login button is not visible.
	if( !this.facebookLoginButton.visible ) {
		return;
	}

	//And the users mouse was within the facebook login button bounding box.
	if( this.facebookLoginButton.box.bounds.contains(x, y) ) {

		//Hide the login button so that we don't try to log them in twice.
		this.facebookLoginButton.visible = false;

		//Otherwise login the user
		this.game.social.facebook.login( {
			callback: this.updateLoginStatus,
			context: this, 
			options: {
				//Any other publishing optoins require a facebook review
				scope: 'public_profile, email, user_friends'
			}
		} );

	}

};


//Create the state that we are going to use for this game.
var LoggedInState = new Kiwi.State("LoggedInState");
	


//Once asset loading has completed
LoggedInState.create = function() {	

	//Display the users profile picture
	this.userImage = new Kiwi.GameObjects.StaticImage( this, this.textures['currentUsersProfileImage'] );
	this.userImage.x = (this.game.stage.width - this.userImage.width) * 0.5;
	this.userImage.y = (this.game.stage.height - this.userImage.height) * 0.5;
	this.addChild( this.userImage );

	//The 'userInfo' property saves the information returned by facebook 
	// from the last request made when the 'me' method was used.
	var userInformation = this.game.social.facebook.userInfo;

	//Nice Text to display at the top.
	this.statusText = new Kiwi.GameObjects.Textfield(this, '');
	this.statusText.x = this.game.stage.width * 0.5;
	this.statusText.y = this.userImage.y - 16;
	this.statusText.textAlign = 'center';
	this.statusText.fontSize = 16;
	this.statusText.text = 'Welcome ' + userInformation['first_name'] + ' ' + userInformation['last_name'];
	this.addChild( this.statusText );


	//Create the facebook logout button. 
	this.facebookLogoutButton = new Kiwi.GameObjects.StaticImage( this, this.textures.login );
	this.facebookLogoutButton.x = ( this.game.stage.width - this.facebookLogoutButton.width ) * 0.5;
	this.facebookLogoutButton.y = this.game.stage.height - this.facebookLogoutButton.height - 10;
	this.facebookLogoutButton.cellIndex = 1;
	this.addChild( this.facebookLogoutButton );


	//Add the click event to log the user out.
	this.game.input.onUp.add( this.processInput, this );
	
};


//When the user clicks on screen,
LoggedInState.processInput = function( x, y ) {

	//Don't continue of the login button is not visible.
	if( !this.facebookLogoutButton.visible ) {
		return;
	}

	//And the users mouse was within the facebook login button bounding box.
	if( this.facebookLogoutButton.box.bounds.contains(x, y) ) {

		//Delete the profile picture so that a new one can be loaded in.
		this.game.fileStore.removeFile( 'currentUsersProfileImage' );

		//If the user has a profile picture, then kill it
		//If the user was logged in, then the button must have been telling the user to logout.
		this.game.social.facebook.logout( {
			context: this,
			callback: function() {
				this.game.states.switchState('LoginState');
			}
		} );

	}

};


var gameOptions = {
	plugins: [ "SocialConnect" ],
	width: 768,
	height: 512
};

var game = new Kiwi.Game('game-container', 'SocialConnect', LoginState, gameOptions);


