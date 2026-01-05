const fetch = require('node-fetch');

<<<<<<< HEAD
async function shayariCommand(sock, chatId, message) {
    try {
        const response = await fetch('https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo');
        const data = await response.json();
        
        if (!data || !data.result) {
            throw new Error('Invalid response from API');
        }

        const buttons = [
            { buttonId: '.shayari', buttonText: { displayText: 'Shayari 🪄' }, type: 1 },
            { buttonId: '.roseday', buttonText: { displayText: '🌹 RoseDay' }, type: 1 }
        ];

        await sock.sendMessage(chatId, { 
            text: data.result,
            buttons: buttons,
            headerType: 1
        }, { quoted: message });
    } catch (error) {
        console.error('Error in shayari command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to fetch shayari. Please try again later.',
        }, { quoted: message });
    }
}

module.exports = { shayariCommand }; 
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch('https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo');
        const json = await res.json();
        await sock.sendMessage(jid, { text: `🪄 *SHAYARI*:\n\n${json.result}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch shayari.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
