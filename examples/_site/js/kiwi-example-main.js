(function(){


	var exampleJson = {};
	var defaultTab = 'Examples';
	var $examplesList = [];


	createTab( defaultTab );

	function displayError( text ) {
			
		$( 'body' ).append( 
			
			$( '<div>', { id: 'error' } ).html( text )

		);
	}

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

		// Hide these categories
		// if( exampleJson['geom'] ) {
		// 	delete exampleJson['geom'];
		// }

		//Add the basic/games categories if they are there.
		if( exampleJson['basics'] ) {
			addCategory( exampleJson['basics'], 'basics' );
			delete exampleJson['basics'];
		}

		if( exampleJson['games'] ) {
			addCategory( exampleJson['games'], 'games' );
			delete exampleJson['games'];
		}

		// This will appear in the "Plugins" "tab"
		if( exampleJson['plugin'] ) {
			addCategory( exampleJson['plugin'], 'plugin' );
			delete exampleJson['plugin'];
		}

		//Loop through the example json
		for( var index in exampleJson ) {

			addCategory( exampleJson[index], index );

		}

		toggleVisibleTabs();

	}


	function addCategory( category, index ) {

		//If no tab, then give a default
		if( !category.tab ) {
			category.tab = defaultTab;
		} 

		var $section = $('<section>', {
				'data-tab': category.tab
			}),
			$title = $('<h2>'),
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

		//Add the example
		$examplesList.push( $section );
		$( '#example-list' ).append( $section );
		
		hideExample( $section );

		//Try to get the tab
		createTab( category.tab );

	}

	function createTab( name ) {

		var $tab = $( '#example-list #' + name );

		if( !$tab.length ) {
			
			$tab = $('<a>', {
				id: name,
				'data-tab': name
			}).text( name ).click( toggleVisibleTabs );

			$('#tabs').append( $tab );

		}

		return $tab;

	}

	function toggleVisibleTabs( event ) {

		if( event ) {
 	 		event.preventDefault();
 	 	}

		var activeTab = defaultTab;

		if( $( this ).attr && $( this ).attr( 'data-tab' ) ) {
			activeTab = $( this ).attr( 'data-tab' );
		}

		//Loop through all of the tabs and toggle visiblity of elements without that tab
		var $example; 
		for( var i = 0; i < $examplesList.length; i++ ) {

			$example = $examplesList[ i ];

			if( $example.attr('data-tab') === activeTab ) {
				showExample( $example );
			} else {
				hideExample( $example );
			}

		}

		return false;
	}

	function hideExample( $section ) {
		$section.addClass('visible');
		$section.removeClass('invisible');
		$section.css( 'display', 'none' );
	}

	function showExample( $section ) {
		$section.removeClass('visible');
		$section.addClass('invisible');
		$section.css( 'display', 'block' );
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