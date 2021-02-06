const { Message, MessageAttachment } = require('discord.js');
const { colors, calcLevel, levelToXP } = require('../utilities');
const canvacord = require('canvacord')

module.exports = {
    name: 'rank',
    syntax: 'rank',
    args: false,
    type: 'Info',
    description: 'shows you your XPrankcard!',
    cooldown: 10,
    DmChannel: true,
    commands: ['rank', 'rankcard'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let user = msg.mentions.users.first() || msg.author;

        let profile = await msg.client.database.UserConfigCache.getConfig(user.id);
        var now = Math.floor(levelToXP(calcLevel(profile.xp))), //Aktuelle XP
            next = Math.floor(levelToXP(1 + calcLevel(profile.xp))), //Für das Nächste Level benötigt
            level = calcLevel(profile.xp)

        const img = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        let colorArray = ['#FF80A1', '#8DAAF6']
        let rankArray = (msg.client.database.UserConfigCache
            .array())
            .sort((a, b) => b.xp - a.xp)

        var rankUser = rankArray.findIndex(e => e.userID == user.id) + 1
        const rank = new canvacord.Rank()
            .setAvatar(img)
            .setCurrentXP(now)
            .setRequiredXP(next)

            .setProgressBar(colorArray, 'GRADIENT', true)
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)

            .setRank(rankUser)
            .setRankColor('#FF80A1')

            .setLevelColor('#8DAAF6')
            .setLevel(level)

            .setCustomStatusColor('#8DAAF6')
        //.setProgressBarTrack('#2e2e2e')

        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                msg.channel.send(attachment).catch();
            });

        return
    }
};