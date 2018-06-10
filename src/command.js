#!bin/usr/env node

const Str = require('../Utils/str');

/**
 * Buleprint for a command.
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
	constructor(parsedInputs, handler)
	{
		this.inputs = parsedInputs;
		this.handler = handler;
	}

	/**
	 * Executes the command.
	 *
	 * @return void
	 */
	execute()
	{
		let command = Str.dashToCamel(this.inputs.command);

		if (typeof this.handler[command] != 'undefined') {
			this.handler[command].call(this.handler, this.inputs.options);
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
