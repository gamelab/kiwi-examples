
function merge( objectA, objectB ) {

	for( item in objectB ) {
						
		if( !objectA[ item ] ) {
			objectA[ item ] = objectB[ item ];
		}

	}

	return objectA;

}

module.exports = function(grunt) {
 
	grunt.registerMultiTask('examples', 'Builds json file used by the example site.', function() {

		//Get the options and set default values.
		var options = this.options( {
			base: 'examples',
			excludes: []
		} );


		//Loop through the files passed.
		this.files.forEach( function( file ) {

			//Create a object for out final result. 
			var result = {};

			var files = file.src.filter( function( filepath ) {

				//Filter out files that do not exist.
			   	if ( !grunt.file.exists( filepath ) ) {

				   	grunt.log.warn('Source file "' + filepath + '" not found.');
				    return false;

			    } else {	

			    	//Filter out files that are in the excludes options
				    return options.excludes.every( function( dir ) {

			            var keep = filepath.indexOf( options.base + '/' + dir + '/' ) < 0;
			            grunt.log.warn('Skipping: '+filepath );
			            return keep;

			        });

			    }

			} ); 

			//Loop through each file that remains 
			files.forEach( function( filePath ) {

				//Get the base directory of that file.
				var start = options.base.length + 1;
				var directory = filePath.substr( start, filePath.lastIndexOf('/') - start );

				//If it doesn't exist in the result object yet, add it.
				if( !result[ directory ] ) {
					
					result[ directory ] = {
						"examples": [] 
					};

				} 

				//Get the filename for the file.
				var fileName = filePath.substr( filePath.lastIndexOf('/') + 1 );
				fileName = fileName.substr( 0, fileName.length - 3 ).replace(/[-+._]/g, ' ');


				//Add the file examples
				result[ directory ].examples.push( {
					
					file: filePath.slice( options.base.length + 1 ), 
					title: fileName.charAt(0).toUpperCase() + fileName.slice(1)

				} );


			} );


			var configObj, index, item;

			//Loop through the result and check for any configuration json 
			for( index in result ) {

				//Check each directory for a config.json. Skip if it is not there
				if( grunt.file.exists( options.base + '/' + index + '/config.json' ) ) {

			        grunt.log.writeln('Adding config json: ' + index );

					configObj = grunt.file.readJSON( options.base + '/' + index + '/config.json' );

					//Merge the two together objects together.
					result[ index ] = merge( result[ index ], configObj );
				
				}

			}


			// Write joined contents to destination filepath.
			grunt.file.write( file.dest, JSON.stringify( result ) );

		});


	});


};