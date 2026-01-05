<<<<<<< HEAD
const settings = require('../settings');

async function ownerCommand(sock, chatId) {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${settings.botOwner}
TEL;waid=${settings.ownerNumber}:${settings.ownerNumber}
END:VCARD
`;

    await sock.sendMessage(chatId, {
        contacts: { displayName: settings.botOwner, contacts: [{ vcard }] },
    });
}

module.exports = ownerCommand;
=======
module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${config.ownerName}
TEL;waid=${config.ownerNumbers[0]}:${config.ownerNumbers[0]}
END:VCARD
`;
    await sock.sendMessage(jid, {
        contacts: { displayName: config.ownerName, contacts: [{ vcard }] },
    });
};
>>>>>>> 154b7da2612e70263865b8718cea26a53a8d6e86
