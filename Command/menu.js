module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
<<<<<<< HEAD
    const menu = `🐉 *BORUTO BOT MENU* 🐉

╔═══════════════════╗
🌐 *General*
║ ➤ !menu / !help
║ ➤ !ping
║ ➤ !alive
║ ➤ !owner
║ ➤ !joke / !meme
║ ➤ !novel
║ ➤ !weather / !wikipedia
╚═══════════════════╝

╔═══════════════════╗
🛡️ *Admin*
║ ➤ !tagall / !hidetag
║ ➤ !ban / !kick
║ ➤ !promote / !demote
║ ➤ !mute / !unmute
║ ➤ !resetlink / !staff
╚═══════════════════╝

╔═══════════════════╗
🤖 *AI & Fun*
║ ➤ !gpt / !gemini
║ ➤ !imagine / !sora
║ ➤ !tictactoe / !trivia
║ ➤ !truth / !dare
║ ➤ !wasted / !simp / !stupid
╚═══════════════════╝

╔═══════════════════╗
🎵 *Downloader*
║ ➤ !play / !song
║ ➤ !video / !tiktok
║ ➤ !spotify / !facebook
║ ➤ !instagram
╚═══════════════════╝

╔═══════════════════╗
🛠️ *Settings*
║ ➤ !settings / !welcome
║ ➤ !autostatus / !antidelete
║ ➤ !anticall / !autoread
║ ➤ !chatbot / !setpp
╚═══════════════════╝

> *Powered by Oluwafemi Ayo David* ⚡`;

    await sock.sendMessage(jid, { 
        image: { url: './Assets/bot_avatar.jpg' }, 
        caption: menu 
    }, { quoted: msg });
=======
    const menu = `
🐉 *${config.botName} MENU* 🐉

╔═══════════════════╗
🌐 *General Commands*:
║ ➤ ${config.prefix}menu
║ ➤ ${config.prefix}ping
║ ➤ ${config.prefix}alive
║ ➤ ${config.prefix}owner
║ ➤ ${config.prefix}joke
║ ➤ ${config.prefix}groupid
╚═══════════════════╝

╔═══════════════════╗
🛡️ *Admin Commands*:
║ ➤ ${config.prefix}tagall
║ ➤ ${config.prefix}hidetag
║ ➤ ${config.prefix}ban
║ ➤ ${config.prefix}kick
║ ➤ ${config.prefix}promote
║ ➤ ${config.prefix}demote
║ ➤ ${config.prefix}mute
║ ➤ ${config.prefix}unmute
╚═══════════════════╝

╔═══════════════════╗
👑 *Owner Commands*:
║ ➤ ${config.prefix}antibadword <on/off>
║ ➤ ${config.prefix}autoreact <on/off>
║ ➤ ${config.prefix}anticall <on/off>
║ ➤ ${config.prefix}autostatus <on/off>
║ ➤ ${config.prefix}antidelete <on/off>
║ ➤ ${config.prefix}mode <public/private>
║ ➤ ${config.prefix}setpp (reply to image)
║ ➤ ${config.prefix}clearsession
║ ➤ ${config.prefix}cleartmp
║ ➤ ${config.prefix}settings
╚═══════════════════╝
`;
    await sock.sendMessage(jid, { text: menu });
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
};