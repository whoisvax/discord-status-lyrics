async function setStatus(client, CustomStatus, status) {
    try {
        const custom = new CustomStatus(client).setEmoji("🎵").setState(status);
        client.user.setPresence({ activities: [custom] });
    } catch (error) {
        console.error("(SELFBOT.JS): Error updating status:", error);
    }
}

module.exports = { setStatus };