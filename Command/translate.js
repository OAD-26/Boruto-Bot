const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1);
    const lang = args[0];
    const query = args.slice(1).join(' ');

    if (!lang || !query) return sock.sendMessage(jid, { text: '🌐 Usage: !translate <lang> <text>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🌐', key: msg.key } });
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(query)}`);
        const json = await res.json();
        await sock.sendMessage(jid, { text: `🌐 *TRANSLATION (${lang})*:\n\n${json[0][0][0]}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Translation failed.' });
    }
};