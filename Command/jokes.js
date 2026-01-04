module.exports = {
    name: 'joke',
    description: 'Tells a random joke.',
    execute(message, args) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything! 😂",
            "Parallel lines have so much in common. It’s a shame they’ll never meet. 😔",
            "Why did the scarecrow win an award? Because he was outstanding in his field! 🏆",
            "I told my wife she was drawing her eyebrows too high. She seemed surprised. 🤨",
            "What do you call a fish with no eyes? Fsh! 🐟",
            "Why did the bicycle fall over? Because it was two tired! 🚲",
            "What do you call a lazy kangaroo? Pouch potato! 🥔",
            "I'm reading a book on anti-gravity. It's impossible to put down! 📚",
            "Why did the coffee go to the police? It got mugged! ☕",
            "What do you call a bear with no teeth? A gummy bear! 🐻"
        ];

        const randomIndex = Math.floor(Math.random() * jokes.length);
        message.channel.send(jokes[randomIndex]);
    },
};