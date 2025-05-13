const axios = require("axios");

async function fetchLyrics(track, artist) {
    try {
        const response = await axios.get("https://lrclib.net/api/get", {
            params: { track_name: track, artist_name: artist }
        });

        if (!response.data?.syncedLyrics) return null;

        return response.data.syncedLyrics
            .split("\n")
            .map(line => {
                const match = line.match(/^\[(\d+):(\d+\.\d+)\](.*)/);
                if (!match) return null;
                return {
                    startTime: (parseInt(match[1]) * 60000 + parseFloat(match[2]) * 1000),
                    text: match[3].trim()
                };
            })
            .filter(Boolean)
            .sort((a, b) => a.startTime - b.startTime);
    } catch (error) {
        console.error("(LYRICS.JS): Lyric fetch error:", error);
        return null;
    }
}

function getCurrentLyric(lyrics, progress, delay = -1000) {
    if (!lyrics) return null;
    const adjustedProgress = progress - delay;
    
    for (let i = 0; i < lyrics.length; i++) {
        if (adjustedProgress >= lyrics[i].startTime && 
            (!lyrics[i + 1] || adjustedProgress < lyrics[i + 1].startTime)) {
            return lyrics[i].text;
        }
    }
    return null;
}

module.exports = { fetchLyrics, getCurrentLyric };