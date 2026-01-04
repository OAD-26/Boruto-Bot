const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const url = text.split(' ').slice(1).join(' ').trim();

    if (!url) return sock.sendMessage(jid, { text: '📸 Usage: !ss <url>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🖼️', key: msg.key } });
        const apiUrl = `https://api.siputzx.my.id/api/tools/ssweb?url=${encodeURIComponent(url)}&theme=light&device=desktop`;
        const res = await fetch(apiUrl);
        const buffer = await res.buffer();
        await sock.sendMessage(jid, { image: buffer, caption: `✅ Screenshot of: ${url}` }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Screenshot failed.' });
    }
};