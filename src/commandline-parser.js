#!bin/usr/env node

const Str = require('../Utils/str');
const Command = require('./command');
const Feedback = require('./feedback');
const InputRecognizer = require('./input-recognizer');
const path = require('path');
const rootFolder = path.resolve(__filename);

/**
 * Parse the commands.
 * 
 * @class CommandlineParser
 */
class CommandlineParser
{
	/**
	 * Initialize the configurations.
	 *
	 * @return void
	 */
	constructor(config)
	{
		if (typeof config != 'object') {
			throw new Error('config must be an object!');
		}
		
		if (typeof config.handler == 'undefined') {
			throw new Error('Please supply an handler class for the commands!');
		}

		try {
			this.handler = require(process.cwd()+'/'+config.handler);
		} catch(e) {
			console.error('>>> Could not resolve configured handler!');
			process.exit(1);
		}

		this.applicationName = config.application_name || 'CommandlineParser';
		this.feedback = new Feedback(config.labels);
		this.availableCommands = config.commands;
	}

	/**
	 * Setter for the args.
	 *
	 * @return Console\Utils\Command
	 */
	parse(args)
	{
		let inputs = args.slice(2);
		let help = false;
		let command;
		let options = [];

		if (inputs.length == 0) {
			help = true;
		}

		for (let input in inputs) {
			var inputRecognizer = new InputRecognizer(inputs[input]);

			if (inputRecognizer.needHelp()) {
				help = true;
				break;
			}

			if (inputRecognizer.isCommand() && typeof command == 'undefined') {
				if (commandExists(inputs[input], this.availableCommands) === false) {
					help = true;
					break;
				}


				if (commandMethodExists(inputs[input], this.handler) === false) {
					help = true;
					break;
				}

				command = inputs[input];
			}

			if (inputRecognizer.isOption()) {
				let option = {
					name: inputs[input],
					value: inputs[Number(input)+1] || true,
				};

				options.push(option);
			}
		}
	
		inputs = {
			help: help,
			command: command,
			options: options
		};

		return new Command(inputs, this.handler);
	}

	/**
	 * Displays the help for the user.
	 *
	 * @return void
	 */
	showHelp(name = 'index')
	{
		this.feedback.showHelp(name);
	}
}

function commandExists(command, commands)
{
	var exists = false;

	commands.forEach(function(availableCommand) {
		if (availableCommand.name == command) exists = true;
	});

	return exists;
}

function commandMethodExists(command, handler)
{
	command = Str.dashToCamel(command);

	return typeof handler[command] == 'function';
}

module.exports = CommandlineParser;
