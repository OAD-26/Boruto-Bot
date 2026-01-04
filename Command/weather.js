const axios = require('axios');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const city = text.split(' ').slice(1).join(' ').trim();

    if (!city) return sock.sendMessage(jid, { text: '🌤️ Usage: !weather <city>' });

    try {
        await sock.sendMessage(jid, { react: { text: '🌤️', key: msg.key } });
        const apiKey = '4902c0f2550f58298ad4146a92b65e10'; 
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const w = res.data;
        const weatherText = `🌤️ *WEATHER REPORT*\n\n📍 *City:* ${w.name}\n🌡️ *Temp:* ${w.main.temp}°C\n🌥️ *Condition:* ${w.weather[0].description}\n💧 *Humidity:* ${w.main.humidity}%`;
        await sock.sendMessage(jid, { text: weatherText }, { quoted: msg });
    } catch (e) {
        await sock.sendMessage(jid, { text: '❌ Could not fetch weather for that city.' });
    }
};