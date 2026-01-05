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
