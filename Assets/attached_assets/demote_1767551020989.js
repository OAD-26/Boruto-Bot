module.exports = {
    name: 'demote',
    description: 'Demote an admin',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        if (!msg.key.participant) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });

        const userToDemote = msg.mentionedJid?.[0];
        if (!userToDemote) return sock.sendMessage(jid, { text: '❌ Mention a user to demote!' });

        await sock.sendMessage(jid, { text: `✅ User ${userToDemote.split('@')[0]} is no longer an admin (simulated).` });
    }
};
