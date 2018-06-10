#!/usr/bin/env node

const CommandlineParser = require('../../src/commandline-parser');

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
		description: "Empty the trash",
		options: [{
			name: "--my-option",
			description: "with my first option"
		},
		{
			name: "--my-option2",
			description: "with my second option 2"
		}]
	},{
		name: "empty-trash-2",
		description: "Empty the trash",
		options: [{
			name: "--my-option",
			description: "with my first option"
		},
		{
			name: "--my-option2",
			description: "with my second option 2"
		}]
	}]
};

let cliParser = new CommandlineParser(config);

let command = cliParser.parse(args);

if (command.requestedForHelp()) {
	cliParser.showHelp('index');
} else {
	command.execute();
}