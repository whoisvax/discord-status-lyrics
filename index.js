const Discord = require("discord.js");
const SelfbotDiscord = require("discord.js-selfbot-v13");
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildPresences]});
const SelfbotClient = new SelfbotDiscord.Client();

require('dotenv').config();

const config = {
    botToken: process.env.BOT_TOKEN,
    userToken: process.env.USER_TOKEN,
    userID: process.env.USER_ID,
    guildID: process.env.GUILD_ID
};

const customStatus = SelfbotClient.customStatus;

const { checkPresence } = require("./modules/discord");
const { fetchLyrics, getCurrentLyric } = require("./modules/lyrics");
const { setStatus } = require("./modules/selfbot");

let currentLyrics = null;
let currentTrack = "";

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    checkPresence(client, config.userID, config.guildID, async (presence) => {
        const spotifyActivity = presence?.activities.find(a => a.name === "Spotify");
        
        if (spotifyActivity) {
            const { details: track, state: artist, timestamps } = spotifyActivity;
            const progress = Date.now() - timestamps.start;
            
            if (`${track}-${artist}` !== currentTrack) {
                currentTrack = `${track}-${artist}`;
                currentLyrics = await fetchLyrics(track, artist);
            }

            if (currentLyrics) {
                const lyric = getCurrentLyric(currentLyrics, progress);
                if (lyric) await setStatus(SelfbotClient, customStatus, lyric);
            }
        } else {
            currentTrack = "";
            currentLyrics = null;
        }
    });
});

client.login(config.botToken);
SelfbotClient.login(config.userToken);