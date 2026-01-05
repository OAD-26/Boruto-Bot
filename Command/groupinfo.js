<<<<<<< HEAD
async function groupInfoCommand(sock, chatId, msg) {
    try {
        // Get group metadata
        const groupMetadata = await sock.groupMetadata(chatId);
        
        // Get group profile picture
        let pp;
        try {
            pp = await sock.profilePictureUrl(chatId, 'image');
        } catch {
            pp = 'https://i.imgur.com/2wzGhpF.jpeg'; // Default image
        }

        // Get admins from participants
        const participants = groupMetadata.participants;
        const groupAdmins = participants.filter(p => p.admin);
        const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
        
        // Get group owner
        const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || chatId.split('-')[0] + '@s.whatsapp.net';

        // Create info text
        const text = `
┌──「 *INFO GROUP* 」
▢ *♻️ID:*
   • ${groupMetadata.id}
▢ *🔖NAME* : 
• ${groupMetadata.subject}
▢ *👥Members* :
• ${participants.length}
▢ *🤿Group Owner:*
• @${owner.split('@')[0]}
▢ *🕵🏻‍♂️Admins:*
${listAdmin}

▢ *📌Description* :
   • ${groupMetadata.desc?.toString() || 'No description'}
`.trim();

        // Send the message with image and mentions
        await sock.sendMessage(chatId, {
            image: { url: pp },
            caption: text,
            mentions: [...groupAdmins.map(v => v.id), owner]
        });

    } catch (error) {
        console.error('Error in groupinfo command:', error);
        await sock.sendMessage(chatId, { text: 'Failed to get group info!' });
    }
}

module.exports = groupInfoCommand; 
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    try {
        const metadata = await sock.groupMetadata(jid);
        const pp = await sock.profilePictureUrl(jid, 'image').catch(() => 'https://i.imgur.com/2wzGhpF.jpeg');
        
        const text = `
┌──「 *GROUP INFO* 」
▢ *Name:* ${metadata.subject}
▢ *Members:* ${metadata.participants.length}
▢ *Owner:* @${(metadata.owner || jid.split('-')[0] + '@s.whatsapp.net').split('@')[0]}
▢ *Description:* ${metadata.desc?.toString() || 'No description'}
`.trim();

        await sock.sendMessage(jid, { image: { url: pp }, caption: text, mentions: [metadata.owner || jid.split('-')[0] + '@s.whatsapp.net'] });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to get group info.' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
