const yts = require('yt-search');
const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const query = text.split(' ').slice(1).join(' ').trim();

    if (!query) return sock.sendMessage(jid, { text: '🎶 What song do you want to play?' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎵', key: msg.key } });
        const { videos } = await yts(query);
        if (!videos.length) throw new Error();

        const video = videos[0];
        const res = await axios.get(`https://apis-keith.vercel.app/download/dlmp3?url=${video.url}`);
        
        if (res.data?.result?.downloadUrl) {
            await sock.sendMessage(jid, { audio: { url: res.data.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to download song.' });
    }
};