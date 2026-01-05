module.exports = {
    name: 'grouponly',
    description: 'Enable or disable the bot in this group (admin only).',
    async execute(message, args, client) {
        if (message.channel.type !== 'group') {
            return message.reply('This command can only be used in groups.');
        }

        // Check if the user is an admin.
        let isAdmin = false;
        try {
            const group = await client.getChat(message.chatId);
            const groupMetadata = await group.getGroupMetadata();
            isAdmin = groupMetadata.participants.filter(participant => participant.isAdmin || participant.isSuperAdmin).some(admin => admin.id._serialized === message.author);
        } catch (error) {
            console.error("Error fetching group metadata or admins:", error);
            return message.reply("Could not verify admin status. Check bot permissions and ensure it's an admin in the group.");
        }

        if (!isAdmin) {
            return message.reply('Only admins can use this command.');
        }

        if (!args[0]) {
           return message.reply('Please specify either "enable" or "disable".');
        }

        const setting = args[0].toLowerCase();

        if (setting === 'enable') {
            // Logic to enable the bot in this group. You'll need to implement this based on your bot's architecture.
            // This is a placeholder.  Replace with your actual enabling logic (e.g., store the group ID in a database).
            console.log(`Enabling bot for group ID: ${message.chatId}`);
            message.reply('Bot has been enabled for this group.');
        } else if (setting === 'disable') {
            // Logic to disable the bot in this group.  You'll need to implement this based on your bot's architecture.
            // This is a placeholder. Replace with your actual disabling logic (e.g., remove the group ID from a database).
            console.log(`Disabling bot for group ID: ${message.chatId}`);
            message.reply('Bot has been disabled for this group.');
        } else {
            message.reply('Invalid setting. Use "enable" or "disable".');
        }
    },
};