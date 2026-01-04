module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const userToInsult = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
    
    if (!userToInsult) {
        return sock.sendMessage(jid, { text: 'Please mention someone or reply to their message to insult them!' });
    }

    const insults = [
        "You're like a cloud. When you disappear, it's a beautiful day!",
        "You bring everyone so much joy when you leave the room!",
        "I'd agree with you, but then we'd both be wrong.",
        "You're not stupid; you just have bad luck thinking."
    ];

    const insult = insults[Math.floor(Math.random() * insults.length)];
    await sock.sendMessage(jid, { 
        text: `Hey @${userToInsult.split('@')[0]}, ${insult} 🔥`,
        mentions: [userToInsult]
    });
};