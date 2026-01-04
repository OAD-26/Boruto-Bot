const fs = require('fs');
const path = require('path');
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const userToUnmute = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!userToUnmute) return sock.sendMessage(jid, { text: '❌ Mention a user to unmute!' });
    const settingsPath = path.join(__dirname, "../data/muted.json");
    let muted = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath)) : {};
    delete muted[userToUnmute];
    fs.writeFileSync(settingsPath, JSON.stringify(muted, null, 2));
    await sock.sendMessage(jid, { text: `🔊 User @${userToUnmute.split('@')[0]} has been unmuted!`, mentions: [userToUnmute] });
};