async function checkPresence(client, userID, guildID, callback) {
    setInterval(async () => {
        try {
            const guild = await client.guilds.fetch(guildID);
            const member = await guild.members.fetch(userID);
            callback(member.presence);
        } catch (error) {
            console.error("(DISCORD.JS) Error checking presence:", error);
        }
    }, 3500);
}

module.exports = { checkPresence };