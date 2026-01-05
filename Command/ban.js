<<<<<<< HEAD
module.exports = {
    name: 'ban',
    description: 'Ban a user from the group',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        if (!msg.key.participant) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });

        const userToBan = msg.mentionedJid?.[0];
        if (!userToBan) return sock.sendMessage(jid, { text: '❌ Mention a user to ban!' });

        // This is just a placeholder, actual ban requires group admin privileges
        await sock.sendMessage(jid, { text: `✅ User ${userToBan.split('@')[0]} has been banned (simulated).` });
    }
};
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!msg.key.remoteJid.endsWith("@g.us")) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });
    const userToBan = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!userToBan) return sock.sendMessage(jid, { text: '❌ Mention a user to ban!' });
    try {
        await sock.groupParticipantsUpdate(jid, [userToBan], "remove");
        await sock.sendMessage(jid, { text: `✅ User @${userToBan.split('@')[0]} has been banned! 🚫`, mentions: [userToBan] });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to ban. Make sure I am an admin!' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
