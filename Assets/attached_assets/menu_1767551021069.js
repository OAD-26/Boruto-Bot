module.exports = {
    name: 'menu',
    description: 'Show bot menu',
    execute: async (sock, msg, text) => {
        const jid = msg.key.remoteJid;
        const menu = `
✅ *MyBot Commands*

!ping - Test the bot
!alive - Check if bot is alive
!gpt <question> - Ask AI a question
!goodbye - Goodbye message when someone leaves
!menu - Show this menu
        `;
        await sock.sendMessage(jid, { text: menu });
    }
};
