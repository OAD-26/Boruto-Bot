const axios = require('axios');
<<<<<<< HEAD
const { channelInfo } = require('../lib/messageConfig');

async function wastedCommand(sock, chatId, message) {
    let userToWaste;
    
    // Check for mentioned users
    if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        userToWaste = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
    }
    // Check for replied message
    else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
        userToWaste = message.message.extendedTextMessage.contextInfo.participant;
    }
    
    if (!userToWaste) {
        await sock.sendMessage(chatId, { 
            text: 'Please mention someone or reply to their message to waste them!', 
            ...channelInfo 
        }, { quoted: message });
        return;
    }

    try {
        // Get user's profile picture
        let profilePic;
        try {
            profilePic = await sock.profilePictureUrl(userToWaste, 'image');
        } catch {
            profilePic = 'https://i.imgur.com/2wzGhpF.jpeg'; // Default image if no profile pic
        }

        // Get the wasted effect image
        const wastedResponse = await axios.get(
            `https://some-random-api.com/canvas/overlay/wasted?avatar=${encodeURIComponent(profilePic)}`,
            { responseType: 'arraybuffer' }
        );

        // Send the wasted image
        await sock.sendMessage(chatId, {
            image: Buffer.from(wastedResponse.data),
            caption: `⚰️ *Wasted* : ${userToWaste.split('@')[0]} 💀\n\nRest in pieces!`,
            mentions: [userToWaste],
            ...channelInfo
        });

    } catch (error) {
        console.error('Error in wasted command:', error);
        await sock.sendMessage(chatId, { 
            text: 'Failed to create wasted image! Try again later.',
            ...channelInfo 
        }, { quoted: message });
    }
}

module.exports = wastedCommand; 
=======

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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
