const ownerNumber = '2349138385352@s.whatsapp.net';
let autoStatus = false; // Global flag, you can store it elsewhere

module.exports = {
    name: 'autostatus',
    description: 'Turn auto status on/off (owner only)',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;

        if (msg.key.participant !== ownerNumber) {
            return sock.sendMessage(jid, { text: '❌ Only the owner can use this command!' });
        }

        if (!text || !['on', 'off'].includes(text.toLowerCase())) {
            return sock.sendMessage(jid, { text: '❌ Usage: !autostatus on|off' });
        }

        autoStatus = text.toLowerCase() === 'on';
        await sock.sendMessage(jid, { text: `✅ Auto status turned *${text.toLowerCase()}*` });
    }
};
