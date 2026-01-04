const fs = require('fs');
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    if (!config.ownerNumbers.includes(sender.split('@')[0])) {
        return sock.sendMessage(jid, { text: '❌ Only the owner can use this command!' });
    }
    try {
        fs.rmSync('./auth_info', { recursive: true, force: true });
        await sock.sendMessage(jid, { text: '✅ Bot session cleared! Restart the bot manually to log in again.' });
    } catch (err) {
        await sock.sendMessage(jid, { text: '❌ Failed to clear session.' });
    }
};