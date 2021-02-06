const { Message } = require('discord.js');
const moment = require('moment')
const { deatiledEmb, confirmAction, colors } = require('../utilities');

module.exports = {
    name: 'birthday',
    syntax: 'birthday <MM/DD/YYYY>',
    args: true,
    type: 'Economy',
    description: 'Sets your profile Date, Use MM/DD/YYYY',
    commands: ['birthday'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg).setColor(colors.economy)
        let datum = args[0];

        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)
        if (profile.birthday) return msg.channel.send(emb.setColor(colors.error).setDescription("You have already set a birthday")).catch()


        if (!moment(datum, "MM/DD/YYYY", true).isValid()) return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a valid Date, use MM/DD/YYYY")).catch()

        let q = "You cant change this date later, are you sure this date is right? "

        confirmAction(msg, q + datum, () => {
            profile.birthday = datum

            emb.setDescription("**:birthday: Birthday setted to:** " + datum)
            msg.channel.send(emb.setColor(colors.success)).catch()
        }, () => {
            return msg.channel.send(emb.setColor(colors.error).setDescription("Canceled")).catch()
        })
        await profile.save()
    }
};