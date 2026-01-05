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
