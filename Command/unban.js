const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    
    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Owner only command!' });

    const userToUnban = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!userToUnban) return sock.sendMessage(jid, { text: '❌ Mention a user to unban!' });

    const bannedPath = path.join(__dirname, "../data/banned.json");
    let banned = fs.existsSync(bannedPath) ? JSON.parse(fs.readFileSync(bannedPath)) : [];
    
    if (!banned.includes(userToUnban)) return sock.sendMessage(jid, { text: `✅ User @${userToUnban.split('@')[0]} is not banned!`, mentions: [userToUnban] });

    banned = banned.filter(id => id !== userToUnban);
    fs.writeFileSync(bannedPath, JSON.stringify(banned, null, 2));
    
    await sock.sendMessage(jid, { text: `✅ User @${userToUnban.split('@')[0]} has been unbanned!`, mentions: [userToUnban] });
};