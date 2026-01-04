const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const query = text.split(' ').slice(1).join(' ').trim();

    if (!query) {
        return sock.sendMessage(jid, { text: `❌ Please provide text after the ${config.prefix}attp command.` });
    }

    try {
        await sock.sendMessage(jid, { react: { text: '🎨', key: msg.key } });
        
        // Using a reliable API for ATTP as local rendering requires many dependencies
        const url = `https://api.erdwpe.com/api/maker/attp?text=${encodeURIComponent(query)}`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        
        await sock.sendMessage(jid, { sticker: Buffer.from(response.data) }, { quoted: msg });
    } catch (error) {
        console.error('Error generating attp sticker:', error);
        await sock.sendMessage(jid, { text: '❌ Failed to generate the sticker. Please try again later.' });
    }
};