#!bin/usr/env node

const Commands = require('./commands');
const Str = require('./Utils/str');

/**
 * Stores a command.
 * 
 * @class Command
 */
class Command
{
	/**
	 * Initialize the parsed inputs.
	 *
	 * @return void
	 */
	constructor(parsedInputs, commands)
	{
		this.inputs = parsedInputs;
		this.commands = commands;
	}

	/**
	 * Executes the command.
	 *
	 * @return void
	 */
	execute()
	{
		let command = Str.dashToCamel(this.inputs.command);

		if (typeof Commands[command] != 'undefined') {
			Commands[command].call(this.commands, this.inputs.options);
		}
	}

	/**
	 * Indicates if the user requested for help.
	 *
	 * @return bool
	 */
	requestedForHelp()
	{
		return this.inputs.help;
	}
}

module.exports = Command;
