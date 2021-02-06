const { Message } = require('discord.js');
const { emotes, rawEmb } = require('../utilities');

module.exports = {
    name: 'serverinfo',
    syntax: 'serverinfo',
    args: false,
    type: 'Info',
    description: 'Shows you server information',
    commands: ['serverinfo', 'sinfo'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let premium = '0'
        let g = msg.guild;

        if (g.premiumTier == '1') { premium = emotes.boost1 }
        if (g.premiumTier == '2') { premium = emotes.boost2 }
        if (g.premiumTier == '3') { premium = emotes.boost3 }

        let roles = msg.guild.roles.cache;
        let roles_s = "";
        if (roles.size > 0) {
            if (roles.size > 10) {
                roles = roles.array().slice(0, 10);
                roles_s = roles.map(m => `<@&${m.id}>`).join("**,** ") + " . . .";
            } else { roles_s = roles.map(m => `<@&${m.id}>`).join("**,** "); }
        } else {
            roles_s = "None"
        }

        let creation_date = msg.channel.guild.createdAt.toUTCString().substr(0, 16)
        let voice_ch = g.channels.cache.filter(ch => ch.type == "voice").size
        let bots = g.members.cache.filter(member => member.user.bot).size

        let cat = g.channels.cache.filter(ch => ch.type == "category").size
        let afk = msg.guild.afkChannelID != null ? "`" + msg.guild.afkChannel.name + "`" : emotes.false
        let kanäle = ""
        let animated = g.emojis.cache.filter(emoji => emoji.animated).size

        let em = `Animated: ${animated} \n Normal: ${g.emojis.cache.size - animated}`

        kanäle += "Cat.: "

        kanäle += `${cat}\n ${emotes.text}${g.channels.cache.size} \n ${emotes.voice} ${voice_ch}`
        let bannedSize = await (await g.fetchBans()).size

        let emb = rawEmb(msg).setTitle(g.name)
            .addField("**Info**", `${emotes.owner} <@${g.ownerID}>\n${emotes.ban} ${bannedSize > 0 ? bannedSize : '0'} \n AFK: ${afk}`, true)

            .addField("** Channel:**", kanäle, true)
            .addField("**Other:**", `:lock: ${g.verificationLevel} \n Boost: ${premium} \n :earth_asia: ${g.region}`, true)

            .addField("**Member:**", `${emotes.user} ${msg.guild.memberCount} \n ${emotes.bot} ${bots}`, true)
            .setFooter(`Creation Date: ${creation_date}` + ` • ID: ${g.id}`)
            .addField(`**Emojis [${g.emojis.cache.size}]**`, `${em}`, true)

            .addField('\u200b', '\u200b', true)
            .addField(`**Roles [${msg.guild.roles.cache.size}]:**`, roles_s, true)

        if (msg.guild.iconURL) emb.setThumbnail(msg.guild.iconURL())
        msg.channel.send(emb).catch();
    }
};