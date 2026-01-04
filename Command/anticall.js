const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const args = text.split(" ");
    const status = args[1]?.toLowerCase();

    // Check if sender is owner
    if (!config.ownerNumbers.includes(sender.split('@')[0])) {
        return sock.sendMessage(jid, { text: '❌ Only the owner can use this command!' });
    }

    if (!['on', 'off'].includes(status)) {
        return sock.sendMessage(jid, { text: `❌ Usage: ${config.prefix}anticall <on/off>` });
    }

    // Load current settings
    const settingsPath = path.join(__dirname, "../data/groupSettings.json");
    let settings = {};
    if (fs.existsSync(settingsPath)) {
        try {
            settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
        } catch (e) {
            settings = {};
        }
    }

    // Update global status for anticall
    if (!settings.global) settings.global = {};
    settings.global.anticall = (status === 'on');

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    await sock.sendMessage(jid, { text: `✅ Anti-call is now turned *${status.toUpperCase()}*! 📵` });
};