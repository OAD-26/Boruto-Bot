const fetch = require('node-fetch');

<<<<<<< HEAD
async function lyricsCommand(sock, chatId, songTitle, message) {
    if (!songTitle) {
        await sock.sendMessage(chatId, { 
            text: '🔍 Please enter the song name to get the lyrics! Usage: *lyrics <song name>*'
        },{ quoted: message });
        return;
    }

    try {
        // Use lyricsapi.fly.dev and return only the raw lyrics text
        const apiUrl = `https://lyricsapi.fly.dev/api/lyrics?q=${encodeURIComponent(songTitle)}`;
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            const errText = await res.text();
            throw errText;
        }
        
        const data = await res.json();

        const lyrics = data && data.result && data.result.lyrics ? data.result.lyrics : null;
        if (!lyrics) {
            await sock.sendMessage(chatId, {
                text: `❌ Sorry, I couldn't find any lyrics for "${songTitle}".`
            },{ quoted: message });
            return;
        }

        const maxChars = 4096;
        const output = lyrics.length > maxChars ? lyrics.slice(0, maxChars - 3) + '...' : lyrics;

        await sock.sendMessage(chatId, { text: output }, { quoted: message });
    } catch (error) {
        console.error('Error in lyrics command:', error);
        await sock.sendMessage(chatId, { 
            text: `❌ An error occurred while fetching the lyrics for "${songTitle}".`
        },{ quoted: message });
    }
}

module.exports = { lyricsCommand };
=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
