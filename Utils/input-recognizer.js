#!bin/usr/env node

/**
 * Recognizes the command inputs.
 * 
 * @class InputRecognizer
 */
class InputRecognizer
{
	/**
	 * Initialize the input.
	 *
	 * @return void
	 */
	constructor(input)
	{
		this.input = input;
	}

	/**
	 * Checks if the user typed an input.
	 *
	 * @return bool
	 */
	isOption()
	{
		if (typeof this.input == 'undefined') {
			return false;
		}

		return this.input.charAt(0) == '-';
	}

	/**
	 * Checks if the user typed a command.
	 *
	 * @return bool
	 */
	isCommand()
	{ 
		return this.input.charAt(0) != '-';
	}

	/**
	 * Checks if the user needs help.
	 *
	 * @return bool
	 */
	needHelp()
	{
		return this.input == '--help' || this.input == '-h';
	}
}

module.exports = InputRecognizer;
