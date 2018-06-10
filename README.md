<p align="center"><img src="https://s15.postimg.cc/sud9g0tuz/cli.png"></p>

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
Create an handler and configure the path on the parser:
```javascript
class Commands
{
  static emptyTrash(options)
  {
    console.log(options);
  }
}
```

Now every command you declared above will correspond a camelcase static method on the above configured handler.
For instance command empty-trash is corresponding to static emptyTrash() method.
