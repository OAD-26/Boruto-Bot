const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const userToWaste = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
    
    if (!userToWaste) {
        return sock.sendMessage(jid, { text: '💀 Please mention someone or reply to their message to waste them!' });
    }

    try {
        await sock.sendMessage(jid, { react: { text: '⚰️', key: msg.key } });
        const pp = await sock.profilePictureUrl(userToWaste, 'image').catch(() => 'https://i.imgur.com/2wzGhpF.jpeg');
        const url = `https://some-random-api.com/canvas/overlay/wasted?avatar=${encodeURIComponent(pp)}`;
        
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        await sock.sendMessage(jid, { 
            image: Buffer.from(response.data), 
            caption: `⚰️ *Wasted* : @${userToWaste.split('@')[0]} 💀\n\nRest in pieces!`,
            mentions: [userToWaste]
        }, { quoted: msg });

    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to create wasted image!' });
    }
};