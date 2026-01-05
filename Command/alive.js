<<<<<<< HEAD
module.exports = {
    name: 'alive',
    description: 'Check if bot is alive',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        await sock.sendMessage(jid, { text: '✅ I am alive!' });
    }
};
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const fs = require('fs');
    
    const aliveMessage = `*Boruto Bot is Online!* ⚡

✨ *Status:* Active 🟢
👑 *Owner:* Oluwafemi Ayo David 🛡️
🤖 *Bot Name:* ${config.botName} 🐉
📝 *Prefix:* ${config.prefix} ⚙️

Use ${config.prefix}menu to see all commands! 📚`;

    const avatarPath = "./Assets/bot_avatar.jpg";
    
    if (fs.existsSync(avatarPath)) {
        await sock.sendMessage(jid, { 
            image: fs.readFileSync(avatarPath),
            caption: aliveMessage
        });
    } else {
        await sock.sendMessage(jid, { text: aliveMessage });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
