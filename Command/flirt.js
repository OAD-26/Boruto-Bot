const fetch = require('node-fetch');

<<<<<<< HEAD
async function flirtCommand(sock, chatId, message) {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/flirt?apikey=${shizokeys}`);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        const flirtMessage = json.result;

        // Send the flirt message
        await sock.sendMessage(chatId, { text: flirtMessage }, { quoted: message });
    } catch (error) {
        console.error('Error in flirt command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get flirt message. Please try again later!' }, { quoted: message });
    }
}

module.exports = { flirtCommand }; 
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/flirt?apikey=shizo`);
        const json = await res.json();
        await sock.sendMessage(jid, { text: `💖 *FLIRT*:\n\n${json.result}` });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to get flirt message.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
