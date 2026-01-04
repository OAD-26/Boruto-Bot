module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const args = (msg.message?.conversation || msg.message?.extendedTextMessage?.text || "").split(' ').slice(1).join(' ');
    
    if (!args) return sock.sendMessage(jid, { text: 'Please ask a question!' });

    const responses = ["Yes, definitely!", "No way!", "Ask again later.", "It is certain.", "Very doubtful.", "Without a doubt."];
    const response = responses[Math.floor(Math.random() * responses.length)];
    await sock.sendMessage(jid, { text: `🎱 *8-Ball*: ${response}` });
};