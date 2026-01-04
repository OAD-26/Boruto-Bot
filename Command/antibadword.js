const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const args = text.split(" ");
    const status = args[1]?.toLowerCase();

    if (!['on', 'off'].includes(status)) {
        return sock.sendMessage(jid, { text: `❌ Usage: ${config.prefix}antibadword <on/off>` });
    }

    // Load current settings
    const settingsPath = path.join(__dirname, "../data/groupSettings.json");
    let settings = {};
    if (fs.existsSync(settingsPath)) {
        settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    }

    // Update status for this group
    if (!settings[jid]) settings[jid] = {};
    settings[jid].antibadword = (status === 'on');

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    await sock.sendMessage(jid, { text: `✅ Anti-badword is now ${status.toUpperCase()} for this group!` });
};