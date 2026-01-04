const ownerNumber = '2349138385352@s.whatsapp.net';

module.exports = {
    name: 'settings',
    description: 'View bot settings (owner only)',
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid;
        if (msg.key.participant !== ownerNumber) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });

        const status = `
🔧 Bot Settings:
- Auto-react: ${global.autoReact ? 'ON' : 'OFF'}
- Auto-status: ${global.autoStatus ? 'ON' : 'OFF'}
- Anti-call: ${global.antiCall ? 'ON' : 'OFF'}
- Anti-delete: ${global.antiDelete ? 'ON' : 'OFF'}
        `;
        await sock.sendMessage(jid, { text: status });
    }
};
