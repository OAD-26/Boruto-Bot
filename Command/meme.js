const fetch = require('node-fetch');

<<<<<<< HEAD
async function memeCommand(sock, chatId, message) {
    try {
        const response = await fetch('https://shizoapi.onrender.com/api/memes/cheems?apikey=shizo');
        
        // Check if response is an image
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('image')) {
            const imageBuffer = await response.buffer();
            
            const buttons = [
                { buttonId: '.meme', buttonText: { displayText: '🎭 Another Meme' }, type: 1 },
                { buttonId: '.joke', buttonText: { displayText: '😄 Joke' }, type: 1 }
            ];

            await sock.sendMessage(chatId, { 
                image: imageBuffer,
                caption: "> Here's your cheems meme! 🐕",
                buttons: buttons,
                headerType: 1
            },{ quoted: message});
        } else {
            throw new Error('Invalid response type from API');
        }
    } catch (error) {
        console.error('Error in meme command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to fetch meme. Please try again later.'
        },{ quoted: message });
    }
}

module.exports = memeCommand;
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch('https://shizoapi.onrender.com/api/memes/cheems?apikey=shizo');
        const buffer = await res.buffer();
        await sock.sendMessage(jid, { image: buffer, caption: "🎭 *Cheems Meme* 🐕" }, { quoted: msg });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch meme.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
