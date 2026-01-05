<<<<<<< HEAD
const ownerNumber = '2349138385352@s.whatsapp.net';

module.exports = {
    name: 'clearsession',
    description: 'Clear bot session (owner only)',
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid;

        if (msg.key.participant !== ownerNumber) {
            return sock.sendMessage(jid, { text: '❌ Only the owner can use this command!' });
        }

        try {
            const fs = require('fs');
            fs.rmSync('./auth_info', { recursive: true, force: true });
            await sock.sendMessage(jid, { text: '✅ Bot session cleared! Restart the bot.' });
        } catch (err) {
            await sock.sendMessage(jid, { text: '❌ Failed to clear session.' });
            console.error(err);
        }
    }
};
=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
