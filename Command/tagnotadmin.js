module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    try {
        const metadata = await sock.groupMetadata(jid);
        const isAdmin = metadata.participants.some(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
        if (!isAdmin) return sock.sendMessage(jid, { text: '❌ Admin only command!' });

        const nonAdmins = metadata.participants.filter(p => !p.admin);
        const mentions = nonAdmins.map(p => p.id);
        const list = nonAdmins.map(p => `@${p.id.split('@')[0]}`).join('\n');

        await sock.sendMessage(jid, { text: `🔊 *TAG NON-ADMINS*\n\n${list}`, mentions });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to tag members.' });
    }
};