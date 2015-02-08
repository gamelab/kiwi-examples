(function(){


	var exampleJson = {};


	$( document ).ready( function() {
		
		//Version check
		$( '#current-version a' ).text( Kiwi.VERSION ).attr( 'href', 'https://github.com/gamelab/kiwi.js/tree/v' + Kiwi.VERSION );
		$( '.versions' ).removeClass( 'not-visible' );

		//Attempt to load in the json
		$.ajax( './_site/examples.json', {

			dataType: "json",

			success: function( data ) {

				exampleJson = data;

				displayExamples();

			},

			error: function() {
				displayError( "<h1>Couldn't load in the example json. <br /><span class=\"help\">Please try again. Make sure you are running this example through a web server.</span></h1>" );
			}

		} );


	});

	function displayExamples() {

		var addToEnd = [ 'plugin', 'plugin-chipmunk-physics', 'plugin-save-manager', 
		'plugin-primitives', 'plugin-damage-pipeline', 'plugin-gamepad', 'plugin-social-connect',
		'plugin-fullscreen', 'plugin-uber-shader', 'plugin-achievement', 'plugin-inventory',
		'plugin-ai-tree', 'plugin-leap-controller', "plugin-webgl-particles",
		'plugin-fgl', 'plugin-quest-manager', "plugin-pointer-lock", "plugin-pointer-filter", 
		"plugin-repeating-texture" ];

		//Add the basic/games categories if they are there.
		if( exampleJson['basics'] ) {
			addCategory( exampleJson['basics'], 'basics' );
			delete exampleJson['basics'];
		}

		if( exampleJson['games'] ) {
			addCategory( exampleJson['games'], 'games' );
			delete exampleJson['games'];
		}

		//Loop through the example json
		for( var index in exampleJson ) {
			var skip = false;
			for (var i = addToEnd.length - 1; i >= 0; i--) {
				if ( addToEnd[i] == index ) {
					skip = true;
				}
			};
			if ( skip ) {
				continue;
			}
			addCategory( exampleJson[index], index );
			delete exampleJson[index];

		}
		for( var index in exampleJson ) {
			addCategory( exampleJson[index], index );

		}

		

	}


	function addCategory( category, index ) {

		var $section = $('<section>'),
			$title = $('<h1>'),
			$list = $('<ul>');

		if( category.title ) {
			$title.text( category.title );
		} else {
			$title.text( index );
		}

		var $listItem, $anchor, example;

		for( var i = 0; i < category.examples.length; i++ ) {

			example = category.examples[i];

			$anchor = $('<a>', { 
				href: './view.html?category=' + index + '&index=' + i + '&title=' + example.title
			}).text( example.title ).click( loadExample );

			$listItem = $('<li>').append( $anchor );
			$list.append( $listItem );

		}

		$section.append( $title );
		$section.append( $list );

		$( '#example-list' ).append( $section );

	}


	function displayError( text ) {
			
		$( 'body' ).append( 
			
			$( '<div>', { id: 'error' } ).html( text )

		);
	}
	

	function loadExample( event ) {

 	 	event.preventDefault();

 	 	$( '.active' ).removeClass( 'active' );
 	 	$( this ).addClass( 'active' );

		$('#viewing-area').attr( 'src', this.href );
		$('iframe')[0].contentWindow.focus();

		return false;
	}


})();