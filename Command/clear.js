module.exports = {
    name: 'clear',
    description: 'Clear messages or warnings',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        await sock.sendMessage(jid, { text: '✅ Messages/warnings cleared (simulated).' });
    }
};
