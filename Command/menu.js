module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
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
};