<<<<<<< HEAD
const eightBallResponses = [
    "Yes, definitely!",
    "No way!",
    "Ask again later.",
    "It is certain.",
    "Very doubtful.",
    "Without a doubt.",
    "My reply is no.",
    "Signs point to yes."
];

async function eightBallCommand(sock, chatId, question) {
    if (!question) {
        await sock.sendMessage(chatId, { text: 'Please ask a question!' });
        return;
    }

    const randomResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
    await sock.sendMessage(chatId, { text: `🎱 ${randomResponse}` });
}

module.exports = { eightBallCommand };
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const args = (msg.message?.conversation || msg.message?.extendedTextMessage?.text || "").split(' ').slice(1).join(' ');
    
    if (!args) return sock.sendMessage(jid, { text: 'Please ask a question!' });

    const responses = ["Yes, definitely!", "No way!", "Ask again later.", "It is certain.", "Very doubtful.", "Without a doubt."];
    const response = responses[Math.floor(Math.random() * responses.length)];
    await sock.sendMessage(jid, { text: `🎱 *8-Ball*: ${response}` });
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
