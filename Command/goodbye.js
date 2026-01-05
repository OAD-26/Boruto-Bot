module.exports = {
  name: "goodbye",
  description: "Send goodbye messages with emojis",
  async execute(sock, participant, groupId) {
    if (!welcomerData.groups[groupId]?.enabled) return;

    const userName = participant.split("@")[0];
    const goodbyeText = `😢 Bye @${userName}! We will miss you 💔\nHope to see you again soon 🌟`;
    
    await sock.sendMessage(groupId, { text: goodbyeText, mentions: [participant] });
  },
};