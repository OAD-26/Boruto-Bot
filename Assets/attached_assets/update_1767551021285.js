const ownerNumber = '2349138385352@s.whatsapp.net';

module.exports = {
    name: 'update',
    description: 'Update bot (owner only)',
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid;
        if (msg.key.participant !== ownerNumber) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });

        await sock.sendMessage(jid, { text: '⚡ Bot update started (manual update needed)!' });
    }
};
