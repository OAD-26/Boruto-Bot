module.exports = {
    name: 'unmute',
    description: 'Unmute a user',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        const userToUnmute = msg.mentionedJid?.[0];
        if (!userToUnmute) return sock.sendMessage(jid, { text: '❌ Mention a user to unmute!' });

        await sock.sendMessage(jid, { text: `🔊 User ${userToUnmute.split('@')[0]} has been unmuted (simulated).` });
    }
};
