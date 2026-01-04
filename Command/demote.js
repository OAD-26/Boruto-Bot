module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!msg.key.remoteJid.endsWith("@g.us")) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });
    const userToDemote = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!userToDemote) return sock.sendMessage(jid, { text: '❌ Mention an admin to demote!' });
    try {
        await sock.groupParticipantsUpdate(jid, [userToDemote], "demote");
        await sock.sendMessage(jid, { text: `✅ User @${userToDemote.split('@')[0]} is no longer an admin! ⬇️`, mentions: [userToDemote] });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to demote. Make sure I am an admin!' });
    }
};