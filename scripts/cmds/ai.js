const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');
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

    if (!question) return api.sendMessage("Please provide a question first.", event.threadID, event.messageID);

    
    try {
      api.sendMessage("🔍 | AI is searching for your answer. Please wait...", event.threadID, event.messageID);
      
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

      const timeString = moment.tz('Asia/Manila').format('LLLL');

      api.sendMessage({
            body: `𝙍𝙀𝙎𝙋𝙊𝙉𝘿 𝘼𝙄 🤖\n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${question}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n\nquestion asked by

 
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
