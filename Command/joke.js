const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const response = await axios.get('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
        });
        await sock.sendMessage(jid, { text: `😂 *Joke*: ${response.data.joke}` });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch joke.' });
    }
};