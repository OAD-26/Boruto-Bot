module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
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
};