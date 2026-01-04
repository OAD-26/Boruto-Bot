const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const song = text.split(' ').slice(1).join(' ').trim();

    if (!song) return sock.sendMessage(jid, { text: '🎵 Usage: !song <song name>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎶', key: msg.key } });
        const res = await axios.get(`https://okatsu-rolezapiiz.vercel.app/downloader/ytmp3?url=${encodeURIComponent(song)}`).catch(() => null);
        
        if (res?.data?.dl) {
            await sock.sendMessage(jid, { audio: { url: res.data.dl }, mimetype: 'audio/mpeg' }, { quoted: msg });
        } else {
            // Fallback search
            const play = require('./play.js');
            await play(sock, msg, config);
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to download song.' });
    }
};