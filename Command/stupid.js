<<<<<<< HEAD
const fetch = require('node-fetch');

async function stupidCommand(sock, chatId, quotedMsg, mentionedJid, sender, args) {
    try {
        // Determine the target user
        let who = quotedMsg 
            ? quotedMsg.sender 
            : mentionedJid && mentionedJid[0] 
                ? mentionedJid[0] 
                : sender;

        // Get the text for the stupid card (default to "im+stupid" if not provided)
        let text = args && args.length > 0 ? args.join(' ') : 'im+stupid';
        
        // Get the profile picture URL
        let avatarUrl;
        try {
            avatarUrl = await sock.profilePictureUrl(who, 'image');
        } catch (error) {
            console.error('Error fetching profile picture:', error);
            avatarUrl = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'; // Default avatar
        }

        // Fetch the stupid card from the API
        const apiUrl = `https://some-random-api.com/canvas/misc/its-so-stupid?avatar=${encodeURIComponent(avatarUrl)}&dog=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        // Get the image buffer
        const imageBuffer = await response.buffer();

        // Send the image with caption
        await sock.sendMessage(chatId, {
            image: imageBuffer,
            caption: `*@${who.split('@')[0]}*`,
            mentions: [who]
        });

    } catch (error) {
        console.error('Error in stupid command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Sorry, I couldn\'t generate the stupid card. Please try again later!'
        });
    }
}

module.exports = { stupidCommand }; 
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant || msg.key.remoteJid;
    
    const pp = await sock.profilePictureUrl(mentioned, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    const url = `https://some-random-api.com/canvas/misc/its-so-stupid?avatar=${encodeURIComponent(pp)}&dog=im+stupid`;
    
    await sock.sendMessage(jid, { image: { url }, caption: `*Stupid Alert!* @${mentioned.split('@')[0]}`, mentions: [mentioned] }, { quoted: msg });
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
