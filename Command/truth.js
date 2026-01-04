const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        await sock.sendMessage(jid, { react: { text: '🤔', key: msg.key } });
        const res = await fetch('https://shizoapi.onrender.com/api/texts/truth?apikey=shizo');
        const json = await res.json();
        await sock.sendMessage(jid, { text: `🤔 *TRUTH*:\n\n${json.result}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch truth.' });
    }
};