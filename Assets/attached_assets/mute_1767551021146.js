module.exports = {
    name: 'mute',
    description: 'Mute a user for a certain time',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        const userToMute = msg.mentionedJid?.[0];
        if (!userToMute) return sock.sendMessage(jid, { text: '❌ Mention a user to mute!' });

        const minutes = parseInt(text.split(' ')[1]) || 5;
        await sock.sendMessage(jid, { text: `🔇 User ${userToMute.split('@')[0]} muted for ${minutes} minutes (simulated).` });
    }
};
