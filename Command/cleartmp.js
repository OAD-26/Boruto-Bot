const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    
    if (!config.ownerNumbers.includes(sender.split('@')[0])) {
        return sock.sendMessage(jid, { text: '❌ This command is only available for the owner!' });
    }

    try {
        const tmpDir = path.join(process.cwd(), 'tmp');
        if (fs.existsSync(tmpDir)) {
            const files = fs.readdirSync(tmpDir);
            for (const file of files) {
                const filePath = path.join(tmpDir, file);
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(filePath);
                }
            }
        }
        await sock.sendMessage(jid, { text: '✅ Temporary files cleared successfully! 🧹' });
    } catch (error) {
        await sock.sendMessage(jid, { text: '❌ Failed to clear temporary files!' });
    }
};