module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const expr = text.split(' ').slice(1).join(' ').trim();

    if (!expr) return sock.sendMessage(jid, { text: '🧮 Usage: !calc <expression>\nExample: !calc 2 + 2' });

    try {
        // Simple and safe eval for basic math (not for production use, but okay for a demo bot)
        const result = eval(expr.replace(/[^-()\d/*+.]/g, ''));
        await sock.sendMessage(jid, { text: `🧮 *CALCULATION*\n\nExpression: ${expr}\nResult: ${result}` });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Invalid expression.' });
    }
};