const axios = require('axios');

<<<<<<< HEAD
async function soraCommand(sock, chatId, message) {
    try {
        const rawText = message.message?.conversation?.trim() ||
            message.message?.extendedTextMessage?.text?.trim() ||
            message.message?.imageMessage?.caption?.trim() ||
            message.message?.videoMessage?.caption?.trim() ||
            '';

        // Extract prompt after command keyword or use quoted text
        const used = (rawText || '').split(/\s+/)[0] || '.sora';
        const args = rawText.slice(used.length).trim();
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedText = quoted?.conversation || quoted?.extendedTextMessage?.text || '';
        const input = args || quotedText;

        if (!input) {
            await sock.sendMessage(chatId, { text: 'Provide a prompt. Example: .sora anime girl with short blue hair' }, { quoted: message });
            return;
        }

        const apiUrl = `https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(input)}`;
        const { data } = await axios.get(apiUrl, { timeout: 60000, headers: { 'user-agent': 'Mozilla/5.0' } });

        const videoUrl = data?.videoUrl || data?.result || data?.data?.videoUrl;
        if (!videoUrl) {
            throw new Error('No videoUrl in API response');
        }

        await sock.sendMessage(chatId, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: `Prompt: ${input}`
        }, { quoted: message });

    } catch (error) {
        console.error('[SORA] error:', error?.message || error);
        await sock.sendMessage(chatId, { text: 'Failed to generate video. Try a different prompt later.' }, { quoted: message });
    }
}

module.exports = soraCommand;


=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const prompt = text.split(' ').slice(1).join(' ').trim();

    if (!prompt) return sock.sendMessage(jid, { text: '🎥 Provide a prompt for video generation!' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎞️', key: msg.key } });
        const res = await axios.get(`https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(prompt)}`);
        const videoUrl = res.data?.videoUrl || res.data?.result;
        
        if (videoUrl) {
            await sock.sendMessage(jid, { video: { url: videoUrl }, caption: `🎬 *Sora AI Prompt:* ${prompt}` }, { quoted: msg });
        } else {
            throw new Error();
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Video generation failed.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
