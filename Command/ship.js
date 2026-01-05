<<<<<<< HEAD
async function shipCommand(sock, chatId, msg, groupMetadata) {
    try {
        // Get all participants from the group
        const participants = await sock.groupMetadata(chatId);
        const ps = participants.participants.map(v => v.id);
        
        // Get two random participants
        let firstUser, secondUser;
        
        // Select first random user
        firstUser = ps[Math.floor(Math.random() * ps.length)];
        
        // Select second random user (different from first)
        do {
            secondUser = ps[Math.floor(Math.random() * ps.length)];
        } while (secondUser === firstUser);

        // Format the mentions
        const formatMention = id => '@' + id.split('@')[0];

        // Create and send the ship message
        await sock.sendMessage(chatId, {
            text: `${formatMention(firstUser)} ❤️ ${formatMention(secondUser)}\nCongratulations 💖🍻`,
            mentions: [firstUser, secondUser]
        });

    } catch (error) {
        console.error('Error in ship command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to ship! Make sure this is a group.' });
    }
}

module.exports = shipCommand; 
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    try {
        const metadata = await sock.groupMetadata(jid);
        const ps = metadata.participants.map(v => v.id);
        const first = ps[Math.floor(Math.random() * ps.length)];
        let second = ps[Math.floor(Math.random() * ps.length)];
        while (second === first) second = ps[Math.floor(Math.random() * ps.length)];

        await sock.sendMessage(jid, {
            text: `🚢 *SHIPPING* 🚢\n\n@${first.split('@')[0]} ❤️ @${second.split('@')[0]}\n\nCongratulations! 🥳💖`,
            mentions: [first, second]
        });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to ship.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
