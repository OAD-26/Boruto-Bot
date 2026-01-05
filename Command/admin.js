// commands/admin.js
const { ownerNumbers, admins, botName } = require("../config");

module.exports = {
    name: "admin",
    description: "Admin commands: kick, promote, demote, list admins 🛡️",
    prefix: "!",
    execute: async (sock, msg, args, groupAdmins) => {
        const sender = msg.key.participant || msg.key.remoteJid;
        const isOwner = ownerNumbers.includes(sender.split("@")[0]);
        const isAdmin = groupAdmins.includes(sender.split("@")[0]) || isOwner;

        if (!isAdmin) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ You are not an admin! Only admins can use this command 🛑",
            });
            return;
        }

        const command = args[0];
        const target = args[1]; // expect phone number like 2349xxxxxx

        switch (command) {
            case "kick":
                if (!target) {
                    await sock.sendMessage(msg.key.remoteJid, {
                        text: "⚠️ Please mention the number to kick! Example: !admin kick 2349123456789",
                    });
                    return;
                }
                // implement kick logic here
                await sock.sendMessage(msg.key.remoteJid, {
                    text: `👢 User ${target} has been kicked by ${sender.split("@")[0]}!`,
                });
                break;

            case "promote":
                if (!target) {
                    await sock.sendMessage(msg.key.remoteJid, {
                        text: "⚠️ Please mention the number to promote! Example: !admin promote 2349123456789",
                    });
                    return;
                }
                // implement promote logic here
                await sock.sendMessage(msg.key.remoteJid, {
                    text: `⬆️ User ${target} has been promoted to admin! 👑`,
                });
                break;

            case "demote":
                if (!target) {
                    await sock.sendMessage(msg.key.remoteJid, {
                        text: "⚠️ Please mention the number to demote! Example: !admin demote 2349123456789",
                    });
                    return;
                }
                // implement demote logic here
                await sock.sendMessage(msg.key.remoteJid, {
                    text: `⬇️ User ${target} has been demoted from admin! 😔`,
                });
                break;

            case "list":
                let adminList = groupAdmins.concat(
                    ownerNumbers.filter((n) => !groupAdmins.includes(n)),
                );
                let msgText = "🛡️ *Admin List* 🛡️\n\n";
                adminList.forEach((num, idx) => {
                    msgText += `${idx + 1}. ${num}\n`;
                });
                await sock.sendMessage(msg.key.remoteJid, { text: msgText });
                break;

            default:
                await sock.sendMessage(msg.key.remoteJid, {
                    text:
                        `❓ Unknown command! Available commands for admins:\n\n` +
                        `!admin kick <number> 👢\n` +
                        `!admin promote <number> ⬆️\n` +
                        `!admin demote <number> ⬇️\n` +
                        `!admin list 🛡️`,
                });
        }
    },
};
