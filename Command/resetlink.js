module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;

    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    try {
        const metadata = await sock.groupMetadata(jid);
        const isAdmin = metadata.participants.some(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
        const isBotAdmin = metadata.participants.some(p => p.id === sock.user.id.split(':')[0] + '@s.whatsapp.net' && (p.admin === 'admin' || p.admin === 'superadmin'));

        if (!isAdmin) return sock.sendMessage(jid, { text: '❌ Admin only command!' });
        if (!isBotAdmin) return sock.sendMessage(jid, { text: '❌ I must be admin to reset link!' });

        const newCode = await sock.groupRevokeInvite(jid);
        await sock.sendMessage(jid, { text: `✅ Group link reset! New link:\nhttps://chat.whatsapp.com/${newCode}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to reset group link.' });
    }
};