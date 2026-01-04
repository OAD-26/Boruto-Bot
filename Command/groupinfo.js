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