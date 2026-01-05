<<<<<<< HEAD
const settings = require('../settings');
const { addSudo, removeSudo, getSudoList } = require('../lib/index');
const isOwnerOrSudo = require('../lib/isOwner');

function extractMentionedJid(message) {
    const mentioned = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentioned.length > 0) return mentioned[0];
    const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    const match = text.match(/\b(\d{7,15})\b/);
    if (match) return match[1] + '@s.whatsapp.net';
    return null;
}

async function sudoCommand(sock, chatId, message) {
    const senderJid = message.key.participant || message.key.remoteJid;
    const isOwner = message.key.fromMe || await isOwnerOrSudo(senderJid, sock, chatId);

    const rawText = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    const args = rawText.trim().split(' ').slice(1);
    const sub = (args[0] || '').toLowerCase();

    if (!sub || !['add', 'del', 'remove', 'list'].includes(sub)) {
        await sock.sendMessage(chatId, { text: 'Usage:\n.sudo add <@user|number>\n.sudo del <@user|number>\n.sudo list' },{quoted :message});
        return;
    }

    if (sub === 'list') {
        const list = await getSudoList();
        if (list.length === 0) {
            await sock.sendMessage(chatId, { text: 'No sudo users set.' },{quoted :message});
            return;
        }
        const text = list.map((j, i) => `${i + 1}. ${j}`).join('\n');
        await sock.sendMessage(chatId, { text: `Sudo users:\n${text}` },{quoted :message});
        return;
    }

    if (!isOwner) {
        await sock.sendMessage(chatId, { text: '❌ Only owner can add/remove sudo users. Use .sudo list to view.' },{quoted :message});
        return;
    }

    const targetJid = extractMentionedJid(message);
    if (!targetJid) {
        await sock.sendMessage(chatId, { text: 'Please mention a user or provide a number.' },{quoted :message});
        return;
    }

    if (sub === 'add') {
        const ok = await addSudo(targetJid);
        await sock.sendMessage(chatId, { text: ok ? `✅ Added sudo: ${targetJid}` : '❌ Failed to add sudo' },{quoted :message});
        return;
    }

    if (sub === 'del' || sub === 'remove') {
        const ownerJid = settings.ownerNumber + '@s.whatsapp.net';
        if (targetJid === ownerJid) {
            await sock.sendMessage(chatId, { text: 'Owner cannot be removed.' },{quoted :message});
            return;
        }
        const ok = await removeSudo(targetJid);
        await sock.sendMessage(chatId, { text: ok ? `✅ Removed sudo: ${targetJid}` : '❌ Failed to remove sudo' },{quoted :message});
        return;
    }
}

module.exports = sudoCommand;


=======
const fs = require('fs');
const path = require('path');

module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    const args = text.split(' ').slice(1);
    const sub = args[0]?.toLowerCase();

    if (!config.ownerNumbers.includes(sender.split('@')[0])) return sock.sendMessage(jid, { text: '❌ Owner only command!' });

    const sudoPath = path.join(__dirname, "../data/sudo.json");
    let sudo = fs.existsSync(sudoPath) ? JSON.parse(fs.readFileSync(sudoPath)) : [];

    if (sub === 'add') {
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || args[1] + '@s.whatsapp.net';
        if (!sudo.includes(target)) sudo.push(target);
        fs.writeFileSync(sudoPath, JSON.stringify(sudo, null, 2));
        await sock.sendMessage(jid, { text: `✅ Added @${target.split('@')[0]} to sudo!`, mentions: [target] });
    } else if (sub === 'list') {
        await sock.sendMessage(jid, { text: `👑 *Sudo Users*:\n\n${sudo.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')}`, mentions: sudo });
    } else {
        await sock.sendMessage(jid, { text: 'Usage: !sudo add <@user> | !sudo list' });
    }
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
