module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
      less: {
        development: {
         options: {
           paths: ["./src/less"]
         },
         files: [
         {src: ["src/less/main.less"], dest: "dist/css/main.css"}
        ],
      }
    },
    concat: {
      dist: {
        files: {
          'dist/js/main.js': ["src/js/cravenScrum.js", "src/js/cravenScrum.Calendar.js", "src/js/cravenScrum.Projects.js"],
        },
      },
    },    
    watch: {
      css: {
        files: "src/less/*.less",
        tasks: ["less"]
      },
      concat: {
        files: "src/js/*.js",
        tasks: ["concat"]
      }      
    }
});

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task(s).
  grunt.registerTask("default", ["less", "concat", "watch"]);

};