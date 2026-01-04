module.exports = async (sock, msg, config) => {
    if (!msg.key.remoteJid.endsWith("@g.us")) {
        return await sock.sendMessage(msg.key.remoteJid, { text: "❌ This command only works in groups!" });
    }
    
    const metadata = await sock.groupMetadata(msg.key.remoteJid);
    const participants = metadata.participants;
    const mentions = participants.map(p => p.id);
    
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const hidetagText = text.slice(config.prefix.length + 7).trim() || "📢 Broadcast";

    await sock.sendMessage(msg.key.remoteJid, { 
        text: hidetagText, 
        mentions: mentions 
    });
};