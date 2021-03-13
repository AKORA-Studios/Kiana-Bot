const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');
const ms = require('parse-ms')

module.exports = {
    name: 'work',
    syntax: 'work',
    args: false,
    type: 'Economy',
    description: 'Let you work for money OvO',
    commands: ['work'],

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
        let lastWork = profile.work;

        let cooldown = 7.2e+6;
        let time = ms(cooldown - (now - lastWork))

        eng = [
            "You support the developers in their work by making them tea",
            "You take care of a few animals at the shelter and get a little money for it",
            "You give blood and get a small expense allowance",
            "You help an elderly lady to carry her shopping home and receive a small donation from her",
            "You play music in the street and some people throw money at you"
        ]

        var text = eng[Math.floor(Math.random() * eng.length)];
        var amount = Math.floor(Math.random() * (160 - 20) + 20)

        if (!lastWork) {
            profile.work = now;
            await profile.save()
        }

        let segments = []
        if (time.hours > 0) segments.push(time.hours + ' Hour' + ((time.hours == 1) ? '' : 's'));
        if (time.minutes > 0) segments.push(time.minutes + ' Minute' + ((time.minutes == 1) ? '' : 's'));


        const timeString = segments.join('\n');

        if (cooldown - (now - lastWork) > 0) {
            emb
                .setDescription(`**${timeString}**`)
            emb.setTitle("You have to wait ;-;")
            return msg.channel.send(emb).catch()

        } else {
            profile.work = now;
            profile.wallet += amount;
            await profile.save()

            emb.setDescription(`**[+${amount}¥]** ${text}`)
            msg.channel.send(emb).catch()
        }
    }
};