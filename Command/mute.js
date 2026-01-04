const fs = require('fs');
const path = require('path');
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const userToMute = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message.extendedTextMessage?.contextInfo?.participant;
    if (!userToMute) return sock.sendMessage(jid, { text: '❌ Mention a user to mute!' });
    const settingsPath = path.join(__dirname, "../data/muted.json");
    let muted = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath)) : {};
    muted[userToMute] = true;
    fs.writeFileSync(settingsPath, JSON.stringify(muted, null, 2));
    await sock.sendMessage(jid, { text: `🔇 User @${userToMute.split('@')[0]} has been muted!`, mentions: [userToMute] });
};