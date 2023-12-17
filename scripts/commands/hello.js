module.exports = {
  config: {
    name: "hello",
    description: "Greet the user with 'Hello, World!'",
    author: "Jenica",
    usage: ":hello"
  },

  onCommand: ({ box }) => {
    box.reply("Hello, World!");
  },
};
