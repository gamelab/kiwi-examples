(function(){

	var exampleJson = {};
	var title = getParameterByName( 'title' );
	var category = getParameterByName( 'category' );
	var index = getParameterByName( 'index' );

	var currentDependency = 0;
	var dependencies = null;
	
	$( document ).ready(function() {

		if( title ) {
			$('#title').text( title );
		}

		//If a title is not found
		if( !category ) {
			//Cannot find example.
			//404 game here.
			displayError('No category was passed. No example can be loaded.');
			return;
		}

		if( !index ) {
			//Cannot find the index. Default to the first one.
			index = 0;
		}

		//Load in the json file.
		$.ajax( './_site/examples.json', {

			dataType: "json",

			success: function( data ) {

				exampleJson = data;
				showExample( category, index );

			},

			error: function() {
				displayError('Could not load in the example json.');
			}

		} );

	});


	function showExample( category, index ) {

		//If there is a category
		if( !exampleJson[ category ] ) {
			displayError( 'Category passed was not found.' );
		}

		var ex = exampleJson[category].examples[index];
		var cate = exampleJson[category];

		if( ex.title ) {
			$('#title').text( ex.title );
		}

		//Load in the dependencies...
		if( cate.dependencies ) {

			dependencies = cate.dependencies;
			loadDependency( cate.dependencies, ex.file );


		} else {

			loadExampleScript( ex.file );

		}

	}


	function loadExampleScript( url ) {

		//Load in just the file
		$.getScript( url ).done( function( data ) {

			displayCode( data );

		} ).fail( function() {

			displayError( 'Failured to load example javascript.' );

		} );

	}

	function displayCode( code ) {

		$('#source-code pre code').text( code ).each( function(i, block) {

			hljs.highlightBlock( block );
			
		} );

		if( dependencies ) {

			var $item;

			for(var i = 0; i < dependencies.length; i++) {

				$item = $('<li>').html( '<a href="' + dependencies[i] + '">' + dependencies[i] + '</a>' );
				$('#dependencies ul').append( $item );

			}

			$('#dependencies').addClass('active');

		}

	}


	function loadDependency( dependencies, finalFile ) {

		//Check to see if we have loaded all the dependencies
		if( currentDependency >= dependencies.length ) {

			loadExampleScript( finalFile );

			return;
		}


		$.getScript( dependencies[ currentDependency ] ).done( function() {

			currentDependency++;
			loadDependency( dependencies, finalFile );

		}).fail( function() {

			displayError( 'Failure loading dependencies.' );

		});

	}


	function displayError( message ) {
		
		$('#game-container').addClass('error').html( message );

	}


	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}


})();