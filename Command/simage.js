const sharp = require('sharp');
<<<<<<< HEAD
const fs = require('fs');
const fsPromises = require('fs/promises');
const fse = require('fs-extra');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

const tempDir = './temp';
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

const scheduleFileDeletion = (filePath) => {
    setTimeout(async () => {
        try {
            await fse.remove(filePath);
            console.log(`File deleted: ${filePath}`);
        } catch (error) {
            console.error(`Failed to delete file:`, error);
        }
    }, 10000); // 5 minutes
};

const convertStickerToImage = async (sock, quotedMessage, chatId) => {
    try {
        const stickerMessage = quotedMessage.stickerMessage;
        if (!stickerMessage) {
            await sock.sendMessage(chatId, { text: 'Reply to a sticker with .simage to convert it.' });
            return;
        }

        const stickerFilePath = path.join(tempDir, `sticker_${Date.now()}.webp`);
        const outputImagePath = path.join(tempDir, `converted_image_${Date.now()}.png`);

        const stream = await downloadContentFromMessage(stickerMessage, 'sticker');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        await fsPromises.writeFile(stickerFilePath, buffer);
        await sharp(stickerFilePath).toFormat('png').toFile(outputImagePath);

        const imageBuffer = await fsPromises.readFile(outputImagePath);
        await sock.sendMessage(chatId, { image: imageBuffer, caption: 'Here is the converted image!' });

        scheduleFileDeletion(stickerFilePath);
        scheduleFileDeletion(outputImagePath);
    } catch (error) {
        console.error('Error converting sticker to image:', error);
        await sock.sendMessage(chatId, { text: 'An error occurred while converting the sticker.' });
    }
};

module.exports = convertStickerToImage;
=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
