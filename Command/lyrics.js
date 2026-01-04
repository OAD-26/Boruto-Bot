const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const song = text.split(' ').slice(1).join(' ').trim();

    if (!song) return sock.sendMessage(jid, { text: '🔍 Please enter a song name!' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎵', key: msg.key } });
        const res = await fetch(`https://lyricsapi.fly.dev/api/lyrics?q=${encodeURIComponent(song)}`);
        const data = await res.json();

        if (data && data.result && data.result.lyrics) {
            await sock.sendMessage(jid, { text: `🎵 *Lyrics for ${song}*:\n\n${data.result.lyrics}` }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (error) {
        await sock.sendMessage(jid, { text: `❌ Could not find lyrics for "${song}".` });
    }
};