//@Jenica: this ai command is no longer working, please update it with a working api endpoint.

const axios = require("axios");

module.exports = {
    config: {
        name: "ai",
        description: "Interact with an AI to get responses to your questions.",
        usage: ":ai <question>"

    }, 

    onCommand: async ({ api, event, args, box }) => {
        const question = args.join(" ");

        if (question) {
            try {
                const response = await axios.get(`https://hercai.onrender.com/v2/hercai?question=${encodeURIComponent(question)}`);
                const aiResponse = response.data.reply;
                box.send(aiResponse);
            } catch (error) {
                console.error("Error fetching AI response:", error);
                box.reply("Failed to get AI response. Please try again later.");
            }
        } else {
            box.reply("Please provide a question after the command. For example: `:ai Hello`");
        }
    }
};
