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
        let emb = deatiledEmb(msg).setColor(colors.economy)
        let user;
        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first();
        } else { user = msg.author; }

        if (user.bot) return msg.channel.send(emb.setColor(colors.error).setTitle("Bots do not have profiles")).catch()

        let profile = await msg.client.database.UserConfigCache.getConfig(user.id),
            bal = parseInt(profile.wallet) + parseInt(profile.bank),
            birthday = "",
            marry = "";

        let votes = profile.votes > 0 ? (parseInt(profile.votes)).toLocaleString() : '/'
        let level = "\`" + calcLevel(profile.xp) + `\` **[** ${(profile.xp).toLocaleString()} **XP]**`

        let badges = []
        if (profile.partner) { badges.push(emotes.partner) } else { badges.push(emotes.inactivepartner) }
        if (profile.developer) { badges.push(emotes.staff) } else { badges.push(emotes.inactivestaff) }
        if (profile.booster) { badges.push(emotes.boost3) } else { badges.push(emotes.boost1) }

        if (!profile.birthday) { birthday = '/' } else { birthday = profile.birthday }
        if (!profile.marry) { marry = 'Nope qwq' } else {
            let U = (msg.client.users.cache.get(profile.marry))
            if (!U) {
                profile.marry = undefined;
                emb.addField("Error", "not found you marriage partner ;-;")
            } else { marry = U.username }
        }

        emb.setDescription(`${badges.join('')} \n\n 🎂 **Birthday:** \`${birthday}\` \n 💰 **Money:** \`${bal.toLocaleString()}\` **¥**\n\n💍 **Partner:** \`${marry}\` \n :busstop: **Votes:** \`${votes}\`\n 🔖 **Level:** ${level}`)
        msg.channel.send(emb.setTitle(`.•☆ Pofile ${user.username} ☆•.`)).catch()
    }
};