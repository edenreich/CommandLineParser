<p align="center"><img src="https://s15.postimg.cc/8k2mey5hn/cli.png"></p>

## CommandLineParser
<br/>
An easy to use commandline interface written in javascript.

## Installation
```javascript
npm install edenreich-commandline-parser
```

## Usage
```javascript
const CommandlineParser = require('edenreich-commandline-parser');
const args = process.argv;

// Configure the Application.
const config = {
  handler: 'path/to/my/awesome/handler',
  labels: {
    application_name: "My Awesome Application",
    application_filename: "my-app",
    application_version: "1.0.0"
  },
  commands: [{
    name: "empty-trash",
    description: "Empty the trash",
    options: [{
      name: "--my-option",
      description: "with my first option"
    },
    {
      name: "--my-option2",
      description: "with my second option 2"
    }]
  }]
};

let cliParser = new CommandlineParser(config);

// Parse the arguments.
let command = cliParser.parse(args);

// Execute the command.
if (command.requestedForHelp()) {
  cliParser.showHelp('index');
} else {
  command.execute();
}
```

## Handler
Create an handler and configure the path on the parser:
```javascript
class Commands
{
  static emptyTrash(options)
  {
    options.forEach(function(option) {
      switch(option.name)
      {
        case "--my-option":
          // Handle option
          break;
        case "--my-option2":
          // Handle option 2
          break;
      }
    });
  }
}

module.exports = Commands;
```

Now every command you declared above will correspond a camelcase static method on the above configured handler.
For instance command empty-trash is corresponding to static emptyTrash() method.

## Application Help
You may create template files that matches the way your help look.
In the root directory create a folder called help:
```sh
mkdir help
```

By default the parser will look for an ```index``` file, if you want to use different templates you may pass it as an argument:
```javascript
cliParser.showHelp('my-template');
```

### Predefined Templates Placeholder
Template variables should be surrounded by ```{%variable_name%}```, for example ```{%hr%}```.
```
hr              - line spacer
header          - the application name 
client_name     - the client name
client_version  - the version of the application
current_time    - the current time
usage_title     - the usage title
options_title   - the options title
commands_title  - the commands title
options         - the list of options
commands        - the list of commands
```

You may also pass your own placeholders to the template:
```javascript
cliParser.showHelp('template', undefined, {"placeholder_name": "placeholder_value"});
```
