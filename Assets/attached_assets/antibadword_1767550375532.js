module.exports = {
    name: 'antibadword',
    description: 'Turn on/off anti-badword filter',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        const status = text.trim().toLowerCase();
        if (!['on', 'off'].includes(status)) return sock.sendMessage(jid, { text: '❌ Usage: !antibadword <on/off>' });

        await sock.sendMessage(jid, { text: `✅ Anti-badword is now ${status.toUpperCase()}! (simulated)` });
    }
};
