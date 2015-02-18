module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass_globbing', 'compass:dev'],
        options: {
          livereload: true,
          spawn: false
        }
      },
      js: {
        files: ['js/{,**/}*.js', '!js/{,**/}*.min.js'],
        tasks: ['uglify:dev']
      },
      registry: {
        files: ['*.info', '{,**}/*.{php,inc}'],
        tasks: ['shell'],
        options: {
          livereload: true
        }
      },
      images: {
        files: ['images/**']
      }
    },
    sass_globbing: {
      dist: {
        files: {
          'scss/core/_variables.scss': 'scss/core/variables/**/*.scss',
          'scss/core/_functions.scss': 'scss/core/functions/**/*.scss',
          'scss/core/_mixins.scss': 'scss/core/mixins/**/*.scss',
          'scss/_base.scss': 'scss/base/**/*.scss',
          'scss/_component.scss': 'scss/component/**/*.scss',
          'scss/_layout.scss': 'scss/layout/**/*.scss',
          'scss/_skin.scss': 'scss/layout/**/*.scss'
        }
      }
    },
    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true,
        force: true
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      dist: {
        options: {
          environment: 'production'
        }
      }
    },
    clean: {
      css: [
        'css/**/*',
        'scss/_base.scss',
        'scss/_component.scss',
        'scss/_layout.scss',
        'scss/_skin.scss',
        'scss/core/_variables.scss',
        'scss/core/_functions.scss',
        'scss/core/_mixins.scss'
      ]
    },
    shell: {
      all: {
        command: 'drush cc all'
      }
    },
    wiredep: {
      task: {
        src: [
          'mytheme.info',
          'scss/_vendor.scss'
        ],
        options: {
          fileTypes: {
            info: {
              block: /(([ \t]*);\s*bower:*(\S*))(\n|\r|.)*?(;\s*endbower)/gi,
              detect: {
                js: /scripts\[\] = \s(.+js)/gi,
                css: /stylesheets\[all\]\[\] = \s(.+css)/gi
              },
              replace: {
                js: 'scripts[] = {{filePath}}',
                css: 'stylesheets[all][] = {{filePath}}'
              }
            },
            scss: {
              block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
              detect: {
                css: /@import\s['"](.+css)['"]/gi,
                sass: /@import\s['"](.+sass)['"]/gi,
                scss: /@import\s['"](.+scss)['"]/gi
              },
              replace: {
                css: '@import "{{filePath}}";',
                sass: '@import "{{filePath}}";',
                scss: '@import "{{filePath}}";'
              }
            }
          }
        }
      }
    },
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sassdoc');

  grunt.registerTask('default', [
    'clean',
    'wiredep',
    'sass_globbing',
    'compass:dist',
    'shell'
  ]);
};
