// ===============================
// Boruto Bot - WhatsApp Bot
// Owner: Oluwafemi Ayo David
// ===============================

// ====== KEEP BOT ONLINE (WEB SERVER) =======
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Boruto Bot is alive and running! ✅');
});

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

// ===============================
// REQUIRED MODULES
// ===============================
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, delay } = require("@whiskeysockets/baileys");
const pino = require("pino");
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode-terminal");

// ===============================
// BOT CONFIGURATION
// ===============================
const config = {
    ownerNumbers: ["2349138385352","2349110495140","2349058614420","2349112196411"],
    botName: "Boruto Bot",
    botAvatar: "./Assets/bot_avatar.jpg",
    stickerIntro: "Hi, I'm Boruto Bot! 👋",
    packName: "Boruto",
    authorName: "OAD-26",
    welcomeMessage: "👋 Welcome to the group! 🎉",
    goodbyeMessage: "😥 Goodbye! See you next time. 🍀",
    prefix: "!",
    admins: ["2349138385352","2349110495140","2349058614420","2349112196411"],
    gamesEnabled: true,
    jokesEnabled: true,
};

// ===============================
// DATA FOLDERS
// ===============================
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// ===============================
// START BOT FUNCTION
// ===============================
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state,
    });

    // Save credentials on update
    sock.ev.on("creds.update", saveCreds);

    // QR code handling
    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) qrcode.generate(qr, { small: true });
        
        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log(`❌ Connection closed: ${reason}`);
            // Reconnect if it's not a logged out reason
            if (reason !== DisconnectReason.loggedOut) {
                console.log("♻️ Reconnecting...");
                startBot();
            } else {
                console.log("❌ Logged out. Please scan QR again.");
            }
        }
        
        if (connection === "open") {
            console.log(`✅ Bot connected and ready!`);
            
            // HEARTBEAT / KEEP-ALIVE
            setInterval(async () => {
                try {
                    // Send a simple presence update to keep connection active
                    await sock.sendPresenceUpdate('available');
                    console.log('💓 Heartbeat: Connection active');
                } catch (err) {
                    console.error('💔 Heartbeat failed:', err);
                }
            }, 10 * 60 * 1000); // Every 10 minutes
        }
    });

    // ===============================
    // HELPER FUNCTIONS
    // ===============================
    const isAdmin = (user) => config.admins.includes(user);

    // ===============================
    // MESSAGE HANDLER
    // ===============================
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const sender = msg.key.participant || msg.key.remoteJid;
        const text = msg.message.conversation || "";
        const command = text.startsWith(config.prefix) ? text.slice(1).split(" ")[0] : "";

        // Admin command example
        if (command === "ping") {
            await sock.sendMessage(msg.key.remoteJid, { text: `🏓 Pong!` });
        }

        // Example: group id
        if (command === "groupid") {
            if (msg.key.remoteJid.endsWith("@g.us")) {
                await sock.sendMessage(msg.key.remoteJid, { text: `🆔 Group ID: ${msg.key.remoteJid}` });
            } else {
                await sock.sendMessage(msg.key.remoteJid, { text: `❌ This command works only in groups!` });
            }
        }

        // Tagall command
        if (command === "tagall") {
            const tagall = require("./Command/tagall.js");
            await tagall(sock, msg, config);
        }

        // Hidetag command
        if (command === "hidetag") {
            const hidetag = require("./Command/hidetag.js");
            await hidetag(sock, msg, config);
        }

        // Antibadword command
        if (command === "antibadword") {
            const antibadword = require("./Command/antibadword.js");
            await antibadword(sock, msg, config);
        }

        // Autoreact command
        if (command === "autoreact") {
            const autoreact = require("./Command/autoreact.js");
            await autoreact(sock, msg, config);
        }

        // Alive command
        if (command === "alive") {
            const alive = require("./Command/alive.js");
            await alive(sock, msg, config);
        }

        // Anticall command
        if (command === "anticall") {
            const anticall = require("./Command/anticall.js");
            await anticall(sock, msg, config);
        }

        // Additional commands
        const cmdMap = {
            "menu": "./Command/menu.js",
            "help": "./Command/menu.js",
            "ban": "./Command/ban.js",
            "kick": "./Command/kick.js",
            "promote": "./Command/promote.js",
            "demote": "./Command/demote.js",
            "mute": "./Command/mute.js",
            "unmute": "./Command/unmute.js",
            "clearsession": "./Command/clearsession.js",
            "cleartmp": "./Command/cleartmp.js",
            "mode": "./Command/mode.js",
            "autostatus": "./Command/autostatus.js",
            "antidelete": "./Command/antidelete.js",
            "setpp": "./Command/setpp.js",
            "settings": "./Command/settings.js",
            "update": "./Command/update.js",
            "clear": "./Command/clear.js",
            "gpt": "./Command/ai.js",
            "gemini": "./Command/ai.js",
            "anime": "./Command/anime.js",
            "antitag": "./Command/antitag.js",
            "autoread": "./Command/autoread.js",
            "chatbot": "./Command/chatbot.js",
            "character": "./Command/character.js",
            "attp": "./Command/attp.js",
            "cleartmp": "./Command/cleartmp.js",
            "compliment": "./Command/compliment.js",
            "dare": "./Command/dare.js",
            "delete": "./Command/delete.js",
            "eightball": "./Command/eightball.js",
            "facebook": "./Command/facebook.js",
            "fact": "./Command/fact.js",
            "flirt": "./Command/flirt.js",
            "goodnight": "./Command/goodnight.js",
            "groupinfo": "./Command/groupinfo.js",
            "imagine": "./Command/imagine.js",
            "blur": "./Command/blur.js",
            "instagram": "./Command/instagram.js",
            "insult": "./Command/insult.js",
            "joke": "./Command/joke.js",
            "lyrics": "./Command/lyrics.js",
            "meme": "./Command/meme.js",
            "owner": "./Command/owner.js",
            "ping": "./Command/ping.js",
            "play": "./Command/play.js",
            "remini": "./Command/remini.js",
            "removebg": "./Command/removebg.js",
            "resetlink": "./Command/resetlink.js",
            "roseday": "./Command/roseday.js",
            "shayari": "./Command/shayari.js",
            "ship": "./Command/ship.js",
            "simage": "./Command/simage.js",
            "simp": "./Command/simp.js",
            "song": "./Command/song.js",
            "sora": "./Command/sora.js",
            "spotify": "./Command/spotify.js",
            "ss": "./Command/ss.js",
            "staff": "./Command/staff.js",
            "sticker": "./Command/sticker.js",
            "crop": "./Command/stickercrop.js",
            "stickercrop": "./Command/stickercrop.js",
            "stupid": "./Command/stupid.js",
            "tag": "./Command/tag.js",
            "tagall": "./Command/tagall.js",
            "tagnotadmin": "./Command/tagnotadmin.js",
            "take": "./Command/take.js",
            "textmaker": "./Command/textmaker.js",
            "tiktok": "./Command/tiktok.js",
            "translate": "./Command/translate.js",
            "trivia": "./Command/trivia.js",
            "truth": "./Command/truth.js",
            "tts": "./Command/tts.js",
            "unban": "./Command/unban.js",
            "unmute": "./Command/unmute.js",
            "update": "./Command/update.js",
            "url": "./Command/url.js",
            "video": "./Command/video.js",
            "viewonce": "./Command/viewonce.js",
            "warn": "./Command/warn.js",
            "warnings": "./Command/warnings.js",
            "wasted": "./Command/wasted.js",
            "weather": "./Command/weather.js",
            "welcome": "./Command/welcome.js",
            "quotes": "./Command/quotes.js",
            "fact": "./Command/fact.js",
            "wikipedia": "./Command/wikipedia.js",
            "novel": "./Command/novel.js",
            "shorten": "./Command/shorten.js",
            "qr": "./Command/qr.js",
            "calc": "./Command/calc.js"
        };

        if (cmdMap[command]) {
            const cmdFunc = require(cmdMap[command]);
            await cmdFunc(sock, msg, config);
        }

        // Example: joke
        if (config.jokesEnabled && command === "joke") {
            const jokes = ["😂 Why did the chicken cross the road? To get to the other side!", "🤣 I told my computer I needed a break, and it said: No problem!"];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            await sock.sendMessage(msg.key.remoteJid, { text: randomJoke });
        }

        // Example: game
        if (config.gamesEnabled && command === "guess") {
            const number = Math.floor(Math.random() * 10) + 1;
            await sock.sendMessage(msg.key.remoteJid, { text: `🎮 Guess a number between 1-10!` });
            sock.ev.on("messages.upsert", (guessMsg) => {
                const gmsg = guessMsg.messages[0];
                if (!gmsg.message || gmsg.key.fromMe) return;
                if (parseInt(gmsg.message.conversation) === number) {
                    sock.sendMessage(gmsg.key.remoteJid, { text: `🎉 Correct! The number was ${number}.` });
                }
            });
        }
    });
}

// ===============================
// RUN BOT
// ===============================
startBot();
