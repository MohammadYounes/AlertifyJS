module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['staging', 'build']
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '/**\n' +
                            ' * <%= pkg.name %> <%= pkg.version %> <%= pkg.homepage %>\n' +
                            ' * <%= pkg.description %>\n' +
                            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> \n' +
                            ' * Licensed under <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>*/\n',
                    linebreak: false
                },
                files: {
                    src: ['build/**/*.css']
                }
            }
        },

        less: {
            options: {
                paths: ['./src/less'],
                compress: false,
            },
            compile: {
                expand: true,
                cwd: 'src/less',
                src: ['**/*.less'],
				ext: '.css',
                dest: 'staging'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            build: {
                expand: true,
                cwd: 'staging/',
                dest: 'staging/',
                src: ['**/*.css'],
            },
        },

        rtlcss: {
            prefixRules: {
                options: {
                    rules: [
                        {
                            'name': 'prefix',
                            'expr': /.*/img,
                            'important': true,
                            'action': function (rule) {
                                //prefix rules with ajs- and ignore further processing
                                rule.selector = rule.selector.replace(/\.(?!alertify)/g, '.ajs-');
                                return true;
                            }
                        }
                    ]
                },
                expand: true,
                cwd: 'staging',
                src: ['**/*.css'],
                dest: 'staging',
            },
			build: {
				expand : true,
                cwd: 'staging',
                src: ['**/*.css'],
                dest: 'staging/rtl',
				ext: '.css',
            }
        },

        cssmin: {
            options: {
                report: 'gzip'
            },
            min: {
				expand:true,
				cwd:'staging',
				src:['*.css', 'themes/*.css'],
				dest:'build/css',
				ext: '.min.css',
            },
			rtl: {
				expand:true,
				cwd:'staging/rtl',
				src:['**/*.css'],
				dest:'build/css',
				ext: '.rtl.min.css',
            }
		},
		
		copy: {
			ltr:{
				expand:true,
				cwd:'staging',
				src:['*.css', 'themes/*.css'],
				dest:'build/css',
				ext:'.css'
			},
			rtl:{
				expand:true,
				cwd:'staging/rtl',
				src:['**/*.css'],
				dest:'build/css',
				ext:'.rtl.css'
			},
			build:{
				expand:true,
				cwd:'build',
				src:['**'],
				dest:'docpad/files/build'
			}
		},
		
        concat: {
            options: {
                stripBanners: false,
                banner: '/**\n' +
                        ' * <%= pkg.name %> <%= pkg.version %> <%= pkg.homepage %>\n' +
                        ' * <%= pkg.description %>\n' +
                        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> \n' +
                        ' * Licensed under <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>*/\n',
            },
            dist: {
                src: [
                    'src/js/intro.js',
                    'src/js/event.js',
					
					'src/js/dialog/intro.js',
					'src/js/dialog/commands.js',
					'src/js/dialog/actions.js',
					'src/js/dialog/focus.js',
					'src/js/dialog/transition.js',
					'src/js/dialog/move.js',
					'src/js/dialog/resize.js',
					'src/js/dialog/events.js',
					'src/js/dialog/dialog.js',
					'src/js/dialog/outro.js',
					
                    'src/js/notifier.js',
                    'src/js/alertify.js',
                    'src/js/alert.js',
                    'src/js/confirm.js',
                    'src/js/prompt.js',
                    'src/js/outro.js'
                ],
                dest: 'build/alertify.js'
            }
        },


        jshint: {
            files: {
                src: [
                    'Gruntfile.js',
                    'build/alertify.js',
                    'test/specs/*.js'
                ]
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= pkg.author %> */\n',
                report: 'gzip'
            },
            dist: {
                files: {
                    'build/alertify.min.js': ['<banner>', 'build/alertify.js']
                }
            }
		},

        watch: {
            src: {
                files: ['src/**/*.js'],
                tasks: ['build']
            }
        },
		
		compress: {
			options: {
				archive: 'build/alertifyjs.zip'
			},
			build: {
				files: [
					{
						expand:true,
						cwd: 'build',
						src: ['**']
					}
				]
			}
		}
    });

    grunt.loadNpmTasks('grunt-rtlcss');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-banner');

    // Default task
    grunt.registerTask('css', ['less', 'autoprefixer:build', 'rtlcss', 'copy:rtl', 'copy:ltr', 'cssmin', 'usebanner']);
    grunt.registerTask('build', ['clean:build', 'css', 'concat', 'uglify', 'compress', 'copy:build']);
    grunt.registerTask('default', ['build', 'jshint']);
};
