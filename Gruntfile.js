module.exports = function(grunt) {
    
    // Configuration
    grunt.initConfig({
        
        jshint: {
            files: ["*.js"],
            
            options: {
                // Enforcing
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: true,
                undef: true,
                unused: true,
                
                // Environment
                node: true
            }
        },
        
        uglify: {
            minify: {
                src: "dist/basespace.js",
                dest: "dist/basespace.min.js"
            }
        },
        
        umd: {
            dist: {
                template: "unit",
                src: "index.js",
                dest: "dist/basespace.js",
                objectToExport: "namespace",
                globalAlias: "basespace"
            }
        }
        
    });
    
    // Plugins
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-umd");
    
    // Tasks
    grunt.registerTask("build", ["umd", "uglify"]);
    grunt.registerTask("default", ["jshint"]);
    grunt.registerTask("all", ["jshint", "build"]);
};
