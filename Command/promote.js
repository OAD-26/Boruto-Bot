module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!msg.key.remoteJid.endsWith("@g.us")) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });
    const userToPromote = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!userToPromote) return sock.sendMessage(jid, { text: '❌ Mention a user to promote!' });
    try {
        await sock.groupParticipantsUpdate(jid, [userToPromote], "promote");
        await sock.sendMessage(jid, { text: `✅ User @${userToPromote.split('@')[0]} is now an admin! ⬆️`, mentions: [userToPromote] });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to promote. Make sure I am an admin!' });
    }
};