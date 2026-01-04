module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    try {
        const metadata = await sock.groupMetadata(jid);
        const admins = metadata.participants.filter(p => p.admin);
        const list = admins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n▢ ');
        
        await sock.sendMessage(jid, { text: `≡ *GROUP ADMINS*\n\n┌─⊷\n▢ ${list}\n└───────────`, mentions: admins.map(v => v.id) });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to get admin list.' });
    }
};