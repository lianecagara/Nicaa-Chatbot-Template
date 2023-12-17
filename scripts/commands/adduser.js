module.exports = {
  config: {
    name: "adduser",
    description: "Adds a user to a thread by UID",
    usage: ":adduser <uid>",
    author: "LiANE | Bug fixed by Jenica",
  },
  onCommand: async ({ box, args }) => {
    const [uid] = args;

    try {
      await box.add(uid);
    } catch (error) {
      box.reply("An error occurred while adding the participant.");
    }
  },
};
