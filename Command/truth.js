const fetch = require('node-fetch');

<<<<<<< HEAD
async function truthCommand(sock, chatId, message) {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        const truthMessage = json.result;

        // Send the truth message
        await sock.sendMessage(chatId, { text: truthMessage }, { quoted: message });
    } catch (error) {
        console.error('Error in truth command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get truth. Please try again later!' }, { quoted: message });
    }
}

module.exports = { truthCommand };
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        await sock.sendMessage(jid, { react: { text: '🤔', key: msg.key } });
        const res = await fetch('https://shizoapi.onrender.com/api/texts/truth?apikey=shizo');
        const json = await res.json();
        await sock.sendMessage(jid, { text: `🤔 *TRUTH*:\n\n${json.result}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch truth.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
