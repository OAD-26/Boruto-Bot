const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1);

    try {
        await sock.sendMessage(jid, { react: { text: '❓', key: msg.key } });
        const res = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
        const q = res.data.results[0];
        const options = [...q.incorrect_answers, q.correct_answer].sort();
        
        await sock.sendMessage(jid, { 
            text: `📝 *TRIVIA*\n\n*Question:* ${q.question}\n\n*Options:*\n${options.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\n_Answer with !trivia <option number>_`
        });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch trivia.' });
    }
};