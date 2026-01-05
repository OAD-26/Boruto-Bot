const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await axios.get('https://api.quotable.io/random').catch(() => ({ data: { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" } }));
        const quote = res.data;
        await sock.sendMessage(jid, { text: `📜 *QUOTE*\n\n"${quote.content}"\n\n— _${quote.author}_` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch quote.' });
    }
};