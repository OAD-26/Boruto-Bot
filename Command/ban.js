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
