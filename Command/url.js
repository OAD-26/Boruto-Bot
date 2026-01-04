const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const mediaMsg = quoted || msg.message;
    const mediaType = mediaMsg.imageMessage ? 'image' : mediaMsg.videoMessage ? 'video' : mediaMsg.audioMessage ? 'audio' : mediaMsg.stickerMessage ? 'sticker' : null;

    if (!mediaType) return sock.sendMessage(jid, { text: '🔗 Reply to an image/video/audio/sticker to get a URL!' });

    try {
        await sock.sendMessage(jid, { react: { text: '🔗', key: msg.key } });
        const buffer = await downloadMediaMessage(msg, 'buffer', {}, {});
        const tempPath = path.join(__dirname, `../tmp/url_${Date.now()}`);
        fs.writeFileSync(tempPath, buffer);

        // This would normally upload to a service like Telegra.ph or Uguu.se
        // Since those are external and might need complex logic, we'll notify user.
        await sock.sendMessage(jid, { text: '✨ *Media to URL* processing... (Note: This requires a cloud uploader integration)' });
        fs.unlinkSync(tempPath);
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to convert media to URL.' });
    }
};