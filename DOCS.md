Docs: GPT
---

# Nicaa: Chatbot Template Documentation

## Introduction

Welcome to the Nicaa Chatbot Template! This documentation serves as a comprehensive guide to understand, customize, and extend the functionality of the chatbot.

**Author:** *Jenica Ferrer*
**Version:** *1.0.0*
**Original:** *https://github.com/ruingl/YueV1*
## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)

2. [Project Structure](#project-structure)
   - [File Structure](#file-structure)
   - [Command Modules](#command-modules)

3. [Customizing Commands](#customizing-commands)
   - [Adding a New Command](#adding-a-new-command)
   - [Command Configuration](#command-configuration)
   - [Command Functions](#command-functions)

4. [Admin Configuration](#admin-configuration)
   - [Adding Admins](#adding-admins)

5. [Express Server and Pages](#express-server-and-pages)
   - [Adding Custom Pages](#adding-custom-pages)

6. [AppState and Login](#appstate-and-login)
   - [Getting AppState](#getting-appstate)

7. [Auto Reload Commands](#auto-reload-commands)

8. [Logging and Error Handling](#logging-and-error-handling)

---

## 1. Getting Started

### Prerequisites

Before diving into the chatbot template, make sure you have the following:

- [Node.js](https://nodejs.org/) installed
- Basic knowledge of JavaScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lianecagara/Nicaa-Chatbot/ && cp -r Nicaa-Chatbot/* . && rm -rf Nicaa-Chatbot
   
   ```

2. Install dependencies:

   ```bash
   npm install
   npm install chalk@4.1.2
   ```

### Configuration

Adjust the configuration variables in `main.js` to fit your preferences. Key configurations include:

- `PREFIX`: The command prefix (default is `/`).

---

## 2. Project Structure

### File Structure

The project structure is organized as follows:

- **scripts/commands**: Contains individual command modules.
- **public**: Directory for static web pages.

### Command Modules

Commands are located in `scripts/commands` and follow a specific structure. Each command module should export an object with the following properties:

- `config`: Command configuration.
- `onCommand`: Main command execution function.
- `onStart`: Main command execution function that is similar to GoatbotV2.
- `run`: Main command execution function that is similar to Mirai or Botpack.

Example of a command module (`myCommand.js`):

```javascript
// myCommand.js
module.exports = {
  config: {
    name: 'mycommand',
    description: 'Description of my command',
    // Add more configuration options
  },
  onCommand: ({ box, args }) => {
    box.reply(`Command executed with arguments: ${args.join(', ')}`);
  },
};
```

---


## 3. Customizing Commands

### Adding a New Command

To add a new command:

1. Create a new JavaScript file in `scripts/commands`.
2. Follow the structure of existing commands.
3. Ensure proper configuration, functions, and error handling.

### Command Configuration

Adjust the `config` object in each command module to set the command name, description, permissions, and more.

Example:

```javascript
// myNewCommand.js
module.exports = {
  config: {
    name: 'mynewcommand',
    description: 'Description of my new command',
    author: "author's name",
    usage: "",
    adminOnly: false //boolean to make the command exclusive to users inside admin.json

    // Add more configuration options
  },
  // ... Other functions
};
```
- `name`: this is the name used to call or execute the command functions, must have no SPACES :), most important in the config.
- `description`: a required field, each command modules must have a valid description
- `author`: your name must be here no matter what
- `usage`: not required but you are still allowed to add a usage guide for command module.
### Command Functions

Edit the `onCommand`, `onStart`, and `run` functions for custom command behavior.
Make sure to not use onCommand, onStart, and run together in one command module! (Just use one of them per file.)

### How to Create Custom Commands?

You can follow the STRUCTURE shown above, here are some guides:

- `api`: an object contains standardized functions for performing facebook-related activities, this is returned by the fb-chat-api from the project.
- `box`: an object contains shortned versions of api functions for better coding experience.
  - `box.reply(form: string)`: used to send a replied message
  - `box.send(form: string)`: used to send a normal message.
  - `Read main.js for more functions`
- `event`: an object contains:
  - senderID - id of sender
  - threadID - id of thread
  - body - content of senders message
  - `Read Fca-unofficial Docs for more`
- `args`: an array containing user arguments, excluding command name and prefix.
---

## 4. Admin Configuration

### Adding Admins

To grant admin privileges:

1. Open `admin.json`.
2. Add user IDs to the `admins` array.

Example:

```json
// admin.json
{
  "admins": [
    { "id": "123456789" },
    // Add more admin IDs as needed
  ]
}
```

---

## 5. Express Server and Pages

### Adding Custom Pages

Extend the express server by creating HTML pages in the `public` directory. Update the array in `startExpressServer` to include new pages.

Example:

```javascript
// index.js
function startExpressServer() {
    app.use(express.static("public"));

    const pages = ["index", "about", "github", "stats", "custom"];

    pages.forEach(page => {
        app.get(`/${page}`, (req, res) => {
            res.sendFile(path.join(__dirname, "public", `${page}.html`));
        });
    });

    // ... Rest of the code
}
```

Create a new HTML file named `custom.html` in the `public` directory.

---

## 6. AppState and Login

### Getting AppState

Refer to `get-appstate.md` for a guide on obtaining the app state for login.

---

## 7. Auto Reload Commands

Commands auto-reload when changes occur in `scripts/commands`.

---

## 8. Logging and Error Handling

Customize error handling and logging as needed in the `handleCommand` and related functions.

Example:

```javascript
// main.js
function handleCommand(api, event, box) {
    try {
        // ... Command handling code
    } catch (error) {
        console.error("Error occurred while executing command:", error);
        box.reply("An error occurred while processing your request.");
    }
}
```
