const { Message } = require('discord.js');
const { money, deatiledEmb, colors } = require('../utilities');
const ms = require('parse-ms')

module.exports = {
    name: 'daily',
    syntax: 'daily',
    args: false,
    type: 'Economy',
    description: 'Spends your daily salary OvO',
    commands: ['daily'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let now = Date.now();

        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)
        let lastDaily = profile.daily;

        let cooldown = 8.64e+7;
        let time = ms(cooldown - (now - lastDaily))

        if (!lastDaily) {
            profile.daily = now;
            await profile.save()
        }

        let segments = []
        if (time.days > 0) segments.push(time.days + ' Day' + ((time.days == 1) ? '' : 's'));
        if (time.hours > 0) segments.push(time.hours + ' Hour' + ((time.hours == 1) ? '' : 's'));
        if (time.minutes > 0) segments.push(time.minutes + ' Minute' + ((time.minutes == 1) ? '' : 's'));

        const timeString = segments.join('\n');

        if (cooldown - (now - lastDaily) > 0) {
            emb.setDescription(`**${timeString}**`)
            return msg.channel.send(emb.setTitle("You have to wait ;-;")).catch()
        } else {
            profile.daily = now;
            profile.wallet += money.daily;
            await profile.save()
            msg.channel.send(emb.setDescription("Daily **" + money.daily + "¥** added to your wallet")).catch()
        }
    }
};