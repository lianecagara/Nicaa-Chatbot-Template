const fs = require('fs');

module.exports = {
  config: {
    name: 'eval',
    description: 'Executes the provided JavaScript code',
    usage: ':eval <code>',
    author: 'LiANE | Jenica',
    adminOnly: true,
  },
  onCommand: async ({ api, event, args, box }) => {
    try {
      const code = args.join(' ');
      let result = eval(`(async () => { ${code} })()`);
      if (result) {
        box.reply(JSON.stringify(result.toString()));
      }
    } catch (error) {
      box.reply(`🔥 | Oops! Something went wrong.
Error: ${error.message}`);
    }
  },
};

