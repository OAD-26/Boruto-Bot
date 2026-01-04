module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const userToCompliment = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
    
    if (!userToCompliment) {
        return sock.sendMessage(jid, { text: 'Please mention someone or reply to their message to compliment them!' });
    }

    const compliments = [
        "You're amazing just the way you are!",
        "You have a great sense of humor!",
        "You're incredibly thoughtful and kind.",
        "You are more powerful than you know.",
        "You light up the room!"
    ];

    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    await sock.sendMessage(jid, { 
        text: `Hey @${userToCompliment.split('@')[0]}, ${compliment} ✨`,
        mentions: [userToCompliment]
    });
};