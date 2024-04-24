const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'nemoo',
  '+ai',
  'nemo',
  'ai',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("Hey I'm your virtual assistant 🦥, ask you a question 😉");
        return;
      }

      // Add waiting message
      const mid = message.messageID;
      const tid = message.threadID;
      api.setMessageReaction("🔍", mid, (err) => {}, true);
      api.sendMessage("⏳ Searching for the answer, please wait...", tid, mid);

      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

      // Remove waiting message
      api.setMessageReaction("❌", mid, (err) => {}, true);

      await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
