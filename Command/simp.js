module.exports = async (sock, msg, config) => {
    const jid = msg.key.remoteJid;
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant || msg.key.remoteJid;
    
    const pp = await sock.profilePictureUrl(mentioned, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    const url = `https://some-random-api.com/canvas/misc/simpcard?avatar=${encodeURIComponent(pp)}`;
    
    await sock.sendMessage(jid, { image: { url }, caption: `*Religion: Simping* @${mentioned.split('@')[0]}`, mentions: [mentioned] }, { quoted: msg });
};