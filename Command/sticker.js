const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const media = quoted?.imageMessage || quoted?.videoMessage || msg.message?.imageMessage || msg.message?.videoMessage;

    if (!media) return sock.sendMessage(jid, { text: '🤖 Reply to an image/video to make a sticker!' });

    try {
        await sock.sendMessage(jid, { react: { text: '✨', key: msg.key } });
        const buffer = await downloadMediaMessage(msg, 'buffer', {}, {});
        const tempIn = path.join('./tmp', `stick_in_${Date.now()}`);
        const tempOut = path.join('./tmp', `stick_out_${Date.now()}.webp`);
        fs.writeFileSync(tempIn, buffer);

        await new Promise((res, rej) => {
            exec(`ffmpeg -i "${tempIn}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000" "${tempOut}"`, (err) => err ? rej(err) : res());
        });

        await sock.sendMessage(jid, { sticker: fs.readFileSync(tempOut) }, { quoted: msg });
        fs.unlinkSync(tempIn); fs.unlinkSync(tempOut);
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Sticker creation failed.' });
    }
};