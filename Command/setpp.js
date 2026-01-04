const { downloadMediaMessage } = require('@whiskeysockets/baileys');
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });
    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.imageMessage) return sock.sendMessage(jid, { text: '❌ Reply to an image to set as profile picture!' });
    try {
        const buffer = await downloadMediaMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage, 'buffer');
        await sock.updateProfilePicture(sock.user.id, buffer);
        await sock.sendMessage(jid, { text: '✅ Profile picture updated successfully! 🖼️' });
    } catch (err) {
        await sock.sendMessage(jid, { text: '❌ Failed to update profile picture.' });
    }
};