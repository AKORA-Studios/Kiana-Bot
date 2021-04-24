const { Message } = require('discord.js');
const { deatiledEmb, emotes, calcLevel, colors } = require('../utilities');

module.exports = {
    name: 'profile',
    syntax: 'profile [@user]',
    args: false,
    type: 'Economy',
    description: 'Shows the profile of a user',
    commands: ['profile'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let user = msg.mentions.users.first() || msg.author
        if (user.bot) return msg.channel.send(emb.setColor(colors.error).setTitle("Bots do not have profiles")).catch()

        let profile = await msg.client.database.UserConfigCache.getConfig(user.id),
            bal = parseInt(profile.wallet) + parseInt(profile.bank),
            birthday = ""

        let level = "\`" + calcLevel(profile.xp) + `\` **[** ${(profile.xp).toLocaleString()} **XP]**`

        let badges = []
        if (profile.partner) { badges.push(emotes.partner) } else { badges.push(emotes.inactivepartner) }
        if (profile.developer) { badges.push(emotes.staff) } else { badges.push(emotes.inactivestaff) }
        if (profile.booster) { badges.push(emotes.boost3) } else { badges.push(emotes.boost1) }

        if (!profile.birthday) { birthday = '/' } else { birthday = profile.birthday }

        emb.setDescription(`${badges.join('')} \n\n 🎂 **Birthday:** \`${birthday}\` \n 💰 **Money:** \`${bal.toLocaleString()}\` **¥**\n 🔖 **Level:** ${level}`)
        msg.channel.send(emb.setTitle(`.•☆ Pofile ${user.username} ☆•.`)).catch()
    }
};