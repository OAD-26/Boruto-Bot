const fetch = require('node-fetch');

<<<<<<< HEAD
async function dareCommand(sock, chatId, message) {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`);
        
        if (!res.ok) {
            throw await res.text();
        }
        
        const json = await res.json();
        const dareMessage = json.result;

        // Send the dare message
        await sock.sendMessage(chatId, { text: dareMessage }, { quoted: message });
    } catch (error) {
        console.error('Error in dare command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get dare. Please try again later!' }, { quoted: message });
    }
}

module.exports = { dareCommand };
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=shizo`);
        const json = await res.json();
        await sock.sendMessage(jid, { text: `🔥 *DARE*:\n\n${json.result}` }, { quoted: msg });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to get dare.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
