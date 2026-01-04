const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const prompt = text.split(' ').slice(1).join(' ').trim();

    if (!prompt) return sock.sendMessage(jid, { text: '🎥 Provide a prompt for video generation!' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎞️', key: msg.key } });
        const res = await axios.get(`https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(prompt)}`);
        const videoUrl = res.data?.videoUrl || res.data?.result;
        
        if (videoUrl) {
            await sock.sendMessage(jid, { video: { url: videoUrl }, caption: `🎬 *Sora AI Prompt:* ${prompt}` }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Video generation failed.' });
    }
};