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