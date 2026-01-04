module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!msg.key.remoteJid.endsWith("@g.us")) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });
    const userToKick = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!userToKick) return sock.sendMessage(jid, { text: '❌ Mention a user to kick!' });
    try {
        await sock.groupParticipantsUpdate(jid, [userToKick], "remove");
        await sock.sendMessage(jid, { text: `✅ User @${userToKick.split('@')[0]} has been kicked! 👞`, mentions: [userToKick] });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to kick. Make sure I am an admin!' });
    }
};