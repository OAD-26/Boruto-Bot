<<<<<<< HEAD
const ownerNumber = '2349138385352@s.whatsapp.net'; // Your WhatsApp number in international format

module.exports = {
    name: 'mode',
    description: 'Change bot mode: public/private (owner only)',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;

        // Check if sender is owner
        if (msg.key.participant !== ownerNumber) {
            return sock.sendMessage(jid, { text: '❌ Only the owner can use this command!' });
        }

        if (!text || !['public', 'private'].includes(text.toLowerCase())) {
            return sock.sendMessage(jid, { text: '❌ Usage: !mode public|private' });
        }

        const mode = text.toLowerCase();
        // Here you would set a variable or flag in your bot code
        // For example: global.botMode = mode;

        await sock.sendMessage(jid, { text: `✅ Bot mode changed to *${mode}*` });
    }
};
=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
