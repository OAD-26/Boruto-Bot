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