module.exports = {
    name: 'promote',
    description: 'Promote a user to admin',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        if (!msg.key.participant) return sock.sendMessage(jid, { text: '❌ This command can only be used in groups!' });

        const userToPromote = msg.mentionedJid?.[0];
        if (!userToPromote) return sock.sendMessage(jid, { text: '❌ Mention a user to promote!' });

        await sock.sendMessage(jid, { text: `✅ User ${userToPromote.split('@')[0]} is now an admin (simulated).` });
    }
};
