module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const data = text.split(' ').slice(1).join(' ').trim();

    if (!data) return sock.sendMessage(jid, { text: '🔳 Usage: !qr <text>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🔳', key: msg.key } });
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(data)}`;
        await sock.sendMessage(jid, { image: { url }, caption: `✅ *QR Code generated for:* ${data}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to generate QR code.' });
    }
};