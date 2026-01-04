module.exports = {
    name: 'kick',
    description: 'Kick a user from the group',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        if (!msg.key.participant) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });

        const userToKick = msg.mentionedJid?.[0];
        if (!userToKick) return sock.sendMessage(jid, { text: '❌ Mention a user to kick!' });

        // Placeholder for kicking (requires admin)
        await sock.sendMessage(jid, { text: `✅ User ${userToKick.split('@')[0]} has been kicked (simulated).` });
    }
};
