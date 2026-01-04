const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1);

    if (!jid.endsWith('@g.us')) return sock.sendMessage(jid, { text: '❌ Group only command!' });

    try {
        const metadata = await sock.groupMetadata(jid);
        const isAdmin = metadata.participants.some(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
        const isBotAdmin = metadata.participants.some(p => p.id === sock.user.id.split(':')[0] + '@s.whatsapp.net' && (p.admin === 'admin' || p.admin === 'superadmin'));

        if (!isAdmin) return sock.sendMessage(jid, { text: '❌ Admin only command!' });
        if (!isBotAdmin) return sock.sendMessage(jid, { text: '❌ I must be admin to warn!' });

        const userToWarn = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        if (!userToWarn) return sock.sendMessage(jid, { text: '❌ Please mention a user or reply to their message to warn!' });

        const warningsPath = path.join(__dirname, '../data/warnings.json');
        if (!fs.existsSync(path.join(__dirname, '../data'))) fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
        
        let warnings = fs.existsSync(warningsPath) ? JSON.parse(fs.readFileSync(warningsPath, 'utf8')) : {};
        if (!warnings[jid]) warnings[jid] = {};
        if (!warnings[jid][userToWarn]) warnings[jid][userToWarn] = 0;
        
        warnings[jid][userToWarn]++;
        fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));

        const count = warnings[jid][userToWarn];
        await sock.sendMessage(jid, { 
            text: `*『 WARNING ALERT 』*\n\n👤 *User:* @${userToWarn.split('@')[0]}\n⚠️ *Count:* ${count}/3\n👑 *By:* @${sender.split('@')[0]}`,
            mentions: [userToWarn, sender]
        });

        if (count >= 3) {
            await sock.groupParticipantsUpdate(jid, [userToWarn], "remove");
            delete warnings[jid][userToWarn];
            fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));
            await sock.sendMessage(jid, { text: `🚫 @${userToWarn.split('@')[0]} has been removed after 3 warnings!`, mentions: [userToWarn] });
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to process warning.' });
    }
};