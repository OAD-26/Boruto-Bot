const fs = require('fs');
const path = require('path');
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const mode = text.split(" ")[1]?.toLowerCase();
    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });
    if (!['public', 'private'].includes(mode)) return sock.sendMessage(jid, { text: `❌ Usage: ${config.prefix}mode public|private` });
    const settingsPath = path.join(__dirname, "../data/groupSettings.json");
    let settings = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath)) : {};
    if (!settings.global) settings.global = {};
    settings.global.mode = mode;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    await sock.sendMessage(jid, { text: `✅ Bot mode changed to *${mode.toUpperCase()}*! ⚙️` });
};