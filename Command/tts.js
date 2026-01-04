const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1).join(' ').trim();

    if (!args) return sock.sendMessage(jid, { text: '🗣️ Usage: !tts <text>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🗣️', key: msg.key } });
        const gtts = new gTTS(args, 'en');
        const tempPath = path.join(__dirname, `../tmp/tts_${Date.now()}.mp3`);
        
        gtts.save(tempPath, async (err) => {
            if (err) throw err;
            await sock.sendMessage(jid, { audio: { url: tempPath }, mimetype: 'audio/mpeg' }, { quoted: msg });
            fs.unlinkSync(tempPath);
        });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ TTS conversion failed.' });
    }
};