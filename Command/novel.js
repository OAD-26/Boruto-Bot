const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const args = (msg.message.conversation || msg.message.extendedTextMessage?.text || "").split(" ").slice(1);
    const query = args.join(" ");

    if (!query) {
        return await sock.sendMessage(jid, { text: "📖 Please provide a novel title and author!\nExample: `!novel The Alchemist by Paulo Coelho`" });
    }

    try {
        await sock.sendMessage(jid, { text: "🔍 Searching for your novel..." });
        
        // Using Google Books API as a reliable source for novel information
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`);
        
        if (!response.data.items || response.data.items.length === 0) {
            return await sock.sendMessage(jid, { text: "❌ Sorry, I couldn't find that novel. Please check the spelling." });
        }

        const book = response.data.items[0].volumeInfo;
        const title = book.title || "Unknown Title";
        const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
        const description = book.description ? book.description.substring(0, 500) + "..." : "No description available.";
        const publishedDate = book.publishedDate || "Unknown";
        const pageCount = book.pageCount || "N/A";
        const categories = book.categories ? book.categories.join(", ") : "N/A";
        const image = book.imageLinks?.thumbnail || null;

        let caption = `📚 *NOVEL INFORMATION* 📚\n\n`;
        caption += `📖 *Title*: ${title}\n`;
        caption += `✍️ *Author*: ${authors}\n`;
        caption += `📅 *Published*: ${publishedDate}\n`;
        caption += `📃 *Pages*: ${pageCount}\n`;
        caption += `🏷️ *Categories*: ${categories}\n\n`;
        caption += `📝 *Description*: ${description}\n\n`;
        caption += `> *Powered by ${config.botName}* 🐉`;

        if (image) {
            await sock.sendMessage(jid, { 
                image: { url: image }, 
                caption: caption 
            }, { quoted: msg });
        } else {
            await sock.sendMessage(jid, { text: caption }, { quoted: msg });
        }

    } catch (error) {
        console.error('Novel search error:', error);
        await sock.sendMessage(jid, { text: "❌ An error occurred while searching for the novel." });
    }
};