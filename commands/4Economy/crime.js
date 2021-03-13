const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');
const profile = require('./profile');

module.exports = {
    name: 'crime',
    syntax: 'crime',
    args: false,
    type: 'Economy',
    description: 'So you want to commit a crime?',
    commands: ['crime'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)

        var Lose = [
            'The store`s surveillance camera had amazingly good resolution, you could be seen stealing in 4k',
            'You have cleaned up the street signs of your town, shame on you, they are simply bought new when they are too dirty',
            'You had the safety vest in the trunk of your car, this is forbidden',
            'In the apartment you broke into, there is nothing to steal except trading cards',
            'The ATM you cracked was empty qwq'
        ]
        var Succes = [
            'You kill someone with a 10 Euro bill, confusingly yes',
            'Nobody seems to be watching you in your dark machinations >.>',
            'God spares you and forgives your sin'
        ]


        let Profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)

        let chance = Math.floor(Math.random() * (4 - 1) + 1)
        let paid = Math.floor(Math.random() * (200 - 30) + 20)

        if (paid > profile.wallet) return msg.channel.send(emb.setColor(colors.error).setDescription("The risk is too high for you >.> You couldn't pay a fine")).catch()

        if (chance == 1) {
            var text = Succes[Math.floor(Math.random() * Succes.length)];
            Profile.wallet += paid;
            await Profile.save()
            return msg.channel.send(emb.setDescription(`**[+${paid}¥]** ` + text).setColor(colors.success)).catch()
        } else {
            var text = Lose[Math.floor(Math.random() * Lose.length)];
            Profile.wallet -= paid;
            await Profile.save()
            return msg.channel.send(emb.setDescription(`**[-${paid}¥]** ` + text).setColor(colors.error)).catch()
        }
    }
};