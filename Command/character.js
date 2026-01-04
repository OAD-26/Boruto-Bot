module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
    
    if (!mentioned) {
        return sock.sendMessage(jid, { text: '❌ Please mention someone or reply to their message to analyze their character!' });
    }

    const traits = ["Intelligent", "Creative", "Caring", "Brave", "Loyal", "Ambitious", "Friendly", "Honest"];
    const rating = Math.floor(Math.random() * 21) + 80;
    const trait = traits[Math.floor(Math.random() * traits.length)];

    const analysis = `🔮 *Character Analysis* 🔮\n\n👤 *User:* @${mentioned.split('@')[0]}\n✨ *Key Trait:* ${trait}\n🎯 *Overall Rating:* ${rating}%\n\nNote: This is just for fun!`;

    await sock.sendMessage(jid, { text: analysis, mentions: [mentioned] }, { quoted: msg });
};