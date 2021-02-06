const { Message } = require('discord.js');
const { money, deatiledEmb, colors } = require('../utilities');
const ms = require('parse-ms')

module.exports = {
    name: 'weekly',
    syntax: 'weekly',
    args: false,
    type: 'Economy',
    description: 'Spends your weekly salary OvO',
    commands: ['weekly'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setColor(colors.economy)
        let now = Date.now();

        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)
        let lastWeekly = profile.weekly;

        let cooldown = 6.048e+8;
        let time = ms(cooldown - (now - lastWeekly))

        if (!lastWeekly) {
            profile.weekly = now;
            await profile.save()
        }

        let segments = []
        if (time.days > 0) segments.push(time.days + ' Day' + ((time.days == 1) ? '' : 's'));
        if (time.hours > 0) segments.push(time.hours + ' Hour' + ((time.hours == 1) ? '' : 's'));
        if (time.minutes > 0) segments.push(time.minutes + ' Minute' + ((time.minutes == 1) ? '' : 's'));

        const timeString = segments.join('\n');

        if (cooldown - (now - lastWeekly) > 0) {
            emb.setColor(colors.economy)
                .setDescription(`**${timeString}**`)
            emb.setTitle("You have to wait ;-;")
            return msg.channel.send(emb).catch()

        } else {
            profile.weekly = now;
            profile.wallet += money.weekly;
            await profile.save()

            emb.setDescription("Weekly **" + money.weekly + "¥** added to your wallet")
            msg.channel.send(emb).catch()
        }
    }
};