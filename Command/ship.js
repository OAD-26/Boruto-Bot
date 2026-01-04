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