const yts = require('yt-search');
const axios = require('axios');

<<<<<<< HEAD
async function playCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        const searchQuery = text.split(' ').slice(1).join(' ').trim();
        
        if (!searchQuery) {
            return await sock.sendMessage(chatId, { 
                text: "What song do you want to download?"
            });
        }

        // Search for the song
        const { videos } = await yts(searchQuery);
        if (!videos || videos.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: "No songs found!"
            });
        }

        // Send loading message
        await sock.sendMessage(chatId, {
            text: "_Please wait your download is in progress_"
        });

        // Get the first video result
        const video = videos[0];
        const urlYt = video.url;

        // Fetch audio data from API
        const response = await axios.get(`https://apis-keith.vercel.app/download/dlmp3?url=${urlYt}`);
        const data = response.data;

        if (!data || !data.status || !data.result || !data.result.downloadUrl) {
            return await sock.sendMessage(chatId, { 
                text: "Failed to fetch audio from the API. Please try again later."
            });
        }

        const audioUrl = data.result.downloadUrl;
        const title = data.result.title;

        // Send the audio
        await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`
        }, { quoted: message });

    } catch (error) {
        console.error('Error in song2 command:', error);
        await sock.sendMessage(chatId, { 
            text: "Download failed. Please try again later."
        });
    }
}

module.exports = playCommand; 

/*Powered by KNIGHT-BOT*
*Credits to Keith MD*`*/
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const query = text.split(' ').slice(1).join(' ').trim();

    if (!query) return sock.sendMessage(jid, { text: '🎶 What song do you want to play?' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎵', key: msg.key } });
        const { videos } = await yts(query);
        if (!videos.length) throw new Error();

        const video = videos[0];
        const res = await axios.get(`https://apis-keith.vercel.app/download/dlmp3?url=${video.url}`);
        
        if (res.data?.result?.downloadUrl) {
            await sock.sendMessage(jid, { audio: { url: res.data.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to download song.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
