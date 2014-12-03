module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({

    

    connect: {
        root: {
            options: {
                keepalive: true,
                hostname: '*',
                port: 8001
            }
        }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-connect');


};