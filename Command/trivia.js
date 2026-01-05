const axios = require('axios');

<<<<<<< HEAD
let triviaGames = {};

async function startTrivia(sock, chatId) {
    if (triviaGames[chatId]) {
        sock.sendMessage(chatId, { text: 'A trivia game is already in progress!' });
        return;
    }

    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
        const questionData = response.data.results[0];

        triviaGames[chatId] = {
            question: questionData.question,
            correctAnswer: questionData.correct_answer,
            options: [...questionData.incorrect_answers, questionData.correct_answer].sort(),
        };

        sock.sendMessage(chatId, {
            text: `Trivia Time!\n\nQuestion: ${triviaGames[chatId].question}\nOptions:\n${triviaGames[chatId].options.join('\n')}`
        });
    } catch (error) {
        sock.sendMessage(chatId, { text: 'Error fetching trivia question. Try again later.' });
    }
}

function answerTrivia(sock, chatId, answer) {
    if (!triviaGames[chatId]) {
        sock.sendMessage(chatId, { text: 'No trivia game is in progress.' });
        return;
    }

    const game = triviaGames[chatId];

    if (answer.toLowerCase() === game.correctAnswer.toLowerCase()) {
        sock.sendMessage(chatId, { text: `Correct! The answer is ${game.correctAnswer}` });
    } else {
        sock.sendMessage(chatId, { text: `Wrong! The correct answer was ${game.correctAnswer}` });
    }

    delete triviaGames[chatId];
}

module.exports = { startTrivia, answerTrivia };
=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
