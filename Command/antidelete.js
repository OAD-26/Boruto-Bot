<<<<<<< HEAD
const ownerNumber = '2349138385352@s.whatsapp.net';
let antiDelete = false;

module.exports = {
    name: 'antidelete',
    description: 'Turn anti-delete on/off (owner only)',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        if (msg.key.participant !== ownerNumber) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });

        if (!text || !['on','off'].includes(text.toLowerCase()))
            return sock.sendMessage(jid, { text: '❌ Usage: !antidelete on|off' });

        antiDelete = text.toLowerCase() === 'on';
        await sock.sendMessage(jid, { text: `✅ Anti-delete turned *${text.toLowerCase()}*` });
    }
};
=======
const fs = require('fs');
const path = require('path');
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const status = text.split(" ")[1]?.toLowerCase();
    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });
    if (!['on', 'off'].includes(status)) return sock.sendMessage(jid, { text: `❌ Usage: ${config.prefix}antidelete on|off` });
    const settingsPath = path.join(__dirname, "../data/groupSettings.json");
    let settings = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath)) : {};
    if (!settings.global) settings.global = {};
    settings.global.antidelete = (status === 'on');
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    await sock.sendMessage(jid, { text: `✅ Anti-delete turned *${status.toUpperCase()}*! 🛡️` });
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
