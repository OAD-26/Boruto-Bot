const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ');
    const sub = args[1]?.toLowerCase();

    const supported = ['nom', 'poke', 'cry', 'kiss', 'pat', 'hug', 'wink', 'face-palm', 'quote'];

    if (!sub || !supported.includes(sub)) {
        return sock.sendMessage(jid, { text: `Usage: ${config.prefix}anime <type>\nTypes: ${supported.join(', ')}` });
    }

    try {
        const res = await axios.get(`https://api.some-random-api.com/animu/${sub}`);
        const data = res.data || {};

        if (data.link) {
            await sock.sendMessage(jid, { image: { url: data.link }, caption: `🏮 Anime: ${sub}` }, { quoted: msg });
        } else if (data.quote) {
            await sock.sendMessage(jid, { text: `📜 *Anime Quote*:\n\n"${data.quote}"` }, { quoted: msg });
        }
    } catch (err) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch anime data.' });
    }
};