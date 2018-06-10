#!/usr/bin/env node

const CommandlineParser = require('../../src/commandline-parser');
const Feedback = require('../../src/feedback');

const args = process.argv;

const config = {
	handler: 'src/Console/commands',
	labels: {
		application_name: "My Awesome Application",
		application_filename: "my-app",
		application_version: "1.0.0"
	},
	commands: [{
		name: "empty-trash",
		options: [{
			name: "--my-option",
			value: "option-value"
		},
		{
			name: "--my-option2",
			value: "option-value2"
		}]
	}]
};

let cliParser = new CommandlineParser(config);

let command = cliParser.parse(args);

if (command.requestedForHelp()) {
	return cliParser.showHelp();
}

command.execute();