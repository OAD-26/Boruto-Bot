const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const packname = text.split(' ').slice(1).join(' ') || 'Boruto Bot';

    if (!quoted?.stickerMessage) return sock.sendMessage(jid, { text: '📦 Reply to a sticker with !take <packname>' });

    try {
        await sock.sendMessage(jid, { react: { text: '📦', key: msg.key } });
        const buffer = await downloadMediaMessage(msg, 'buffer', {}, {});
        // This normally uses webpmux to change metadata
        await sock.sendMessage(jid, { sticker: buffer }, { quoted: msg });
        await sock.sendMessage(jid, { text: `✅ Sticker "taken" and set to pack: ${packname}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to take sticker.' });
    }
};