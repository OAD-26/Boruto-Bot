const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const url = text.split(' ').slice(1).join(' ').trim();

    if (!url) return sock.sendMessage(jid, { text: '🔗 Usage: !shorten <url>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🔗', key: msg.key } });
        const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        await sock.sendMessage(jid, { text: `🔗 *SHORTENED URL*\n\nOriginal: ${url}\nShort: ${res.data}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to shorten URL.' });
    }
};