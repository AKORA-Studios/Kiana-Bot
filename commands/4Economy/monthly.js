const { Message } = require('discord.js');
const { money, deatiledEmb, colors } = require('../utilities');
const ms = require('parse-ms')

module.exports = {
    name: 'monthly',
    syntax: 'monthly',
    args: false,
    type: 'Economy',
    description: 'pends your weekly salary OvO',
    commands: ['monthly'],

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
        let lastMonthly = profile.monthly;

        let cooldown = 2.628e+9;
        let time = ms(cooldown - (now - lastMonthly))

        if (!lastMonthly) {
            profile.monthly = now;
            await profile.save()
        }

        let segments = []
        if (time.days > 0) segments.push(time.days + ' Day' + ((time.days == 1) ? '' : 's'));
        if (time.hours > 0) segments.push(time.hours + ' Hour' + ((time.hours == 1) ? '' : 's'));
        if (time.minutes > 0) segments.push(time.minutes + ' Minute' + ((time.minutes == 1) ? '' : 's'));


        const timeString = segments.join('\n');

        if (cooldown - (now - lastMonthly) > 0) {
            emb.setColor(colors.economy)
                .setDescription(`**${timeString}**`)
            return msg.channel.send(emb.setTitle("You have to wait ;-;")).catch()

        } else {
            profile.monthly = now;
            profile.wallet += money.monthly;
            await profile.save()

            msg.channel.send(emb.setDescription("Monthly **" + money.monthly + "¥** added to your wallet")).catch()
        }
    }
};