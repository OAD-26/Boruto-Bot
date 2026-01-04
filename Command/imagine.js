const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const prompt = text.split(' ').slice(1).join(' ').trim();

    if (!prompt) return sock.sendMessage(jid, { text: 'Please provide a prompt for the image!' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎨', key: msg.key } });
        const res = await axios.get(`https://shizoapi.onrender.com/api/ai/imagine?apikey=shizo&query=${encodeURIComponent(prompt)}`, { responseType: 'arraybuffer' });
        await sock.sendMessage(jid, { image: Buffer.from(res.data), caption: `🎨 *Generated Image for:* ${prompt}` }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to generate image.' });
    }
};