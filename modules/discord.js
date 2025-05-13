async function checkPresence(client, userID, guildID, callback) {
    let isChecking = false;
    
    setInterval(async () => {
        if (isChecking) return;
        isChecking = true;
        
        try {
            const guild = await client.guilds.fetch(guildID);
            const member = await guild.members.fetch(userID);
            callback(member.presence);
        } catch (error) {
            console.error("Error checking presence:", error);
        } finally {
            isChecking = false;
        }
    }, 3000);
}

module.exports = { checkPresence };