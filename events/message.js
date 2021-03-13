const client = require('../index')
const { colors, rawEmb, calcLevel, emotes, checkOwner, deatiledEmb } = require("../commands/utilities")
const fs = require("fs");
const { join } = require('path');

const { Collection, MessageEmbed } = require("discord.js");
const cooldowns = new Collection();
const xpCooldown = new Collection(); //<userID, Date>
const config = client.config

const { levelupCard } = require('./images')
const { list } = require('../resources/blacklist.json')
const afkMember = new Map
client.afkMember = afkMember;

client.on('levelup', async (message, ch, neu) => {
    if (me) {
        let channel;
        ch ? channel = message.guild.channels.resolve(ch) : channel = message.channel;

        if (!channel) return;
        let atach = await levelupCard(message.member, calcLevel(neu))
        channel.send(atach).catch()
    }
})

client.on("warn", console.log)
client.on("message", async message => {
    if (message.author.bot) return;
    if (list.includes(message.author.id)) return
    var emb = deatiledEmb(message)
    //if (client.config.owner.includes(message.author.id)) return client.emit('levelup', message, 'eerewr', message.channel.id, 4000);
    let settings;

    if (message.channel.type == 'dm') {
        settings = {
            autoQuote: true,
            prefix: '--'
        }

    } else {
        let afkState = client.afkMember.get(message.author.id)
        let mentionedFirst;
        if (message.mentions.members.first()) mentionedFirst = message.mentions.members.first()

        if (afkState) {
            client.afkMember.delete(message.author.id)
            message.channel.send(emb.setDescription(`**${message.author} your afk state is now removed**`).setColor(colors.error))
        } else if (mentionedFirst && client.afkMember.get(mentionedFirst.id)) {
            message.channel.send(emb.setDescription(client.afkMember.get(mentionedFirst.id)).setTitle(mentionedFirst.user.username + ' is AFK'))
        }

        settings = await client.database.GuildSettingsCache.getConfig(message.guild.id)

        //==================================================================================================================================================
        //Levelsystem
        //==================================================================================================================================================
        const now = Date.now(),
            cooldownTime = 60 * 1000;

        if (!xpCooldown.has(message.author.id)) xpCooldown.set(message.author.id, now);
        const last = xpCooldown.get(message.author.id);
        if ((last + cooldownTime) < now) {
            xpCooldown.set(message.author.id, now)

            let old = (await client.database.UserConfigCache.getConfig(message.author.id)).xp; //Siehe 100 Zeilen Tiefer
            let zzzz = await client.database.UserConfigCache.addXP(message.author.id, message.content.length);
            let neu = (await client.database.UserConfigCache.getConfig(message.author.id)).xp;

            let ch = settings.xpChannel

            if (calcLevel(neu) > calcLevel(old)) {
                client.emit('levelup', message, ch, neu);
            }
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    let prefix = settings.prefix;
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //==================================================================================================================================================
    //Auto Quoting
    //==================================================================================================================================================
    var bo = settings.autoQuote;
    if (bo) {
        var msg_link_regex = /https:\/\/(discord|discordapp)\.com\/channels\/([0-9]{18})\/([0-9]{18})\/([0-9]{18})/g,
            id_regex = /([0-9]{18})/g,
            links = message.content.match(msg_link_regex);
        if (links !== null) {
            for (let i = 0; i < links.length; i++) {
                var link = links[i],
                    ids = link.match(id_regex);

                if (ids === null || ids.length < 3) return;

                try {
                    var guild = await client.guilds.fetch(ids[0]).catch();
                    if (!guild) return;

                    var channel = guild.channels.resolve(ids[1]);
                    if (!channel || channel.type !== "text") return;

                    var M = await channel.messages.fetch(ids[2]).catch();
                    if (!M) return;

                    emb.setTitle('Autoquote')
                        .setFooter(M.author.tag, M.author.displayAvatarURL())
                        .setTimestamp(M.createdTimestamp)

                    if (M.embeds[0]) {
                        let atach_embed = M.embeds[0]
                        emb.addField("**Attachments:**", `Embed`)
                        if (atach_embed.title) emb.addField("Titel", atach_embed.title)
                        if (atach_embed.description) emb.addField("Description", atach_embed.description)
                    }
                    emb.setDescription(M.content)

                    if (M.attachments) {
                        for (var key of M.attachments.keys()) {
                            let atach = M.attachments.get(key)
                            emb.addField("**Attachments:**", `${atach.name} [${atach.id}]`)
                        }
                    }
                } catch (e) {
                    //If something is wrong
                    emb.setTitle("Invalid");
                    emb.setColor(colors.error);
                    return;
                }
                message.channel.send(emb).catch();
            }
        }
    }
    //==================================================================================================================================================
    //Client Mentioned 
    //==================================================================================================================================================
    const clientMention = new RegExp(`<@!?${client.user.id}>`, 'g');
    var len = prefix.length, cont = message.content;
    if (!cont.startsWith(prefix)) {
        if (cont.match(clientMention)) {
            len = cont.indexOf('>') + 1;
            try { message.mentions.users.delete(client.user.id) } catch (er) { }
            try { message.mentions.members.delete(client.user.id) } catch (er) { }
        } else {
            return
        }
    }
    //==================================================================================================================================================
    //Start with prefix
    //==================================================================================================================================================
    const args = message.content.slice(len).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commandName && message.content.match(clientMention))
        message.channel.send(`My Prefix for this Server is \`${settings.prefix}\` and <@${client.user.id}>`).catch()


    const commandObj = client.commands.find(cmd => cmd.command.commands.includes(commandName));
    if (!commandObj) return;
    const { command } = commandObj;
    let commandNeeded = command.needed
    let target,
        role;

    if (command.commands.includes("reload") && client.config.owner.includes(message.author.id)) {
        return reloadModules(message);
    }

    if (message.channel.type == 'dm') {
        if (!command.DmChannel) return message.channel.send(emb.setDescription('This comamnd can´t be executed in dm Channels').setColor(colors.error)).catch()
        commandNeeded = []
        command.perm = []
    } else {
        if (!(message.channel.permissionsFor(message.guild.me)).has('EMBED_LINKS')) {
            return message.channel.send('⚠️ I need rights to send Embeds, to work correctly ⚠️').catch()
        }
    }

    if (commandNeeded) {
        if (commandNeeded.includes('NSFW')) {
            if (!settings.nsfw) {
                emb.setDescription("⚠️ **NSFW Commands are not allowed on this server qwq**")
                return message.channel.send(emb.setColor(colors.error)).catch();
            }
            if (!message.channel.nsfw) {
                emb.setDescription("⚠️ **NSFW Commands are not allowed in this channel**")
                return message.channel.send(emb.setColor(colors.error)).catch();
            }
        }
        let Failed = []
        for (perm of commandNeeded) {
            if (perm !== 'NSFW') { if (!message.guild.me.hasPermission(perm)) Failed.push(perm) }
        }

        if (Failed.length > 0) {
            if (Failed.length === 1) {
                emb.setDescription("⚠️ **I´m missing the following permission:** `" + Failed.join(' ') + "`")
                return message.channel.send(emb.setColor(colors.error)).catch();
            } else {
                emb.setDescription("⚠️ **I´m missing the following permissions:** `" + Failed.join(', ') + "`")
                return message.channel.send(emb.setColor(colors.error)).catch();
            }
        }
    }

    //==================================================================================================================================================
    //Checking User permission
    //==================================================================================================================================================
    if (command.perm) {
        let FailedUserPErmissions = []
        for (p of command.perm) {
            if (p !== 'DEVELOPER') { if (!message.member.hasPermission(p)) FailedUserPErmissions.push(p) } else { }
        }
        if (command.perm.includes('DEVELOPER')) {
            if (!config.owner.includes(message.author.id)) {
                emb.setDescription("⚠️ **You are not my** `Developer` **qwq**")
                return message.channel.send(emb.setColor(colors.error)).catch();
            }
        } else if (FailedUserPErmissions.length > 0 && !config.owner.includes(message.author.id)) {
            emb.setDescription("⚠️ **You are missing following permission:** `" + FailedUserPErmissions.join(', ') + "`")
            return message.channel.send(emb.setColor(colors.error)).catch();
        }
    }
    //==================================================================================================================================================
    //Command Error
    //==================================================================================================================================================
    if (command.args && !args.length) {
        emb.setTitle("⚠️   Syntax Error ⚠️").setColor(colors.error)

        if (command.syntax) {
            emb.addField(`Syntax`, `\`${prefix}${command.syntax}\``)
        }
        return message.channel.send(emb).catch();
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            emb.setTitle("Cooldown: " + (timeLeft.toFixed(1)).toLocaleString())
            return message.channel.send(emb).catch();
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
        command.execute(message, args);

    } catch (error) {
    }
});

//==================================================================================================================================================
// Reloading Commands
//==================================================================================================================================================
/**
 * @param {string} argument
 * @param {Message} msg
 */
const reloadModules = async function (msg) {
    let emb = deatiledEmb(msg)
    var root = join(__dirname, "..", "commands");
    console.log(root);

    console.log("Reload Modules");
    const commandDirectorys = fs
        .readdirSync(root).map(name => join(root, name)).filter(path => fs.lstatSync(path).isDirectory());

    let text = "**LOAD MODULES**";
    msg = await msg.channel.send(emb.setDescription(text)).catch();
    var module_count = 0;

    for (const dir of commandDirectorys) {
        const module_name = dir.split('/').reverse()[0];
        const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
        for (let file of commandFiles) {
            let path = join(dir, file);
            try {
                delete require.cache[require.resolve(path)];
                const newCommand = require(path);
                client.commands.set(newCommand.name, {
                    command: newCommand,
                    module: module_name
                });
                module_count++;
                text += `\n **>** \`${module_name}/${newCommand.name}\``;
            } catch (error) {
                console.log(error);
                msg.channel.send(`Error occured by reloading: \`${newCommand.name}\`\n\`${error.message}\``).catch();
            }
        }
    }
    emb.setDescription("**Reloaded** `" + module_count + "` **commands UwU**")
    msg.edit(emb);
}

module.exports = () => { }