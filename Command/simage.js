const sharp = require('sharp');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (!quoted?.stickerMessage) return sock.sendMessage(jid, { text: '❌ Reply to a sticker to convert it to image!' });

    try {
        await sock.sendMessage(jid, { react: { text: '🖼️', key: msg.key } });
        const buffer = await downloadMediaMessage({ message: { stickerMessage: quoted.stickerMessage } }, 'buffer', {}, {});
        const image = await sharp(buffer).toFormat('png').toBuffer();
        await sock.sendMessage(jid, { image, caption: '✅ Converted to image!' }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to convert sticker.' });
    }
};