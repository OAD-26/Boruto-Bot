const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const url = text.split(' ').slice(1).join(' ').trim();
    
    if (!url || !url.includes('facebook.com')) {
        return sock.sendMessage(jid, { text: "Please provide a valid Facebook video URL!" });
    }

    try {
        await sock.sendMessage(jid, { react: { text: '🎥', key: msg.key } });
        const res = await axios.get(`https://api.hanggts.xyz/download/facebook?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data.result?.media?.video_hd || res.data.result?.media?.video_sd;
        
        if (videoUrl) {
            await sock.sendMessage(jid, { video: { url: videoUrl }, caption: '✅ Downloaded by Boruto Bot' }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to download Facebook video.' });
    }
};