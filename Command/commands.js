// commands/commands.js
const { ownerNumbers, admins, botName } = require("../config");
const fs = require("fs");

// Sample jokes list
const jokes = [
    "😂 Why don't scientists trust atoms? Because they make up everything!",
    "🤣 I told my computer I needed a break, and it said: 'No problem, I'll go to sleep!'",
    "😅 Why did the chicken join WhatsApp? To talk to its group chat!"
];

// ===============================
// MAIN COMMAND EXECUTOR
// ===============================
module.exports = {
    name: "commands",
    execute: async (sock, msg, args, groupAdmins) => {
        const sender = msg.key.participant || msg.key.remoteJid;
        const isOwner = ownerNumbers.includes(sender.split("@")[0]);
        const isAdmin = groupAdmins.includes(sender.split("@")[0]) || isOwner;

        const command = args[0];
        const target = args[1]; // Phone number like 2349123456789

        switch (command) {
            // -----------------------------
            // ADMIN COMMANDS 🛡️
            // -----------------------------
            case "kick":
                if (!isAdmin) return sock.sendMessage(msg.key.remoteJid, { text: "❌ You are not an admin! 🛑" });
                if (!target) return sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Please provide a number to kick 👢" });
                // Kick logic here
                await sock.sendMessage(msg.key.remoteJid, { text: `👢 User ${target} has been kicked by ${sender.split("@")[0]}!` });
                break;

            case "promote":
                if (!isAdmin) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Only admins can promote ⬆️" });
                if (!target) return sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Please provide a number to promote ⬆️" });
                // Promote logic here
                await sock.sendMessage(msg.key.remoteJid, { text: `⬆️ User ${target} is now an admin 👑` });
                break;

            case "demote":
                if (!isAdmin) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Only admins can demote ⬇️" });
                if (!target) return sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Please provide a number to demote ⬇️" });
                // Demote logic here
                await sock.sendMessage(msg.key.remoteJid, { text: `⬇️ User ${target} has been demoted 😔` });
                break;

            case "list":
                let adminList = groupAdmins.concat(ownerNumbers.filter(n => !groupAdmins.includes(n)));
                let msgText = "🛡️ *Admin List* 🛡️\n\n";
                adminList.forEach((num, idx) => { msgText += `${idx + 1}. ${num}\n`; });
                await sock.sendMessage(msg.key.remoteJid, { text: msgText });
                break;

            // -----------------------------
            // GROUP COMMANDS 👥
            // -----------------------------
            case "groupid":
                await sock.sendMessage(msg.key.remoteJid, { text: `🆔 Group ID: ${msg.key.remoteJid}` });
                break;

            case "antilink":
                if (!isAdmin) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Only admins can toggle anti-link 🚫" });
                // Toggle anti-link logic here
                await sock.sendMessage(msg.key.remoteJid, { text: "🔗 Anti-link has been toggled ✅" });
                break;

            // -----------------------------
            // GAMES 🎮
            // -----------------------------
            case "guess":
                if (!args[1]) return sock.sendMessage(msg.key.remoteJid, { text: "❓ Usage: !commands guess <number 1-10> 🎯" });
                const userGuess = parseInt(args[1]);
                const correctNumber = Math.floor(Math.random() * 10) + 1;
                if (userGuess === correctNumber) {
                    await sock.sendMessage(msg.key.remoteJid, { text: `🎉 Congratulations! You guessed the number ${correctNumber}! 🥳` });
                } else {
                    await sock.sendMessage(msg.key.remoteJid, { text: `😢 Wrong guess! The correct number was ${correctNumber}. Try again! 🎯` });
                }
                break;

            // -----------------------------
            // JOKES 😂
            // -----------------------------
            case "joke":
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                await sock.sendMessage(msg.key.remoteJid, { text: randomJoke });
                break;

            default:
                await sock.sendMessage(msg.key.remoteJid, {
                    text:
`❓ Unknown command!

🛡️ Admin Commands:
!commands kick <number> 👢
!commands promote <number> ⬆️
!commands demote <number> ⬇️
!commands list 🛡️

👥 Group Commands:
!commands groupid 🆔
!commands antilink 🔗

🎮 Games:
!commands guess <1-10> 🎯

😂 Jokes:
!commands joke`
                });
        }
    }
};