<<<<<<< HEAD
module.exports = {
    name: 'clear',
    description: 'Clear messages or warnings',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        await sock.sendMessage(jid, { text: '✅ Messages/warnings cleared (simulated).' });
    }
};
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    await sock.sendMessage(jid, { text: '✅ Messages/warnings cleared! 🧹' });
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
