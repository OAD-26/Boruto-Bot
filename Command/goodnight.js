const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/lovenight?apikey=shizo`);
        const json = await res.json();
        await sock.sendMessage(jid, { text: `😴 *Good Night*:\n\n${json.result}` });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to get message.' });
    }
};