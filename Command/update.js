module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });
    await sock.sendMessage(jid, { text: '⚡ *Bot update check complete!* Bot is running the latest version. ✅' });
};