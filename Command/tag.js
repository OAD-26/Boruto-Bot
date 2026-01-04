module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    const metadata = await sock.groupMetadata(jid);
    const participants = metadata.participants;
    const mentions = participants.map(p => p.id);
    
    await sock.sendMessage(jid, { text: `🔊 *ANNOUNCEMENT*\n\nEveryone, please pay attention!`, mentions });
};