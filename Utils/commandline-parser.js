#!bin/usr/env node

const Str = require('./str');
const Command = require('../command');
const Commands = require('../commands');
const Feedback = require('./feedback');
const InputRecognizer = require('./input-recognizer');

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

		for (let input in inputs) {
			var inputRecognizer = new InputRecognizer(inputs[input]);

			if (inputRecognizer.needHelp()) {
				help = true;
				break;
			}

			if (typeof command == 'undefined' && inputRecognizer.isCommand()) {
				if (commandExists(inputs[input], this.availableCommands) === false) {
					help = true;
					break;
				}


				if (commandMethodExists(inputs[input]) === false) {
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

		return new Command(inputs, new Commands);
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

function commandMethodExists(command)
{
	command = Str.dashToCamel(command);

	return typeof Commands[command] == 'function';
}

module.exports = CommandlineParser;
