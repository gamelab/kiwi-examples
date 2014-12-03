(function(){

	var exampleJson = {};
		
	//Attempt to load in the json
	$.ajax( './_site/examples.json', {

		dataType: "json",

		success: function( data ) {

			exampleJson = data;

			displayExamples();

		},

		error: function() {
			displayError('Could not load in the example json.');
		}

	} );


	function displayExamples() {

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
			}).text( example.title );

			$listItem = $('<li>').append( $anchor );
			$list.append( $listItem );

		}

		$section.append( $title );
		$section.append( $list );

		$( '#example-list' ).append( $section );

	}


	function displayError( message ) {
		
		//$('#game-container').addClass('error').html( message );

	}


})();