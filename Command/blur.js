const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const sharp = require('sharp');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const imageMsg = quoted?.imageMessage || msg.message?.imageMessage;

    if (!imageMsg) {
        return sock.sendMessage(jid, { text: '❌ Please reply to an image or send an image with caption !blur' });
    }

    try {
        await sock.sendMessage(jid, { react: { text: '🪄', key: msg.key } });
        const buffer = await downloadMediaMessage(
            { message: { imageMessage: imageMsg } },
            'buffer',
            {},
            {}
        );

        const blurredImage = await sharp(buffer)
            .blur(10)
            .toBuffer();

        await sock.sendMessage(jid, {
            image: blurredImage,
            caption: '✅ Image Blurred Successfully! 🪄'
        }, { quoted: msg });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to blur image.' });
    }
};