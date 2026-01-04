const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const query = text.split(' ').slice(1).join(' ').trim();

    if (!query) return sock.sendMessage(jid, { text: '📖 Usage: !wikipedia <query>' });

    try {
        await sock.sendMessage(jid, { react: { text: '📖', key: msg.key } });
        const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = res.data;
        
        if (data.type === 'standard') {
            await sock.sendMessage(jid, { 
                image: { url: data.originalimage?.source || 'https://telegra.ph/file/24fa902ead26340f3df2c.png' },
                caption: `📖 *WIKIPEDIA: ${data.title}*\n\n${data.extract}\n\n🔗 *Link:* ${data.content_urls.desktop.page}`
            });
        } else {
            await sock.sendMessage(jid, { text: '❌ No results found for that query.' });
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Failed to fetch Wikipedia info.' });
    }
};