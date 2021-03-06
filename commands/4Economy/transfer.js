const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'transfer',
    syntax: 'tarnsfer <@user> <amount>',
    args: true,
    type: 'Economy',
    description: 'Transfer your money OvO',
    commands: ['transfer'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let user = msg.mentions.users.first() || msg.author
        if (!user) return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a user")).catch()

        if (user.bot) return msg.channel.send(emb.setColor(colors.error).setDescription("Bots do not have rank")).catch()
        let Customer = await msg.client.database.UserConfigCache.getConfig(user.id)
        let Seller = await msg.client.database.UserConfigCache.getConfig(msg.author.id)

        let amount = parseInt(args[1])
        if (Math.sign(amount) == -1) amount = amount * -1

        else if (isNaN(amount) || !amount || amount < 10) return msg.channel.send(emb.setColor(colors.error).setDescription("Please enter a valid number, min 10")).catch()
        if (Seller.wallet < amount) return msg.channel.send(emb.setColor(colors.error).setDescription("Unfortunately you do not have that much money qwq")).catch()

        let Paid = Math.floor(amount * 0.75)
        Seller.wallet -= amount
        Customer.wallet += Paid;

        await Customer.save()
        await Seller.save()

        emb.setDescription(`**${Paid.toLocaleString()}¥**[25% taxes] successfully transferred OvO`)
        return msg.channel.send(emb).catch()
    }
};