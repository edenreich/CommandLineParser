<p align="center"><img src="#"></p>

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

// Configure the Application
const config = {
  handler: 'path/to/my/awesome/class/handler',
  labels: {
    application_name: "My Awesome Application",
    application_filename: "my-app",
    application_version: "1.0.0"
  },
  commands: [{
    name: "empty-trash",
    options: [{
      name: "--my-option",
      value: "option-value"
    },
    {
      name: "--my-option2",
      value: "option-value2"
    }]
  }]
};

let cliParser = new CommandlineParser(config);

// Parse the arguments
let command = cliParser.parse(args);

if (command.requestedForHelp()) {
  return cliParser.showHelp();
}

// Lastly Execute the command
command.execute();
```

## Handler
Now every command you declared above will correspond a camelcase static method on the above configured handler:
```javascript
const Commands = require('edenreich-commandline-parser');

class Command extends Commands
{
  emptyTrash(options)
  {
    console.log(options);
  }
}
```

