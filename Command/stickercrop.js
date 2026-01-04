const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const media = quoted?.imageMessage || msg.message?.imageMessage || quoted?.stickerMessage;

    if (!media) return sock.sendMessage(jid, { text: '✂️ Reply to an image/sticker to crop it!' });

    try {
        await sock.sendMessage(jid, { react: { text: '✂️', key: msg.key } });
        const buffer = await downloadMediaMessage(msg, 'buffer', {}, {});
        const tempIn = path.join('./tmp', `crop_in_${Date.now()}`);
        const tempOut = path.join('./tmp', `crop_out_${Date.now()}.webp`);
        fs.writeFileSync(tempIn, buffer);

        await new Promise((res, rej) => {
            exec(`ffmpeg -i "${tempIn}" -vf "crop=min(iw\\,ih):min(iw\\,ih),scale=512:512" "${tempOut}"`, (err) => err ? rej(err) : res());
        });

        await sock.sendMessage(jid, { sticker: fs.readFileSync(tempOut) }, { quoted: msg });
        fs.unlinkSync(tempIn); fs.unlinkSync(tempOut);
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Cropping failed.' });
    }
};