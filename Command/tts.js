const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

<<<<<<< HEAD
async function ttsCommand(sock, chatId, text, message, language = 'en') {
    if (!text) {
        await sock.sendMessage(chatId, { text: 'Please provide the text for TTS conversion.' });
        return;
    }

    const fileName = `tts-${Date.now()}.mp3`;
    const filePath = path.join(__dirname, '..', 'assets', fileName);

    const gtts = new gTTS(text, language);
    gtts.save(filePath, async function (err) {
        if (err) {
            await sock.sendMessage(chatId, { text: 'Error generating TTS audio.' });
            return;
        }

        await sock.sendMessage(chatId, {
            audio: { url: filePath },
            mimetype: 'audio/mpeg'
        }, { quoted: message });

        fs.unlinkSync(filePath);
    });
}

module.exports = ttsCommand;
=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
