const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1);
    const sub = args[0]?.toLowerCase();

    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Owner only command!' });

    const sudoPath = path.join(__dirname, "../data/sudo.json");
    let sudo = fs.existsSync(sudoPath) ? JSON.parse(fs.readFileSync(sudoPath)) : [];

    if (sub === 'add') {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || args[1] + '@s.whatsapp.net';
        if (!sudo.includes(target)) sudo.push(target);
        fs.writeFileSync(sudoPath, JSON.stringify(sudo, null, 2));
        await sock.sendMessage(jid, { text: `✅ Added @${target.split('@')[0]} to sudo!`, mentions: [target] });
    } else if (sub === 'list') {
        await sock.sendMessage(jid, { text: `👑 *Sudo Users*:\n\n${sudo.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')}`, mentions: sudo });
    } else {
        await sock.sendMessage(jid, { text: 'Usage: !sudo add <@user> | !sudo list' });
    }
};