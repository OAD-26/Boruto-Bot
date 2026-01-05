module.exports = {
    name: 'alive',
    description: 'Check if bot is alive',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        await sock.sendMessage(jid, { text: '✅ I am alive!' });
    }
};
