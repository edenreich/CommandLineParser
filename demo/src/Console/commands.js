#!/usr/bin/env node

let progressbar = require('../../../index.js').progressbar;

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
		progressbar.start();

		// handle operation that takes 4 sec.

		setTimeout(function() {
			progressbar.stop();
		}, 4000);
	}
}

module.exports = Commands;
