#!/usr/bin/env node

const CommandlineParser = require('../../index.js').parser;

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
			name: "--all",
			description: "empty all trash"
		},
		{
			name: "--half",
			description: "empty just an half of the trash"
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