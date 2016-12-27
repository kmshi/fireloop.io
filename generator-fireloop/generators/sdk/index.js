"use strict";
var path = require('path');
var yosay = require('yosay');
var generators = require('yeoman-generator');
var chalk = require("chalk");
/**
 * @module Builder [FireLoop]
 * @author Jonathan Casarrubias <t: johncasarrubias, gh:mean-expert-official>
 * @description
 * This module generates and configures a FireLoop SDK
 */
module.exports = generators.Base.extend({
    /**
     * @method prompting
     * @author Brannon N. Darby II <gh:ng-logic>
     * @description
     * If this.options.showOptions = false, build SDK with default options
     * Otherwise, prompt user with options and use selections when building SDK
     */
    prompting: function () {
        var keys = {
            IO: 'Enable PubSub + IO + FireLoop functionality',
            FIRELOOP: 'Generate ONLY FireLoop SDK + Auth Services',
            DEFAULT_VALUES: 'Add default values in models'
        };
        var choices = [keys.IO, keys.DEFAULT_VALUES];
        // TODO: set FIRELOOP to true after fix
        var selected = {
            IO: true,
            FIRELOOP: false,
            DEFAULT_VALUES: false
        };
        this.selected = selected;
        if (this.options.showOptions) {
            return this.prompt([{
                    type: 'checkbox',
                    name: 'list',
                    message: 'What SDK features do you want to include?',
                    default: 0,
                    choices: choices
                }]).then(function (answers) {
                var _this = this;
                answers.list.forEach(function (answer) {
                    if (answer === keys.IO) {
                        _this.selected.IO = true;
                    }
                    else if (answer === keys.DEFAULT_VALUES) {
                        _this.selected.DEFAULT_VALUES = true;
                    }
                });
                if (selected.IO) {
                    return this.prompt([{
                            type: 'confirm',
                            name: 'fl',
                            message: 'Do you want to generate ONLY FireLoop SDK + Auth Services?'
                        }]).then(function (answers) {
                        this.selected.FIRELOOP = answers.fl;
                    }.bind(this));
                }
            }.bind(this));
        }
    },
    buildSDK: function () {
        this.log(chalk.green("IO: " + this.selected.IO));
        this.log(chalk.green("FIRELOOP: " + this.selected.FIRELOOP));
        this.log(chalk.green("DEFAULT_VALUES: " + this.selected.DEFAULT_VALUES));
        this.spawnCommand('node_modules/.bin/lb-sdk', [
            this.options.serverPath || 'server/server',
            path.join('../', this.options.clientPath || 'webapp/src/app/shared/sdk'),
            '-d', !this.options.clientType || this.options.clientType.match(/(ng2web|ng2ionic)/)
                ? 'ng2web'
                : this.options.clientType.trim(),
            '-w', 'enabled',
            '-i', this.selected.IO ? 'enabled' : 'disabled',
            '-f', this.selected.FIRELOOP ? 'enabled' : 'disabled',
            '-v', this.selected.DEFAULT_VALUES ? 'enabled' : 'disabled'
        ], {
            shell: true,
            cwd: this.destinationPath('fireloop')
        });
    }
});
//# sourceMappingURL=C:/Users/bdarby/Desktop/fireloop.io/generator-fireloop/src/sdk/index.js.map