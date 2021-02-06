const fs = require("fs");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const { Client } = require("discord.js");
const client = new Client({ shards: 'auto' });

const { colors, rawEmb, emotes } = require("./commands/utilities");
const config = require("./config.json");
var { token } = config;
client.config = config;

client.snipedMessages = new Map()
client.spammingCollection = new Discord.Collection();

const activities = require("./resources/activities.json");
const activitie_keys = Object.keys(activities);

const GuildConfigShema = require('./database/GuildShema');
const MemberShema = require('./database/MemberShema');
const UserShema = require('./database/UserShema');

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

const initDatabase = async () => {
    try {
        for (let entr of (await GuildConfigShema.find({}))) client.database.GuildSettingsCache.set(entr.guildID, entr);
        for (let entr of (await MemberShema.find({}))) client.database.MemberConfigCache.set(entr.memberID, entr);
        for (let entr of (await UserShema.find({}))) client.database.UserConfigCache.set(entr.userID, entr);
        console.log(" > 🗸 Cached Database Entries");
    } catch (e) {
        console.log(" > ❌ Error While Caching Database")
        console.log(e);
        //process.exit(1);
    }
}
const setLogs = async (client) => {
    let mainGuild = await client.guilds.fetch('553942677117337600')

    let report_channel = mainGuild.channels.resolve('753474865104683110')
    let error_channel = mainGuild.channels.resolve('753474850647048313')
    client.report_channel = report_channel
    client.error_channel = error_channel
}

//==================================================================================================================================================
//Initialize the Commands
//==================================================================================================================================================
client.commands = new Discord.Collection();
const commandDirectorys = fs
    .readdirSync("./commands").map(name => "./commands/" + name).filter(path => fs.lstatSync(path).isDirectory());
for (const dir of commandDirectorys) {
    const module_name = dir.split('/')[dir.split('/').length - 1];
    const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
    for (let file of commandFiles) {
        const command = require(`${dir}/${file}`);
        client.commands.set(command.name, {
            command: command,
            module: module_name
        });
    }
}
//==================================================================================================================================================
//Starting the Bot
//==================================================================================================================================================
const start = async (client) => {
    try {
        await initDatabase();
        console.log("Logging in...");
        await client.login(token).catch(e => {
            switch (e.code) {
                case 500:
                    console.log(" > ❌ Fetch Error");
                    break;
                default:
                    console.log(" > ❌ Unknown Error");
                    break;
            }
            setTimeout(() => { throw e }, 5000); //5 Second Timeout
        });
        await setLogs(client)
    } catch (e) {
        console.log(e);
    }
}
//==================================================================================================================================================
//Ready
//==================================================================================================================================================
client.on("ready", async () => {
    await start(client);
    console.log(" >  Logged in as: " + client.user.tag + " At: " + (new Date()).toLocaleString());

    let emb = rawEmb().setDescription("**Online** \n" + new Date().toUTCString().substr(0, 22) + `\n **Guilds:** ${client.guilds.cache.size} [${(client.users.cache.size).toLocaleString()}]`)
    client.report_channel.send(emb).catch()

    setInterval(() => {
        let index = Math.floor(Math.random() * activitie_keys.length);
        let key = activitie_keys[index];
        let type = activities[key].toUpperCase();
        key = key + ` [${index}]`;

        let user_count = 0;
        for (let g of client.guilds.cache.array()) user_count += g.memberCount;
        let guild_count = client.guilds.cache.size;
        let cmd_count = client.commands.size

        key = key.replace(/\$GUILDS\$/g, guild_count).replace(/\$USERS\$/g, user_count);
        key = key.replace(/\$CMD\$/g, cmd_count)

        client.user.setPresence({ activity: { name: key, type: type }, status: 'idle' });
    }, 60000);
});
client.login(token)

module.exports = client
require('./database/request')

require('./events/message')
require('./events/modlog')
require('./events/guildMemberJoin')
require('./events/guildMemberRemove')
require('./events/guildCountUpdate')