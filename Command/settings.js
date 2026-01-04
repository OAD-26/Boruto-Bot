const fs = require('fs');
const path = require('path');
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Only owner can use this!' });
    const settingsPath = path.join(__dirname, "../data/groupSettings.json");
    const settings = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath)) : { global: {} };
    const global = settings.global || {};
    const status = `
🔧 *BORUTO BOT SETTINGS* 🔧

🛡️ Mode: ${global.mode || 'public'}
🤖 Autoreact: ${global.autoreact ? 'ON ✅' : 'OFF ❌'}
📵 Anticall: ${global.anticall ? 'ON ✅' : 'OFF ❌'}
🤳 Autostatus: ${global.autostatus ? 'ON ✅' : 'OFF ❌'}
🔒 Antidelete: ${global.antidelete ? 'ON ✅' : 'OFF ❌'}
🤬 Antibadword: ${settings[jid]?.antibadword ? 'ON ✅' : 'OFF ❌'}
`;
    await sock.sendMessage(jid, { text: status });
};