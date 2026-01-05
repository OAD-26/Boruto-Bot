const ownerNumber = '2349138385352@s.whatsapp.net';
let autoReact = false; // Global flag

module.exports = {
    name: 'autoreact',
    description: 'Turn auto react on/off (owner only)',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;

        if (msg.key.participant !== ownerNumber) {
            return sock.sendMessage(jid, { text: '❌ Only the owner can use this command!' });
        }

        if (!text || !['on', 'off'].includes(text.toLowerCase())) {
            return sock.sendMessage(jid, { text: '❌ Usage: !autoreact on|off' });
        }

        autoReact = text.toLowerCase() === 'on';
        await sock.sendMessage(jid, { text: `✅ Auto react turned *${text.toLowerCase()}*` });
    }
};
