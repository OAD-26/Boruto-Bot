const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ');
    const status = args[1]?.toLowerCase();

    // Check if sender is admin
    let isAdmin = false;
    if (jid.endsWith('@g.us')) {
        const groupMetadata = await sock.groupMetadata(jid);
        isAdmin = groupMetadata.participants.some(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
    }

    if (!isAdmin && !config.ownerNumbers.includes(sender.split('@')[0])) {
        return sock.sendMessage(jid, { text: '❌ This command is for Admins only!' });
    }

    if (!['on', 'off'].includes(status)) {
        return sock.sendMessage(jid, { text: `❌ Usage: ${config.prefix}antitag <on/off>` });
    }

    const settingsPath = path.join(__dirname, "../data/groupSettings.json");
    let settings = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath)) : {};
    if (!settings[jid]) settings[jid] = {};
    settings[jid].antitag = (status === 'on');
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    await sock.sendMessage(jid, { text: `✅ Antitag is now *${status.toUpperCase()}* for this group!` });
};