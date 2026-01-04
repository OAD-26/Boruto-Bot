const axios = require('axios');
const fetch = require('node-fetch');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ');
    const command = args[0].toLowerCase().slice(1);
    const query = args.slice(1).join(' ').trim();

    if (!query) {
        return await sock.sendMessage(jid, { 
            text: `❌ Please provide a question after ${config.prefix}${command}\n\nExample: ${config.prefix}${command} write a basic html code`
        });
    }

    try {
        await sock.sendMessage(jid, { react: { text: '🤖', key: msg.key } });

        if (command === 'gpt') {
            const response = await axios.get(`https://zellapi.autos/ai/chatbot?text=${encodeURIComponent(query)}`);
            if (response.data && response.data.status && response.data.result) {
                await sock.sendMessage(jid, { text: response.data.result }, { quoted: msg });
            } else {
                throw new Error('Invalid response from API');
            }
        } else if (command === 'gemini') {
            const apis = [
                `https://vapis.my.id/api/gemini?q=${encodeURIComponent(query)}`,
                `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(query)}`,
                `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(query)}`,
                `https://zellapi.autos/ai/chatbot?text=${encodeURIComponent(query)}`
            ];

            let success = false;
            for (const api of apis) {
                try {
                    const response = await fetch(api);
                    const data = await response.json();
                    const answer = data.message || data.data || data.answer || data.result;
                    if (answer) {
                        await sock.sendMessage(jid, { text: answer }, { quoted: msg });
                        success = true;
                        break;
                    }
                } catch (e) { continue; }
            }
            if (!success) throw new Error('All Gemini APIs failed');
        }
    } catch (error) {
        await sock.sendMessage(jid, { text: "❌ Failed to get response. Please try again later." });
    }
};