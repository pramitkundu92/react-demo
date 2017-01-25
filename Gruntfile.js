module.exports = function(grunt){
    grunt.initConfig({
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2,
                    cleancss: true    
                },
                files: {
                    'webapp/assets/styles.css': ['webapp/assets/styles.less']
                }
            }    
        },
        concat: {
            options: {
                separator: '/* Attaching new file */\n',
            },
            target: {
                files: {
                    'webapp/build/vendor.min.js': ['webapp/vendor/*.js'],
                    'webapp/build/vendor.min.css': ['webapp/vendor/*.css'],
                    'webapp/build/build.js': ['webapp/app/*.js'],
                    'webapp/build/build.css': ['webapp/assets/*.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'webapp/build/build.min.js': ['webapp/build/build.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                processImport: false
            },
            target: {
                files: {
                    'webapp/build/build.min.css': ['webapp/build/build.css']
                }
            }
        },
        watch: {
            less: {
                files: ['assets/styles.less'],
                tasks: ['less','concat','cssmin'],
                options: {
                    interrupt: true,
                    spawn: false
                }
            },
            js: {
                files: ['webapp/app/*.js'],
                tasks: ['concat'/*,'uglify'*/],
                options: {
                    interrupt: true,
                    spawn: false
                }
            },
            css: {
                files: ['webapp/assets/*.css'],
                tasks: ['concat','cssmin'],
                options: {
                    interrupt: true,
                    spawn: false
                }
            },
            express: {
                files: ['index.html','server.js'],
                tasks: ['express'],
                options: {
                    interrupt: true,
                    spawn: false
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    grunt.registerTask('start',['less','concat',/*'uglify',*/'cssmin','express','watch']);
};