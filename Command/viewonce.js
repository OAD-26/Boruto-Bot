const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

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