const fetch = require('node-fetch');

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