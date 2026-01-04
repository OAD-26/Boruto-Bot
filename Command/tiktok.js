const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const url = text.split(' ').slice(1).join(' ').trim();

    if (!url) return sock.sendMessage(jid, { text: '📱 Usage: !tiktok <url>' });

    try {
        await sock.sendMessage(jid, { react: { text: '📱', key: msg.key } });
        const res = await axios.get(`https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(url)}`);
        if (res.data?.status && res.data?.data?.urls?.[0]) {
            await sock.sendMessage(jid, { video: { url: res.data.data.urls[0] }, caption: '📱 *TikTok Video Downloaded*' }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ TikTok download failed.' });
    }
};