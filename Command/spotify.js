const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const query = text.split(' ').slice(1).join(' ').trim();

    if (!query) return sock.sendMessage(jid, { text: '🎵 Usage: !spotify <song name>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎧', key: msg.key } });
        const res = await axios.get(`https://okatsu-rolezapiiz.vercel.app/search/spotify?q=${encodeURIComponent(query)}`);
        
        if (res.data?.status && res.data?.result) {
            const r = res.data.result;
            await sock.sendMessage(jid, { audio: { url: r.audio }, mimetype: 'audio/mpeg' }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Spotify fetch failed.' });
    }
};