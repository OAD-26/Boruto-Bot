const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        await sock.sendMessage(jid, { text: `💡 *Fact*: ${res.data.text}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch fact.' });
    }
};