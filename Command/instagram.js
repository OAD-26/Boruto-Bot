const { igdl } = require("ruhend-scraper");

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const url = text.split(' ').slice(1).join(' ').trim();

    if (!url || !url.includes('instagram.com')) {
        return sock.sendMessage(jid, { text: "Please provide a valid Instagram link!" });
    }

    try {
        await sock.sendMessage(jid, { react: { text: '📸', key: msg.key } });
        const downloadData = await igdl(url);
        
        if (!downloadData || !downloadData.data || downloadData.data.length === 0) {
            throw new Error();
        }

        for (const item of downloadData.data) {
            if (item.url) {
                const isVideo = item.type === 'video' || item.url.includes('.mp4');
                if (isVideo) {
                    await sock.sendMessage(jid, { video: { url: item.url }, caption: "✅ Downloaded by Boruto Bot" }, { quoted: msg });
                } else {
                    await sock.sendMessage(jid, { image: { url: item.url }, caption: "✅ Downloaded by Boruto Bot" }, { quoted: msg });
                }
            }
        }
    } catch (error) {
        await sock.sendMessage(jid, { text: "❌ Failed to fetch Instagram media." });
    }
};