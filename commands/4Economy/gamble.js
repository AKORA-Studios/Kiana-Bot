const { Message } = require('discord.js');
const { deatiledEmb, colors } = require('../utilities');

module.exports = {
    name: 'gamble',
    syntax: 'gamble <amount>',
    args: true,
    type: 'Economy',
    description: 'Do you trust in your luck?',
    commands: ['gamble'],

    /**
     *@document
     * @this
     * @param {Message} msg 
     * @param {String[]} args 
     */
    async execute(msg, args) {
        let emb = deatiledEmb(msg)
        let profile = await msg.client.database.UserConfigCache.getConfig(msg.author.id)

        let amount = parseInt(args[0])
        if (Math.sign(amount) == -1) amount = amount * -1

        else if (isNaN(amount) || !amount || amount < 10) return msg.channel.send(emb.setColor(colors.error).setTitle("Please enter a valid number, min 10")).catch()
        if (profile.wallet < amount) return msg.channel.send(emb.setColor(colors.error).setTitle("Unfortunately you do not have that much money qwq")).catch()

        var rand = [0, 1];
        let G = rand[Math.floor(Math.random() * rand.length)]
        if (G == 1) {
            amount = Math.floor(amount * 1.6)
            profile.wallet += amount;
            await profile.save()
            return msg.channel.send(emb.setColor(colors.success).setDescription(`You win **${amount.toLocaleString()}¥**!`)).catch()
        } else {
            profile.wallet -= amount;
            await profile.save()
            return msg.channel.send(emb.setColor(colors.error).setDescription(`You loose **${amount.toLocaleString()}¥**!`)).catch()
        }
    }
};