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
      const userData = await api.getUserInfo(event.senderID);
      const userName = userData[event.senderID].name;
      
      api.setMessageReaction("⏳", event.messageID);
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("Hey I'm your virtual assistant 🦥, ask you a question 😉");
        return;
      }

      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;
      
      if (response.data) {
        const reply = response.data.reply;
        api.sendMessage(`🔥 | Herc.ai\n━━━━━━━━━━━━━━━\n${reply}\n\n🗣️ | Question asked by ${userName}`, event.threadID, event.messageID);
        api.setMessageReaction("✅", event.messageID);
      }
      
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
