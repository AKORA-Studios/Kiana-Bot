const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'rob',
    syntax: 'rob <@user>',
    args: true,
    type: 'Economy',
    description: 'So you want to try to rob players of their hard earned money...?',
    commands: ['rob'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setTitle("Rob >.>")

        var Loose = [
            'The victim caught you going through his bag',
            'You turned on the light that made the victim realize that his house had been broken into',
            'Unfortunately the victim has an aggressive watchdog',
            'The Brahma chicken of the victim thinks you have food with you and is aggressively hacking at you',
            'A blue Mario Kart shell hits you',
            'The pillow of the mufflepuff catches you and you faint'
        ]
        var Succes = [
            'The victim was asleep and you could sneak up and steal his watch',
            'When bathing, the victim left his valuables unattended - you took advantage of this opportunity',
            'The victim loses some change on the street - you happened to be walking behind him'
        ]

        let user = msg.mentions.members.first().user;
        if (user.id == msg.author.id) return msg.channel.send(emb.setColor(colors.error).setDescription("You can´t rob yourself")).catch()

        if (!user) return msg.channel.send(emb.setColor(colors.error).setTitle("Please enter a user")).catch()
        if (user.bot) return msg.channel.send(emb.setColor(colors.error).setTitle("Bots do not have money")).catch()

        let Offender = await msg.client.database.UserConfigCache.getConfig(msg.author.id)
        let Victim = await msg.client.database.UserConfigCache.getConfig(user.id)

        let chance = Math.floor(Math.random() * (4 - 1) + 1)
        let paid = Math.floor(Math.random() * (200 - 30) + 30)

        if (paid > Offender.wallet || Victim.wallet < paid) return msg.channel.send(emb.setColor(colors.error).setDescription("The risk is too high for you >.> You couldn't pay a fine")).catch()

        if (chance == 1) {
            var text = Succes[Math.floor(Math.random() * Succes.length)];
            Offender.wallet += (paid - 20);
            Victim.wallet -= paid;
            await Offender.save()
            await Victim.save()
            return msg.channel.send(emb.setDescription(`**[+${paid - 20}¥]** ` + text)).catch()
        } else {
            var text = Loose[Math.floor(Math.random() * Loose.length)];
            Offender.wallet -= paid;
            await Offender.save()
            return msg.channel.send(emb.setDescription(`**[-${paid}¥]** ` + text).setColor(colors.info)).catch()
        }
    }
};