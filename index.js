const Discord = require("discord.js");
const SelfbotDiscord = require("discord.js-selfbot-v13");
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildPresences]});
const SelfbotClient = new SelfbotDiscord.Client();

require("dotenv").config();

const config = {
    botToken: process.env.BOT_TOKEN,
    userToken: process.env.USER_TOKEN,
    userID: process.env.USER_ID,
    guildID: process.env.GUILD_ID
};

const customStatus = SelfbotDiscord.CustomStatus;

const { checkPresence } = require("./modules/discord");
const { fetchLyrics, getCurrentLyric } = require("./modules/lyrics");
const { setStatus } = require("./modules/selfbot");

let currentTrackKey = "";
let currentLyrics = null;
let lastLyric = null;
let localStartTime = null;
let initialProgress = 0;

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    checkPresence(client, config.userID, config.guildID, async (presence) => {
        const spotifyActivity = presence?.activities.find(a => a.name === "Spotify");
        
        if (!spotifyActivity) {
            if (currentTrackKey) {
                currentTrackKey = "";
                currentLyrics = null;
                localStartTime = null;
                await setStatus(SelfbotClient, customStatus, "");
            }
            return;
        }

        const { details: track, state: artist, timestamps } = spotifyActivity;

        if (!timestamps?.start) {
            localStartTime = null;
            return;
        }

        const newTrackKey = `${track}-${artist}`;
        const progressFromAPI = Date.now() - timestamps.start;

        if (newTrackKey !== currentTrackKey || !localStartTime) {
            currentTrackKey = newTrackKey;
            localStartTime = Date.now();
            initialProgress = progressFromAPI;
            currentLyrics = await fetchLyrics(track, artist);
            lastLyric = null;
        }

        const localProgress = initialProgress + (Date.now() - localStartTime);

        if (currentLyrics?.length) {
            const currentLyric = getCurrentLyric(currentLyrics, localProgress);
            if (currentLyric && currentLyric !== lastLyric) {
                lastLyric = currentLyric;
                await setStatus(SelfbotClient, customStatus, currentLyric);
            }
        }
    });
});

client.login(config.botToken);
SelfbotClient.login(config.userToken);