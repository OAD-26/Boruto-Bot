const fetch = require('node-fetch');

<<<<<<< HEAD
async function rosedayCommand(sock, chatId, message) {
    try {
        
        const res = await fetch(`https://api.princetechn.com/api/fun/roseday?apikey=prince`);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        const rosedayMessage = json.result;

        // Send the roseday message
        await sock.sendMessage(chatId, { text: rosedayMessage }, { quoted: message });
    } catch (error) {
        console.error('Error in roseday command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get roseday quote. Please try again later!' }, { quoted: message });
    }
}

module.exports = { rosedayCommand };
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch(`https://api.princetechn.com/api/fun/roseday?apikey=prince`);
        const json = await res.json();
        await sock.sendMessage(jid, { text: `🌹 *ROSE DAY*:\n\n${json.result}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch rose day quote.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
