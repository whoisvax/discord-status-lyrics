# Discord Status to Lyrics
### A self-bot to automatically adjust your status to the synced lyrics of the song you're currently listening to on spotify.


<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1258202280121864212/1372560699586252821/Screenshot_1.png?ex=68273843&is=6825e6c3&hm=1bffc6209cf93a7a462ef71782c5733471b9f90d13385382976ff414509e8a34&">
</p>

> [!CAUTION]
> **Self-botting is against the [Discord Terms of Service](https://discord.com/terms)**
>> By proceeding you accept the risk of being liable for any action taken on your Discord account.

## Methodology

1. Run a Discord bot [using discord.js](https://www.npmjs.com/package/discord.js)
    1. every 3 seconds: fetch a user's rich presence, to check if listening to Spotify.
2. If listening to Spotify, fetch the synced song's lyrics with [this API](https://lrclib.net/docs).
3. Automatically adjust the user's status [via this library](https://github.com/aiko-chan-ai/discord.js-selfbot-v13) based on the synced lyrics to the song.
    1. Item 3a
    2. Item 3b

## How to set up?

1. Set-up the environmental variables used:
    1. **botToken** (discussed in the second point.)
    2. **userToken** (discussed below)
    3. **userID**
    4. **guildID**
2. Make a new Discord application [here](https://discord.com/developers/applications) and use the token to set up the afromentioned env variable.
3. Run ``index.js``

## How can i get my user token?

<strong>Run this (Discord Console - [Ctrl + Shift + I])</strong>

```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
window.webpackChunkdiscord_app.pop();
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```

## What are the limitations?
- The app short-circuits if the lyrics fetcher hits a 404 (song not available) **this is a very minor problem that i am truly too lazy to fix**
- You can't see your own status changing, the prespective from your client is different from every other.
- Your Spotify rich presence has to be visible.
- The user and the bot need to share a guild (a private one works).

### I need help/I found a bug/I would like to talk with you.
- Contact me at **@phobiaphobiaphobia** or **@larpeiro** on Discord.

##### Check more projects [here!](https://github.com/whoisvax/) (and please star this one..).

##### Credits to: [Discord.js](https://www.npmjs.com/package/discord.js), [Discord.js-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13), [LRCLIB](https://lrclib.net/)
