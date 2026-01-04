const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1);
    const type = args[0]?.toLowerCase();
    const query = args.slice(1).join(' ');

    if (!type || !query) return sock.sendMessage(jid, { text: '🎨 Usage: !textmaker <type> <text>\nTypes: metallic, ice, snow, impressive, matrix, light, neon, devil, purple, thunder, leaves, 1917, arena, hacker, sand, blackpink, glitch, fire' });

    try {
        await sock.sendMessage(jid, { react: { text: '🎨', key: msg.key } });
        // Using a generic ephoto API or similar
        const res = await axios.get(`https://api.siputzx.my.id/api/tools/ephoto360?url=https://en.ephoto360.com/${type}-text-effect.html&text=${encodeURIComponent(query)}`);
        
        if (res.data?.status && res.data?.result) {
            await sock.sendMessage(jid, { image: { url: res.data.result }, caption: `🎨 *${type.toUpperCase()}* generated!` }, { quoted: msg });
        } else {
            await sock.sendMessage(jid, { text: '❌ Failed to generate text effect. (Note: API endpoint might differ for specific types)' });
        }
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Textmaker failed.' });
    }
};