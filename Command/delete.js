module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    
    // Check if group
    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    // Check admin
    const groupMetadata = await sock.groupMetadata(jid);
    const isAdmin = groupMetadata.participants.some(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
    
    if (!isAdmin && !config.ownerNumbers.includes(sender.split('@')[0])) {
        return sock.sendMessage(jid, { text: '❌ Admin only command!' });
    }

    const quoted = msg.message?.extendedTextMessage?.contextInfo;
    if (!quoted || !quoted.stanzaId) {
        return sock.sendMessage(jid, { text: '❌ Reply to a message to delete it!' });
    }

    try {
        await sock.sendMessage(jid, {
            delete: {
                remoteJid: jid,
                fromMe: false,
                id: quoted.stanzaId,
                participant: quoted.participant
            }
        });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to delete. Make sure I am an admin!' });
    }
};