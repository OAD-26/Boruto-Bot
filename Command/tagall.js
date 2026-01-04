module.exports = async (sock, msg, config) => {
    if (!msg.key.remoteJid.endsWith("@g.us")) {
        return await sock.sendMessage(msg.key.remoteJid, { text: "❌ This command only works in groups!" });
    }
    
    const metadata = await sock.groupMetadata(msg.key.remoteJid);
    const participants = metadata.participants;
    let mentionText = "📢 *Tag All Members*\n\n";
    let mentions = [];

    for (let participant of participants) {
        mentionText += `@${participant.id.split("@")[0]} `;
        mentions.push(participant.id);
    }

    // Send sticker first
    const fs = require("fs");
    const stickerPath = "./Assets/sticktag.webp";
    if (fs.existsSync(stickerPath)) {
        await sock.sendMessage(msg.key.remoteJid, { 
            sticker: fs.readFileSync(stickerPath) 
        });
    }

    // Send mentions
    await sock.sendMessage(msg.key.remoteJid, { 
        text: mentionText, 
        mentions: mentions 
    });
};