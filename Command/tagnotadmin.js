<<<<<<< HEAD
const isAdmin = require('../lib/isAdmin');

async function tagNotAdminCommand(sock, chatId, senderId, message) {
    try {
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

        if (!isBotAdmin) {
            await sock.sendMessage(chatId, { text: 'Please make the bot an admin first.' }, { quoted: message });
            return;
        }

        if (!isSenderAdmin) {
            await sock.sendMessage(chatId, { text: 'Only admins can use the .tagnotadmin command.' }, { quoted: message });
            return;
        }

        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants || [];

        const nonAdmins = participants.filter(p => !p.admin).map(p => p.id);
        if (nonAdmins.length === 0) {
            await sock.sendMessage(chatId, { text: 'No non-admin members to tag.' }, { quoted: message });
            return;
        }

        let text = '🔊 *Hello Everyone:*\n\n';
        nonAdmins.forEach(jid => {
            text += `@${jid.split('@')[0]}\n`;
        });

        await sock.sendMessage(chatId, { text, mentions: nonAdmins }, { quoted: message });
    } catch (error) {
        console.error('Error in tagnotadmin command:', error);
        await sock.sendMessage(chatId, { text: 'Failed to tag non-admin members.' }, { quoted: message });
    }
}

module.exports = tagNotAdminCommand;


=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    try {
        const metadata = await sock.groupMetadata(jid);
        const isAdmin = metadata.participants.some(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
        if (!isAdmin) return sock.sendMessage(jid, { text: '❌ Admin only command!' });

        const nonAdmins = metadata.participants.filter(p => !p.admin);
        const mentions = nonAdmins.map(p => p.id);
        const list = nonAdmins.map(p => `@${p.id.split('@')[0]}`).join('\n');

        await sock.sendMessage(jid, { text: `🔊 *TAG NON-ADMINS*\n\n${list}`, mentions });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to tag members.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
