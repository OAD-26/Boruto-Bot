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
