const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch('https://shizoapi.onrender.com/api/memes/cheems?apikey=shizo');
        const buffer = await res.buffer();
        await sock.sendMessage(jid, { image: buffer, caption: "🎭 *Cheems Meme* 🐕" }, { quoted: msg });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch meme.' });
    }
};