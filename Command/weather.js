const axios = require('axios');

<<<<<<< HEAD
module.exports = async function (sock, chatId, message, city) {
    try {
        const apiKey = '4902c0f2550f58298ad4146a92b65e10';  // Replace with your OpenWeather API Key
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weather = response.data;
        const weatherText = `Weather in ${weather.name}: ${weather.weather[0].description}. Temperature: ${weather.main.temp}°C.`;
        await sock.sendMessage(chatId, { text: weatherText }, { quoted: message }   );
    } catch (error) {
        console.error('Error fetching weather:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch the weather right now.' }, { quoted: message } );
    }
};
=======
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
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
