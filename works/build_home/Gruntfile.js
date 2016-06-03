module.exports = function(grunt) {

  grunt.initConfig({
    concat: {

      dist: {
        src: ['src/sass/reset.scss', 'src/sass/mixins.scss', 'src/sass/variables.scss', 'src/sass/style.scss', 'src/fonts.css'],
        dest: 'src/sass/styles.scss'
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['styles.scss'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },

     watch: {
        sass: {
          files: ['src/sass/*.scss'],
          tasks: ['concat', 'sass']
        },
    }
  });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'watch']);
     
  
};