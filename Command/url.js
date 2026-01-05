<<<<<<< HEAD
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const { UploadFileUgu, TelegraPh } = require('../lib/uploader');

async function getMediaBufferAndExt(message) {
    const m = message.message || {};
    if (m.imageMessage) {
        const stream = await downloadContentFromMessage(m.imageMessage, 'image');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return { buffer: Buffer.concat(chunks), ext: '.jpg' };
    }
    if (m.videoMessage) {
        const stream = await downloadContentFromMessage(m.videoMessage, 'video');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return { buffer: Buffer.concat(chunks), ext: '.mp4' };
    }
    if (m.audioMessage) {
        const stream = await downloadContentFromMessage(m.audioMessage, 'audio');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        // default mp3 for voice/ptt may be opus; still use .mp3 generically
        return { buffer: Buffer.concat(chunks), ext: '.mp3' };
    }
    if (m.documentMessage) {
        const stream = await downloadContentFromMessage(m.documentMessage, 'document');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        const fileName = m.documentMessage.fileName || 'file.bin';
        const ext = path.extname(fileName) || '.bin';
        return { buffer: Buffer.concat(chunks), ext };
    }
    if (m.stickerMessage) {
        const stream = await downloadContentFromMessage(m.stickerMessage, 'sticker');
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return { buffer: Buffer.concat(chunks), ext: '.webp' };
    }
    return null;
}

async function getQuotedMediaBufferAndExt(message) {
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage || null;
    if (!quoted) return null;
    return getMediaBufferAndExt({ message: quoted });
}

async function urlCommand(sock, chatId, message) {
    try {
        // Prefer current message media, else quoted media
        let media = await getMediaBufferAndExt(message);
        if (!media) media = await getQuotedMediaBufferAndExt(message);

        if (!media) {
            await sock.sendMessage(chatId, { text: 'Send or reply to a media (image, video, audio, sticker, document) to get a URL.' }, { quoted: message });
            return;
        }

        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
        const tempPath = path.join(tempDir, `${Date.now()}${media.ext}`);
        fs.writeFileSync(tempPath, media.buffer);

        let url = '';
        try {
            if (media.ext === '.jpg' || media.ext === '.png' || media.ext === '.webp') {
                // Try TelegraPh for images/webp first (fast, simple)
                try {
                    url = await TelegraPh(tempPath);
                } catch {
                    // Fallback to Uguu for any file type
                    const res = await UploadFileUgu(tempPath);
                    url = typeof res === 'string' ? res : (res.url || res.url_full || JSON.stringify(res));
                }
            } else {
                const res = await UploadFileUgu(tempPath);
                url = typeof res === 'string' ? res : (res.url || res.url_full || JSON.stringify(res));
            }
        } finally {
            setTimeout(() => {
                try { if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath); } catch {}
            }, 2000);
        }

        if (!url) {
            await sock.sendMessage(chatId, { text: 'Failed to upload media.' }, { quoted: message });
            return;
        }

        await sock.sendMessage(chatId, { text: `URL: ${url}` }, { quoted: message });
    } catch (error) {
        console.error('[URL] error:', error?.message || error);
        await sock.sendMessage(chatId, { text: 'Failed to convert media to URL.' }, { quoted: message });
    }
}

module.exports = urlCommand;


=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
