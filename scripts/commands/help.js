const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "help",
    description: "Shows a list of available commands.",
    usage: ":help [command/page]",
    author: "Jenica",
    license: "ISC",
  },
  onCommand: ({ args, api, event }) => {
    const commandFiles = fs.readdirSync(__dirname).filter((file) => file.endsWith(".js") && file !== "help.js");
    const totalCommands = commandFiles.length;
    const commandsPerPage = 5;
    const totalPages = Math.ceil(totalCommands / commandsPerPage);

    const createCommandListMessage = (commandFiles, totalPages, commandsPerPage) => {
      let helpMessage = "Please edit this help command.:\n\n";
      commandFiles.forEach((file, index) => {
        const commandName = path.basename(file, ".js");
        const command = require(`./${commandName}`);
        const { name, description } = command.config;
        helpMessage += `🔹 ${index + 1}. ${name || " No Name"} -> ${description || "No description"}\n`;
        
      });

      helpMessage += `\ Page[  1/${totalPages} ]`;
      return helpMessage;
    };

    const showCommandDetails = (commandName, commandFiles, api, event) => {
      const reqCmd = require(`./${commandName}.js`);
      const { name, description, usage, author, license, version } = reqCmd.config;

      const commandMessage = `📝 **${name || "Guide:"}**
  📝 Created by: ${author || "Anonymous"}
  💻 Version: ${version || "1.0"}
  🔍 Description:\n${description || "It's a mystery"}
  💡 Usage:\n${usage || "Guess it"}
  📍 License:\n${license || "No text provided"}`;

      api.sendMessage(commandMessage, event.threadID);
    };

    const showCommandListByPage = (page, commandFiles, api, event) => {
      const commandsPerPage = 5;
      const startIndex = (page - 1) * commandsPerPage;
      const endIndex = startIndex + commandsPerPage;
      const displayedCommands = commandFiles.slice(startIndex, endIndex);

      if (displayedCommands.length > 0) {
        const pageMessage = createCommandListMessage(displayedCommands, page, commandsPerPage);
        api.sendMessage(pageMessage, event.threadID, event.messageID);
      } else {
        api.sendMessage(`Invalid page number. There are only ${Math.ceil(commandFiles.length / commandsPerPage)} pages.`, event.threadID);
      }
    };

    if (args.length === 0) {
      const helpMessage = createCommandListMessage(commandFiles, totalPages, commandsPerPage);
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const parsedArg = parseInt(args[0]);
      if (isNaN(parsedArg) || parsedArg <= 0) {
        showCommandDetails(args[0], commandFiles, api, event);
      } else {
        showCommandListByPage(parsedArg, commandFiles, api, event);
      }
    }
  },
};
