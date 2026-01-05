const axios = require('axios');

<<<<<<< HEAD
module.exports = async function (sock, chatId) {
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
    try {
        const response = await axios.get('https://icanhazdadjoke.com/', {
            headers: { Accept: 'application/json' }
        });
<<<<<<< HEAD
        const joke = response.data.joke;
        await sock.sendMessage(chatId, { text: joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch a joke right now.' });
    }
};
=======
        await sock.sendMessage(jid, { text: `😂 *Joke*: ${response.data.joke}` });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch joke.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
