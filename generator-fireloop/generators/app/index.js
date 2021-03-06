"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yosay = require('yosay');
var generators = require('yeoman-generator');
var chalk = require("chalk");
/**
 * @module FireLoopGenerator [FireLoop]
 * @author Jonathan Casarrubias <t: johncasarrubias, gh:mean-expert-official>
 * @description
 * This module generates and configure a FireLoop Server
 */
module.exports = generators.extend({
    /**
     * @module fireloop
     * @author Brannon N. Darby II <gh:brannon-darby>
     */
    constructor: function () {
        generators.apply(this, arguments);
        this.log(yosay('Welcome to FireLoop! \n The MEAN Stack Platform by MEAN Expert'));
    },
    prompting: function () {
        var _this = this;
        this.options.clients = this.config.get('clients') || {};
        // Filter clients only not server.
        var clients = [];
        if (typeof this.options.clients === 'object') {
            Object.keys(this.options.clients).forEach(function (name) {
                if (_this.options.clients[name].type.match(/(ng2web|ng2ionic|ng2native|ng2universal)/)) {
                    clients.push(name);
                }
            });
        }
        var keys = {
            GENERATE_PROJECT: 'Generate FireLoop Project',
            GENERATE_CLIENT: 'Generate Angular2 Client',
            GENERATE_SDK: 'Generate Angular2 SDK',
            FIRELOOP_VERSION: 'Show FireLoop Version'
        };
        var choices = new Array();
        if (!this.config.get('version')) {
            choices.push(keys.GENERATE_PROJECT);
        }
        if (this.config.get('version')) {
            choices.push(keys.GENERATE_CLIENT);
        }
        if (clients.length > 0) {
            choices.push(keys.GENERATE_SDK);
        }
        choices.push(keys.FIRELOOP_VERSION);
        return this.prompt([{
                type: 'list',
                name: 'list',
                message: 'What do you want to do?',
                default: 0,
                choices: choices
            }]).then(function (answers) {
            var done = this.async();
            var answer = answers.list;
            switch (answer) {
                case keys.GENERATE_PROJECT:
                    this.config.set('version', require('../../package.json').version);
                    this.composeWith('fireloop:server').on('end', function () { return done(); });
                    break;
                case keys.GENERATE_CLIENT:
                    this.composeWith('fireloop:ng2').on('end', function () {
                        done();
                    });
                    break;
                case keys.GENERATE_SDK:
                    this.composeWith('fireloop:sdk').on('end', function () { return done(); });
                    break;
                case keys.FIRELOOP_VERSION:
                    var version = require('../../package.json').version;
                    this.log(chalk.blue("\nFireLoop Version: " + version + "\n"));
                    break;
            }
        }.bind(this));
    }
});
//# sourceMappingURL=C:/Users/bdarby/Desktop/fireloop.io/generator-fireloop/src/app/index.js.map