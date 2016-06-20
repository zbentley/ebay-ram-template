# ebay-ram-template

A simple Node/[Grunt](http://gruntjs.com/) script to generate templated eBay listings for computer RAM from YAML data.

This is primarily for personal use, and will likely never be distributed or maintained.

# Usage

Install the required libraries by downloading this repo, `cd`ing into it, and issuing `npm install` (you'll need Node.JS and NPM installed).

To add a new listing, put a new YAML file in the `data/` directory. It should look roughly like the included `data/example.yaml`. You can see allowed/required fields in `schema.json`.

To generate templates (and destroy any already-generated templates), run `grunt build` or `npm run-script grunt build`.

Generated HTML for all YAML files in `data/` except the example file will be placed in a folder called `out/` in the project root.

To clean up all generated output/tmp directories, do `grunt clean` or `npm run-script grunt clean`.

It doesn't do much, if any, validation of field types or info, and won't list to eBay for you. It's just for bulk templating things.