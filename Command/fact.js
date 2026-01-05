const axios = require('axios');

<<<<<<< HEAD
module.exports = async function (sock, chatId, message) {
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        const fact = response.data.text;
        await sock.sendMessage(chatId, { text: fact },{ quoted: message });
    } catch (error) {
        console.error('Error fetching fact:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch a fact right now.' },{ quoted: message });
    }
};
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        await sock.sendMessage(jid, { text: `💡 *Fact*: ${res.data.text}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch fact.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
