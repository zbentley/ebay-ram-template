'use strict';

module.exports = (grunt) => {
    const packageInfo = grunt.file.readJSON('package.json');

    grunt.loadNpmTasks('grunt-convert');
    grunt.loadNpmTasks('grunt-json-schema');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-markdown');

    grunt.initConfig({
        pkg: packageInfo,
        clean: {
            tmp: {
                src: ['tmp']
            },
            out: {
                src: ['out']
            }
        },
        convert: {
            yaml2json: {
                files: [{
                    expand: true,
                    cwd: 'data',
                    src: ['*.yaml','!example.yaml'],
                    dest: 'tmp/json/',
                    ext: '.json'
                }]
            },
        },
        mustache_render: {
            render: {
                files: [{
                    expand: true,
                    cwd: 'tmp/json/',
                    src: '*.json',
                    template: 'template.md',
                    dest: 'tmp/markdown/',
                    ext: '.md'
                }]
            }

        },
        json_schema: {
            validate: {
                options: {
                    validateFormatsStrict: true
                },
                files: {
                    'schema.json': ['tmp/json/*.json']
                }
            }
        },
        mkdir: {
            all: {
                options: {
                    create: ['out', 'tmp/json', 'tmp/markdown', 'tmp/html']
                },
            },
        },
        markdown: {
            options: {
                template: 'tmp/template.html',
                markdownOptions: {
                    // Don't add the stylesheet for code highlighting.
                    highlight: () => {},
                }
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'tmp/markdown/',
                    src: '*.md',
                    dest: 'out/',
                    ext: '.html'
                }]
            }
        }
    });

    grunt.registerTask('make_html_template', 'Makes an empty HTML template', () => {
        grunt.file.write('tmp/template.html', '<%=content%>')
    })

    grunt.registerTask('build', [
        'clean',
        'mkdir:all',
        'make_html_template',
        'convert:yaml2json',
        'json_schema:validate',
        'mustache_render:render',
        'markdown:all',
        'clean:tmp',
    ]);
};