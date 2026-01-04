const fs = require("fs");
const path = require("path");

const welcomerDataFile = path.join(__dirname, "..", "data", "welcomer.json");
let welcomerData = fs.existsSync(welcomerDataFile)
  ? JSON.parse(fs.readFileSync(welcomerDataFile))
  : { groups: {} };

module.exports = {
  name: "welcome",
  description: "Send welcome messages with emojis",
  async execute(sock, participant, groupId) {
    if (!welcomerData.groups[groupId]?.enabled) return;

    const userName = participant.split("@")[0];
    const welcomeText = `👋✨ Welcome @${userName} to our group! 🎉\nPlease read the rules 📜 and enjoy your stay 😎`;
    
    await sock.sendMessage(groupId, { text: welcomeText, mentions: [participant] });
  },
};