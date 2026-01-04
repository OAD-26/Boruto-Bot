const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1);

    const warningsFilePath = path.join(__dirname, '../data/warnings.json');

    if (!fs.existsSync(warningsFilePath)) {
        fs.writeFileSync(warningsFilePath, JSON.stringify({}), 'utf8');
    }

    const warnings = JSON.parse(fs.readFileSync(warningsFilePath, 'utf8'));
    const userToCheck = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant || (args[0] ? args[0].replace('@', '') + '@s.whatsapp.net' : null);

    if (!userToCheck) {
        return sock.sendMessage(jid, { text: '❓ Please mention a user to check warnings.' });
    }

    const warningCount = (warnings[jid] && warnings[jid][userToCheck]) || 0;
    await sock.sendMessage(jid, { text: `⚠️ User @${userToCheck.split('@')[0]} has ${warningCount} warning(s).`, mentions: [userToCheck] });
};