const fetch = require('node-fetch');

<<<<<<< HEAD
async function goodnightCommand(sock, chatId, message) {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/lovenight?apikey=${shizokeys}`);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        const goodnightMessage = json.result;

        // Send the goodnight message
        await sock.sendMessage(chatId, { text: goodnightMessage }, { quoted: message });
    } catch (error) {
        console.error('Error in goodnight command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get goodnight message. Please try again later!' }, { quoted: message });
    }
}

module.exports = { goodnightCommand }; 
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/lovenight?apikey=shizo`);
        const json = await res.json();
        await sock.sendMessage(jid, { text: `😴 *Good Night*:\n\n${json.result}` });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to get message.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
