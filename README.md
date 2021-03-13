# Kiana Bot
 Powerful discord bot

 ![image1](https://cdn.discordapp.com/attachments/753474862693089300/807617649823055882/unknown.png)


## Comamnds
| Module        | Commands       
| ----------- |----------------------| 
| Moderation     | addemoji, ban, clear, kick, permissions, purge, rolecolor, setchannelnsfw, spurge, snipe, warn |
| Info     | avatar, botinfo, update, channelinfo, emojiinfo, help, infractions, ping, rank, roleinfo, servericon, serverinfo, afk, uptime, userinfo, userpermissions, bug, invite      | 
| Configuration | disable, emit, prefix, setgb, setlog, setnsfw, setquote, settings, setwlc, setxp      |
| Economy     | balance, birthday, crime, daily, deposit, gamble, leaderboard, profile, ranks, rob, roulett, slots, transfer, weekly, withdraw, work      | 
| Fun     | 8ball, calc, choose, coinflip, dice, gayrate, gecg, joke, lovecalc, meme, pop, quote, random, say, simprate, token, urban, waifu2, weeb      | 
| Anime     | animequote, randomanime, searchanime, waifu      | 
| Gifs     | angry, baka, bite, blush, bonk, bored, bully, confused, cringe, cry, cuddle, dance, dog, feed, glomp, goose, greeting, happy, highfive, hug, kiss, laugh, lizard, megumin, cat, nom, pat, poke, quadrat, sad, slap, sleep, smug, think, tickle, wave, wink      | 
| Developer     | eval, reload, serverlist, shutdown, up      | 
| NSFW     | ahegao, anal, ass, bdsm, blowjob, boobs, cuckold, cum, doujin, ero, femdom, foot, gangbang, hentai, hentaigif, maid, manga, netorare, orgy, panties, pantsu, thigh, uniform, yuri      | 

## Run
1. Fill out the config.json file, and your moongose conenction link in index.js

Example Config Setup

```
{
    "owner": [
        "111111111111111111",
        "111111111111111111"
    ],
    "prefix": "+",
    "topgg_token": "ExampleToken",
    "token": "DiscordBotToken",
    "supportinvite": "https://discord.gg/Emk2udJ",
}
```

Example Mongoose Connection

```Javascript
mongoose.connect('mongodb://localhost:27017/kiana?gssapiServiceName=mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(() => {
    console.log("Connected to the Mongodb database");
}).catch((err) => {
    console.log("Unable to connect to the Mongodb database. Error:" + err, "error");
});

```
2. All emojis probably wouldn´t work because their are custom emotes. Fill in your emotes in utilities.js if you want them to work lol

You could get their name by writing backslash + emote 

Example:
```
\✨
```

Example Emote Setup:

```Javascript
const emotes = {
    false: "<:false:740942401413185656>",
    true: "<:true:740942401161527426>",
    mobile: "<:mobile:741225706843013122>",
    bot: "<:Clyde:741225707203592232>",
    bughunter: "<:BugHunter:787302675107676200>",
    bughunter2: "<:BugHunter2:787302675128647680>",
    soundwave: "<:soundwave:791019656747286560>",

    ban: "<:ban:805904813409697843>"
}
```

3. You could change the bot status, by changing activities in resources/activities.json
Example Actibvity setup:

```
{
    "Testing new Stuff": "PLAYING",
    "with some kitten": "PLAYING",
    "some docs": "WATCHING",
    "with Yumeko Jabami (Kageguri)": "PLAYING",
    "Praying to Yoghurt": "PLAYING"
}
```

```
node index.js
```

## Installation
```
npm i
```
## Dependencies
        "akaneko": "^3.3.0",
        "animequote": "^1.1.1",
        "bent": "^7.3.10",
        "canvacord": "^5.0.8",
        "canvas": "^2.6.1",
        "canvas-senpai": "^1.0.0",
        "discord.js": "^12.3.1",
        "hmtai": "^1.4.5",
        "moment": "^2.27.0",
        "mongoose": "^5.11.8",
        "node-fetch": "^2.6.0",
        "novelcovid": "^3.0.0",
        "parse-ms": "^2.1.0",
        "os-utils": "0.0.14",
        "tnai": "^1.0.5",
        "urban": "^0.3.2"