const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

<<<<<<< HEAD
async function viewonceCommand(sock, chatId, message) {
    // Extract quoted imageMessage or videoMessage from your structure
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const quotedImage = quoted?.imageMessage;
    const quotedVideo = quoted?.videoMessage;

    if (quotedImage && quotedImage.viewOnce) {
        // Download and send the image
        const stream = await downloadContentFromMessage(quotedImage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        await sock.sendMessage(chatId, { image: buffer, fileName: 'media.jpg', caption: quotedImage.caption || '' }, { quoted: message });
    } else if (quotedVideo && quotedVideo.viewOnce) {
        // Download and send the video
        const stream = await downloadContentFromMessage(quotedVideo, 'video');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        await sock.sendMessage(chatId, { video: buffer, fileName: 'media.mp4', caption: quotedVideo.caption || '' }, { quoted: message });
    } else {
        await sock.sendMessage(chatId, { text: '❌ Please reply to a view-once image or video.' }, { quoted: message });
    }
}

module.exports = viewonceCommand; 
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const viewOnce = quoted?.viewOnceMessageV2?.message || quoted?.viewOnceMessage?.message;
    const media = viewOnce?.imageMessage || viewOnce?.videoMessage;

    if (!media) return sock.sendMessage(jid, { text: '❌ Please reply to a view-once image or video.' });

    try {
        await sock.sendMessage(jid, { react: { text: '🔓', key: msg.key } });
        const type = viewOnce.imageMessage ? 'image' : 'video';
        const stream = await downloadContentFromMessage(media, type);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        
        const content = {};
        content[type] = buffer;
        content.caption = media.caption || `✅ View-once ${type} extracted!`;
        
        await sock.sendMessage(jid, content, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to extract view-once media.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
