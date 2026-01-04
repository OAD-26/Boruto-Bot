const ownerNumber = '2349138385352@s.whatsapp.net';
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'cleartmp',
    description: 'Clear temporary bot files (owner only)',
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid;
        if (msg.key.participant !== ownerNumber) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });

        try {
            const tmpFolder = path.join(__dirname, '../tmp');
            if (fs.existsSync(tmpFolder)) fs.rmSync(tmpFolder, { recursive: true, force: true });
            await sock.sendMessage(jid, { text: '✅ Temporary files cleared!' });
        } catch (err) {
            await sock.sendMessage(jid, { text: '❌ Failed to clear tmp files' });
            console.error(err);
        }
    }
};
