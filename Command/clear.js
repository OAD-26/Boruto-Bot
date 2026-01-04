module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    await sock.sendMessage(jid, { text: '✅ Messages/warnings cleared! 🧹' });
};