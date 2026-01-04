module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const start = Date.now();
    await sock.sendMessage(jid, { text: '🏓 Pong!' }, { quoted: msg });
    const ping = Date.now() - start;
    await sock.sendMessage(jid, { text: `🚀 *Ping*: ${ping}ms\n⏱️ *Uptime*: ${process.uptime().toFixed(0)}s` });
};