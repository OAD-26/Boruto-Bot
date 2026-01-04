const axios = require('axios');
const yts = require('yt-search');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const query = text.split(' ').slice(1).join(' ').trim();

    if (!query) return sock.sendMessage(jid, { text: '🎥 Usage: !video <query/url>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎥', key: msg.key } });
        let url = query;
        let title = query;

        if (!query.startsWith('http')) {
            const search = await yts(query);
            if (!search.videos.length) return sock.sendMessage(jid, { text: '❌ No videos found!' });
            url = search.videos[0].url;
            title = search.videos[0].title;
        }

        const res = await axios.get(`https://okatsu-rolezapiiz.vercel.app/downloader/ytmp4?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data?.result?.mp4 || res.data?.url;

        if (videoUrl) {
            await sock.sendMessage(jid, { video: { url: videoUrl }, caption: `🎬 *${title}*\n\n> *_Downloaded by Boruto Bot_*` }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to download video.' });
    }
};