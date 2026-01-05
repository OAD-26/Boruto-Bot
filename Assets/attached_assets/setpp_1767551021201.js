const ownerNumber = '2349138385352@s.whatsapp.net';

module.exports = {
    name: 'setpp',
    description: 'Set bot profile picture (owner only)',
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid;
        if (msg.key.participant !== ownerNumber) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });

        if (!msg.message.imageMessage) return sock.sendMessage(jid, { text: '❌ Reply to an image to set as profile picture.' });

        const buffer = msg.message.imageMessage.data;
        try {
            await sock.updateProfilePicture(sock.user.id, { url: buffer });
            await sock.sendMessage(jid, { text: '✅ Profile picture updated!' });
        } catch (err) {
            await sock.sendMessage(jid, { text: '❌ Failed to update profile picture.' });
            console.error(err);
        }
    }
};
