const { Message } = require('discord.js');
const { colors, emotes, rawEmb } = require('../utilities');

module.exports = {
    name: 'userinfo',
    syntax: 'userinfo <@user | id>',
    args: false,
    type: 'Info',
    description: 'Shows you information about a user',
    commands: ['userinfo', 'uinfo', 'ui', 'whois'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = rawEmb()

        let user;
        let Z = false
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else if (!isNaN(args[0])) {
            user = await msg.client.users.fetch(args[0]);
            user.user = user;
            if (!msg.guild.members.resolve(args[0])) Z = true
        } else { user = msg.author; }

        let badges = []
        if (user.flags) {
            let flags = user.flags.toArray()
            if (user.bot) badges.push(emotes.bot)

            if (flags.includes("HYPESQUAD_EVENTS")) badges.push(emotes.hypesquad)
            if (flags.includes("VERIFIED_BOT")) badges.push(emotes.verify)
            if (flags.includes("VERIFIED_DEVELOPER")) badges.push(emotes.verify)

            if (flags.includes("HOUSE_BRAVERY")) badges.push(emotes.bravery)
            if (flags.includes("HOUSE_BRILLIANCE")) badges.push(emotes.brilliance)
            if (flags.includes("HOUSE_BALANCE")) badges.push(emotes.balance)

            if (flags.includes("EARLY_SUPPORTER")) badges.push(emotes.wumpus)
            if (flags.includes("DISCORD_EMPLOYEE")) badges.push(emotes.staff)
            if (flags.includes("DISCORD_PARTNER")) badges.push(emotes.partner)

            if (flags.includes("SYSTEM")) badges.push(emotes.staff)
            if (flags.includes("TEAM_USER")) badges.push(emotes.staff)

            if (flags.includes("BUGHUNTER_LEVEL_1")) badges.push(emotes.bughunter)
            if (flags.includes("BUGHUNTER_LEVEL_2")) badges.push(emotes.bughunter2)
        }

        if (Z) {
            emb.setAuthor(user.tag, user.avatarURL())
                .setThumbnail(user.avatarURL())
                .addField("**ID:**", user.id, true)
                .addField("**Badges:**", badges.length >= 1 ? badges.join(" ") : emotes.false, true)
                .setFooter('I don´t have any mutual server with this user')
            return msg.channel.send(emb).catch()
        }

        let member = msg.guild.member(user);
        let warns = []
        var warning = await msg.client.database.MemberConfigCache.getConfig(user.id, msg.guild.id);
        if (warning.warn1) { warns.push(emotes.true) } else { warns.push(emotes.false) }
        if (warning.warn2) { warns.push(emotes.true) } else { warns.push(emotes.false) }
        if (warning.warn3) { warns.push(emotes.true) } else { warns.push(emotes.false) }

        let nick = member.nickname !== null ? member.nickname : "None"

        emb.addField("**Nickname:**", nick, true)
            .setAuthor(user.tag, user.avatarURL({ dynamic: true }))
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .addField("**ID:**", user.id, true)
        if (badges.length >= 1) emb.addField("**Badges:**", badges.join(" "), true)

        emb.addField("**Joined at:**", member.joinedAt.toUTCString().substr(0, 16), true)
            .addField("**Created at:**", user.createdAt.toUTCString().substr(0, 16), true)
        emb.addField("**Warnings:**", warns.join(" "), true)
        if (member.premiumSince) emb.addField('**Booster since:**', member.premiumSince.toLocaleDateString('DE'), true)

        let r = member.roles ? member.roles.cache.map(r => `${r}`).join("  ") : emotes.false
        if (r.length > 2000) r = r.substr(2000)
        emb.setDescription(`**Roles[${member.roles.cache.size}]:** \n ${r}`)
        msg.channel.send(emb).catch();
    }
};