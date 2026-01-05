const fs = require("fs");
const path = require("path");

// Paths to your JSON data files
const welcomerDataFile = path.join(__dirname, "..", "data", "welcomer.json");
const antilinkDataFile = path.join(__dirname, "..", "data", "antilink.json");
const groupSettingsFile = path.join(__dirname, "..", "data", "groupSettings.json");

// Load JSON files or create empty objects if they don't exist
let welcomerData = fs.existsSync(welcomerDataFile)
    ? JSON.parse(fs.readFileSync(welcomerDataFile))
    : { groups: {} };

let antilinkData = fs.existsSync(antilinkDataFile)
    ? JSON.parse(fs.readFileSync(antilinkDataFile))
    : { groups: {} };

let groupSettings = fs.existsSync(groupSettingsFile)
    ? JSON.parse(fs.readFileSync(groupSettingsFile))
    : { groups: {} };

module.exports = {
    name: "groupid",
    description: "Shows the group ID and sets up default group data if new",
    async execute(sock, msg, groupId) {
        // Initialize group in welcomer.json
        if (!welcomerData.groups[groupId]) {
            welcomerData.groups[groupId] = {
                welcome: "Welcome @user to the group!",
                goodbye: "Goodbye @user!",
                enabled: true
            };
            fs.writeFileSync(welcomerDataFile, JSON.stringify(welcomerData, null, 2));
        }

        // Initialize group in antilink.json
        if (!antilinkData.groups[groupId]) {
            antilinkData.groups[groupId] = { enabled: true };
            fs.writeFileSync(antilinkDataFile, JSON.stringify(antilinkData, null, 2));
        }

        // Initialize group in groupSettings.json
        if (!groupSettings.groups[groupId]) {
            groupSettings.groups[groupId] = { antiSpam: false };
            fs.writeFileSync(groupSettingsFile, JSON.stringify(groupSettings, null, 2));
        }

        // Send group ID message
        await sock.sendMessage(groupId, {
            text: `✅ This group ID is:\n\n${groupId}`
        });
    }
};