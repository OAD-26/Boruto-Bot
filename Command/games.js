module.exports = {
  name: "games",
  alias: ["game"],
  desc: "To view available games",
  category: "Games",
  usage: "games",
  react: "🎮",
  start: async (Miku, m, { pushName, prefix }) => {
    let gamesAvailable = `
      🎮 *Available Games :*\n
      1. ${prefix}tictactoe *[user tag]*\n 
      _To play TicTacToe with your friend._\n
      2. ${prefix}truth\n 
      _To get a random truth question._\n
      3. ${prefix}dare\n 
      _To get a random dare task._\n
      4. ${prefix}wouldyou\n 
      _To get a random 'would you rather' question._\n
      `;

    await Miku.sendMessage(
      m.chat,
      { text: gamesAvailable, quoted: m },
      { disappearingMessagesInChat: "false" }
    );
  },
};