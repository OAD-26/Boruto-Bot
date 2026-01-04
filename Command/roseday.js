const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    try {
        const res = await fetch(`https://api.princetechn.com/api/fun/roseday?apikey=prince`);
        const json = await res.json();
        await sock.sendMessage(jid, { text: `🌹 *ROSE DAY*:\n\n${json.result}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch rose day quote.' });
    }
};