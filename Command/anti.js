const fs = require("fs");
const path = require("path");

const antilinkDataFile = path.join(__dirname, "..", "data", "antilink.json");
let antilinkData = fs.existsSync(antilinkDataFile) ? JSON.parse(fs.readFileSync(antilinkDataFile)) : { groups: {} };

module.exports = {
  name: "anti",
  description: "Anti-link command",
  async execute(sock, msg, groupId) {
    if (!antilinkData.groups[groupId]?.enabled) return;

    if (msg.body.includes("https://") || msg.body.includes("http://")) {
      // Enhanced message with emojis
      await sock.sendMessage(groupId, { text: "⚠️🚫📛 Links are not allowed in this group! ❌" });
      await sock.sendMessage(groupId, { text: `🛑 Removing message from: ${msg.key.participant}` });
    }
  },
};