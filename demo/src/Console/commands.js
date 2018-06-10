#!/usr/bin/env node

/**
 * Stores the commands functions.
 * 
 * @class Commands
 */
class Commands
{
	/**
	 * Demo Command
	 *
	 * @param array | options
	 * @return void
	 */
	static emptyTrash(options)
	{
		console.log(options);
	}
}

module.exports = Commands;
