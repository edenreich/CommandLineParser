#!bin/usr/env node

const date = new Date;
const fs = require('fs');
const path = require('path');
const rootFolder = path.resolve(__dirname);

/**
 * Gives feedback to the user.
 *
 * @class Feedback 
 */
class Feedback
{
	/**
	 * Initialize the configurations.
	 *
	 * @param object | config
	 * @return void
	 */
	constructor(config)
	{
		this.config = config;
	}

	/**
	 * Displays an error message.
	 *
	 * @param string | string
	 * @return void
	 */
	showError(string) 
	{
		console.log('\x1b[41m%s\x1b[0m', string);
	}

	/**
	 * Displays a success message.
	 *
	 * @param string | string
	 * @return void
	 */
	showSuccess(string) 
	{
		console.log('\x1b[32m%s\x1b[0m', string);
	}

	/**
	 * Displays an info message.
	 *
	 * @param string | string
	 * @return void
	 */
	showInfo(string) 
	{
		console.log('\x1b[46m%s\x1b[0m', string);	
	}

	/**
	 * Displays the help for the user.
	 *
	 * @param string | template
	 * @param string | command
	 * @param array | data
	 * @return void 
	 */
	showHelp(template = 'index', command = undefined, data = {}) 
	{
		let instance = this;
		let path = process.cwd()+'/help/'+template;

		if (fs.existsSync(path) === false) {
			path = __dirname+'/../demo/help/index';
		}

		fs.readFile(path, 'utf8', function(err, content) {
			if (err) {
				throw err;
			}

			let hr = '\u001b[36m#################################################\x1b[0m';
			let header = '\u001b[36m#\t'+instance.config.labels.application_name+'\t\t\t#\x1b[0m';

			let ClientName = instance.config.labels.application_filename || 'CommandLineParser';
			let clientVersion = instance.config.labels.application_version || '1.0.0';
			let currentTime = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
			let usageTitle = '\x1b[32mUsage\x1b[0m';
			let optionsTitle = '\x1b[36mOptions\x1b[0m';
			let commandsTitle = '\x1b[33mCommands\x1b[0m';
			let options = decorateOptions.call(instance, command);
			let commands = decorateCommands.call(instance);

			content = content.replace(/\{%hr%\}/g, hr);
			content = content.replace(/\{%header%\}/g, header);
			content = content.replace(/\{%client_name%\}/g, ClientName);
			content = content.replace(/\{%client_version%\}/g, clientVersion);
			content = content.replace(/\{%current_time%\}/g, currentTime);
			content = content.replace(/\{%usage_title%\}/g, usageTitle);
			content = content.replace(/\{%options_title%\}/g, optionsTitle);
			content = content.replace(/\{%commands_title%\}/g, commandsTitle);
			content = content.replace(/\{%options%\}/g, options);
			content = content.replace(/\{%commands%\}/g, commands);

			for (let placeholder in data) {
				content = content.replace(new RegExp("{%"+placeholder+"%}", "g"), data[placeholder]);
			}

			console.log(content);
		})
	}
}

/**
 * Retrieve the string represention 
 * of the options for given command.
 *
 * @param string | command
 * @return string
 */
function decorateOptions(command = undefined)
{
	if (typeof command == 'undefined') {
		return '';
	}

	return this.config.commands.map(function(declaredCommand) {
		if (command == declaredCommand.name) {
			return declaredCommand.options.map(function(option) {
				return option.name+'\t\t\t'+option.description+'\n\t';
			}).join('');
		}
	});
}

/**
 * Retrieve the string represention 
 * of the commands.
 *
 * @return string
 */
function decorateCommands()
{
	return this.config.commands.map(function(command) {
		return command.name+'\t\t\t'+command.description+'\n\t';
	}).join('');
}

module.exports = Feedback;
