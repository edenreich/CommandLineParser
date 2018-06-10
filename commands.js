#!bin/usr/env node

const path = require('path');
const fs = require('fs');
const Feedback = require('./Utils/feedback');

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
